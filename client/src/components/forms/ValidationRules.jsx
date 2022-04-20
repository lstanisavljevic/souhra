export const validate = (values, labels) => {
	let errors = {};
	for (const value in values) {
		if (values[value].length < 3) {
			errors[value] = `${labels[value]} must be 3 or more characters`;
		} else if (values[value] === false) {
			console.log(values[value]);
			errors[value] = `${labels[value]} already exists`;
		}
	}
	return errors;
};
