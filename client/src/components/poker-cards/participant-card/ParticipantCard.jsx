import React from 'react';
import { ReactComponent as WaitingIcon } from './waiting-icon.svg';
import { ReactComponent as VotedIcon } from './voted-icon.svg';
import PokerCard from '../PokerCard';

const ParticipantCard = ({ pokerStatus, pokerValue, cardPack, username }) => {
	const CardBack = () => (
		<>
			<PokerCard
				element={<WaitingIcon />}
				extraClass="participant-card participant-card--back"
				cardPack={cardPack}
				pokerValue={pokerValue}
			/>
		</>
	);

	const CardFront = () =>
		(pokerValue ? (
			<PokerCard
				element={<VotedIcon />}
				extraClass="participant-card participant-card--front"
			/>
		) : (
			<PokerCard
				element={<WaitingIcon />}
				extraClass="participant-card participant-card--front"
			/>
		));

	return (
		<div className="participant-card">
			<div
				className={
					pokerStatus === 'results'
						? 'participant-card__wrapper flipped'
						: 'participant-card__wrapper'
				}
			>
				<CardFront />
				<CardBack />
			</div>

			<p className="participant-card__username">{username}</p>
		</div>
	);
};

export default ParticipantCard;
