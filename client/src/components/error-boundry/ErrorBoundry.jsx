import React, { Component } from 'react';

import {
	ErrorImageOverlay,
	ErrorImageContainer,
	ErrorImageText
} from './error-boundary.styles';

class ErrorBoundry extends Component {
	constructor() {
		super();
		this.state = {
			hasError: false
		};
	}
	// must have two methods, two let react know that it is error b. component:

	// catches any error that is thrown to children of error boundry
	static getDerivedStateFromError(error) {
		//process the error

		// must returt object that sets state
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		console.log(error);
	}

	render() {
		if (this.state.hasError) {
			return (
				<ErrorImageOverlay>
					<ErrorImageContainer imageUrl='https://i.imgur.com/lKJiT77.png' />
					<ErrorImageText>A Dog ate this page</ErrorImageText>
				</ErrorImageOverlay>
			);
		}
		// otherwise render children normally
		return this.props.children;
	}
}

export default ErrorBoundry;
