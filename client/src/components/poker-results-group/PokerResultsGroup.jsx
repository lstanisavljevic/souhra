import React from 'react';
import PokerResultsVotes from '../poker-results-votes/PokerResultsVotes';
import PokerResultsGroupInitial from './PokerResultsGroupInitial';

const PokerResultsGroup = ({
	pokerStatus,
	serverMessage,
	pokerResults,
	cardPack,
	roomName
}) => {
	const { minValue, modeValue, maxValue } = pokerResults;

	return (
		<div className="poker-results-group g-top">
			{pokerStatus !== 'results' ? (
				<div className="poker-results-group__message">
					{pokerStatus === 'initial' ? (
						<PokerResultsGroupInitial roomName={roomName} />
					) : (
						<h1>{serverMessage}</h1>
					)}
				</div>
			) : (
				<div className={`poker-results-group__result`}>
					<PokerResultsVotes
						votes={minValue}
						name={'minValue'}
						pokerStatus={pokerStatus}
						cardPack={cardPack}
					/>
					<PokerResultsVotes
						votes={modeValue}
						name={'modeValue'}
						pokerStatus={pokerStatus}
						cardPack={cardPack}
					/>
					<PokerResultsVotes
						votes={maxValue}
						name={'maxValue'}
						pokerStatus={pokerStatus}
						cardPack={cardPack}
					/>
				</div>
			)}
		</div>
	);
};

export default React.memo(PokerResultsGroup);
