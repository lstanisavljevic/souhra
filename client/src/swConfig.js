export default {
	onUpdate: registration => {
		console.log('onUpdate');
		const notification = window.document.getElementById('notification');
		notification.className = 'show';
	},
	onSuccess: registration => {
		console.log('onSuccess');
		console.info('service worker on success state');
		console.log(registration);
	}
};
