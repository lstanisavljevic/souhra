import React from 'react';
import { ReactComponent as LogoMirabeauDark } from './logo-mirabeau-dark.svg';

const logo = ({ theme }) => (
	<div className={`logo-container vertical-grid__logo logo--${theme}`}>
		<a
			href='https://www.mirabeau.nl'
			rel='noopener noreferrer'
			className='theme'
		>
			<span className='screenreader'>Cognizant</span>
			<LogoMirabeauDark />
		</a>
	</div>
);

export default logo;
