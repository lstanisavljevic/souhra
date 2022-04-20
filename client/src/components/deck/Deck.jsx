import React, { useState } from 'react';
import PlayingCard from '../../components/poker-cards/playing-card/PlayingCard';
import PokerCard from '../../components/poker-cards/PokerCard';
import cardPack from '../../resources/cardPacks.json';

const Deck = ({ activePokerCard, handlePokerSelection }) => {
	const { fibonacci } = cardPack;
	const [displayCard, setDisplayCard] = useState(false);

	return (
		<>
			{displayCard ? (
				<>
					<PokerCard
						extraClass="participant-card g-centered"
						cardPack={fibonacci}
						pokerValue={activePokerCard}
					/>
					<button
						className="btn show-offline g-show-offline"
						onClick={() => setDisplayCard(false)}
					>
						Hide card
					</button>
				</>
			) : (
				<>
					<ul className="g-middle deck deck__list">
						{fibonacci.map(card => {
							// eslint-disable-next-line eqeqeq
							return (
								<PlayingCard
									key={card.value}
									card={card}
									isActive={
										activePokerCard &&
										activePokerCard ===
											card.value.toString()
									}
									handlePokerSelection={handlePokerSelection}
								/>
							);
						})}
					</ul>
					<button
						className="btn show-offline g-show-offline"
						disabled={!activePokerCard}
						onClick={() => setDisplayCard(true)}
					>
						Show card
					</button>
				</>
			)}
		</>
	);
};

export default React.memo(Deck);
