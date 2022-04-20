/* eslint-disable complexity */
import React from 'react';
import { withRouter } from 'react-router-dom';
import UseForm from '../UseForm';
import { validate } from '../ValidationRules';
import QrCodeScanner from '../../qr-code/qr-code-scanner/QrCodeScanner';
// import InputItem from '../input-item/InputItem';
import SelectItem from '../select-item/SelectItem';

const errorLabels = {
	roomName: 'Room name',
	username: 'Username',
	isRoomNameAvailable: 'Room name',
	isUsernameAvailable: 'Username'
};

const rooms = ['', 'poker', 'ajnc'];
const users = [
	'',
	'Bert',
	'Colin',
	'Darius',
	'Dylan',
	'Honza',
	'Laura',
	'Linda',
	'Luka',
	'Patrick',
	'Syb',
	'Sylwia',
	'Symbat',
	'Tim',
	'Yessin'
];

const AuthForm = ({ userRole, roomName, history }) => {
	const login = () => {
		history.push({
			pathname: `/scrum-poker/${userRole}/${values.roomName}/game`,
			state: { username: values.username }
		});
	};

	const defaultValues = {
		roomName,
		username: '',
		isRoomNameAvailable: true,
		isUsernameAvailable: true
	};

	const {
		values,
		errors,
		handleChange,
		handleAuthSubmit,
		setValues
	} = UseForm(login, validate, defaultValues, errorLabels);

	const setScanResult = scanResult => {
		setValues({ ...values, roomName: scanResult });
	};

	return (
		<form className="auth-form form">
			{/* <InputItem
				label={'username'}
				labelValue={'Username'}
				value={values.username || defaultValues.username}
				errors={errors.username}
				handleChange={handleChange}
				autoFocus={true}
			/>
			<InputItem
				label={'roomName'}
				labelValue={'Room name'}
				value={values.roomName || defaultValues.roomName}
				errors={errors.roomName}
				handleChange={handleChange}
			/> */}
			<SelectItem
				label={'username'}
				labelValue={'Username'}
				value={values.username || defaultValues.username}
				errors={errors.username}
				handleChange={handleChange}
				autoFocus={true}
				options={users}
			/>
			<SelectItem
				label={'roomName'}
				labelValue={'Room name'}
				value={values.roomName || defaultValues.roomName}
				errors={errors.roomName}
				handleChange={handleChange}
				options={rooms}
			>
				{rooms.map(room => (
					<option key={room} value={room}>
						{room}
					</option>
				))}
			</SelectItem>
			{userRole === 'user' && (
				<QrCodeScanner setScanResult={setScanResult} />
			)}

			{errors.isRoomNameAvailable && (
				<div className="form__error">{errors.isRoomNameAvailable}</div>
			)}
			{errors.isUsernameAvailable && (
				<div className="form__error">{errors.isUsernameAvailable}</div>
			)}

			<div className="form__actions">
				{userRole === 'admin' ? (
					<button
						className="btn btn--gray"
						value="submit"
						type="submit"
						disabled={values.roomName.length < 2}
						onClick={e => handleAuthSubmit(e, userRole)}
					>
						Create poker room
					</button>
				) : (
					<button
						className="btn"
						value="submit"
						type="submit"
						disabled={values.username.length < 2}
						onClick={e => handleAuthSubmit(e, userRole)}
					>
						Join
					</button>
				)}
			</div>
		</form>
	);
};

export default withRouter(AuthForm);
