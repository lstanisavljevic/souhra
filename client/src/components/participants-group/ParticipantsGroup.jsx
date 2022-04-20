import React from 'react';
import ParticipantCard from '../poker-cards/participant-card/ParticipantCard';

const ParticipantsGroup = ({ cardPack, participants, pokerStatus }) => {
	return (
		<div className="participants-group g-bottom">
			<ol className="participants-group__list">
				{participants.map(p => (
					<li key={p.username}>
						<ParticipantCard
							username={p.username}
							pokerStatus={pokerStatus}
							pokerValue={p.pokerValue}
							cardPack={cardPack}
						/>
					</li>
				))}
			</ol>
		</div>
	);
};

export default React.memo(ParticipantsGroup);
