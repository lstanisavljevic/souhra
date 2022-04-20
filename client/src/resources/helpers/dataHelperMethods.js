export const getActiveNames = async url => {
	try {
		const response = await fetch(url);
		return response.json();
	} catch (err) {
		console.log('fetch failes', err);
	}
};
