import React from 'react';

const InputItem = ({
	label,
	labelValue,
	value,
	errors,
	handleChange,
	autoFocus
}) => {
	return (
		<>
			<label htmlFor={label} className="form--item">
				{labelValue}
				<input
					type="text"
					name={label}
					id={label}
					autoComplete={label}
					maxLength="30"
					value={value}
					onChange={handleChange}
					autoFocus={autoFocus}
					required
				/>
				{errors && <div className="form__error">{errors}</div>}
			</label>
		</>
	);
};

export default InputItem;
