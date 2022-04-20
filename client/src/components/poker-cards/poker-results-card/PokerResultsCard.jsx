import React from 'react';
import PokerCard from '../PokerCard';

const PokerResultsCard = ({ pokerValue, cardPack, heading, username }) => {
	return (
		<div className='poker-results-card slide-card'>
			<h2 className='heading'>{heading}</h2>
			<PokerCard element='' cardPack={cardPack} pokerValue={pokerValue} />
			<ul className='poker-results-card__usernames'>{username}</ul>
		</div>
	);
};

export default PokerResultsCard;
