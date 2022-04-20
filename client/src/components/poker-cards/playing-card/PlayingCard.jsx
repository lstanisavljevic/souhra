import React from 'react';

const PlayingCard = ({ isActive, card, handlePokerSelection }) => {
	return (
		<li className='playing-card'>
			<input
				name='activePokerCard'
				id={`poker-value-${card.value}`}
				type='radio'
				value={`${card.value}`}
				checked={isActive}
				onChange={handlePokerSelection}
			/>
			<label className='smallcaps' htmlFor={`poker-value-${card.value}`}>
				{card.label}
			</label>
		</li>
	);
};

export default PlayingCard;
