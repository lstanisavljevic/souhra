import React from 'react';

const SelectItem = ({
	label,
	labelValue,
	value,
	errors,
	handleChange,
	autoFocus,
	options
}) => {
	return (
		<>
			<label htmlFor={label} className="form--item">
				{labelValue}
				<select
					type="text"
					name={label}
					id={label}
					autoComplete={label}
					maxLength="30"
					value={value}
					onChange={handleChange}
					autoFocus={autoFocus}
					required
				>
					{options.map(option => (
						<option key={option} value={option}>{option}</option>
					))}
				</select>
				{errors && <div className="form__error">{errors}</div>}
			</label>
		</>
	);
};

export default SelectItem;
