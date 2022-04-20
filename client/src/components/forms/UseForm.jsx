import { useState, useEffect } from 'react';
import { getActiveNames } from '../../resources/helpers/dataHelperMethods';

const UseForm = (callback, validate, val = {}, labels) => {
	const [values, setValues] = useState(val);
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isAuthForm, setIsAuthForm] = useState(false);

	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			return callback();
		}
	}, [errors, isSubmitting, callback, isAuthForm]);

	const checkNames = userRole => {
		const url =
			userRole === 'admin'
				? `/api/activeRooms/${values.roomName}`
				: `/api/activeUsers/${values.roomName}/${values.username}`;
		getActiveNames(url).then(response => {
			setErrors(validate(response, labels));
			setIsSubmitting(true);
		});
	};

	const handleRoleSubmit = event => {
		if (event) event.preventDefault();
		setIsSubmitting(true);
		setIsAuthForm(true);
		setErrors(validate(values, labels));
	};

	const handleAuthSubmit = (event, userRole) => {
		if (event) event.preventDefault();
		checkNames(userRole);
	};

	const handleChange = event => {
		event.persist();
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	return {
		handleChange,
		handleRoleSubmit,
		handleAuthSubmit,
		values,
		errors,
		setValues
	};
};

export default UseForm;
