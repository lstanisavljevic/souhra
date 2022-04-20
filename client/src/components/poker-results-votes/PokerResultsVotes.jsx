import React from 'react';
import PokerResultsCard from '../poker-cards/poker-results-card/PokerResultsCard';

const resultLabels = {
	minValue: 'Minimal',
	maxValue: 'Highest',
	modeValue: 'Majority'
};

const PokerResultsVotes = ({ votes, name, pokerStatus, cardPack }) => {
	if (votes.length === 0) return null;
	const userVotes = votes.map(vote => (
		<li key={vote.username}>{vote.username}</li>
	));

	const value = votes.length ? votes[0].pokerValue : null;
	return (
		<PokerResultsCard
			username={userVotes}
			heading={resultLabels[name]}
			pokerStatus={pokerStatus}
			pokerValue={value}
			cardPack={cardPack}
		/>
	);
};

export default React.memo(PokerResultsVotes);
