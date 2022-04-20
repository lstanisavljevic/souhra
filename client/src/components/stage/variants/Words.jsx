import React from 'react';

const Words = ({ users, handleMouseMove }) => {
	const words = [
		['I can', 'I might', 'I could', "Maybe I'll"],
		['help', 'try', 'manage to', 'be able to'],
		['redirect you to', 'bring you to', 'point you to'],
		['the right place.', 'where you should go.', 'your query.'],
		['Please', 'Just', "Let's", 'But you must'],
		['pick', 'choose', 'select', 'decide', 'make a choice'],
		['from', 'among', 'between', 'within'],
		['the following', 'these', 'the available', 'your'],
		['options', 'choices', 'possibilities']
	];
	return (
		<div
			className="stage stage--words"
			onMouseMove={e => handleMouseMove(e)}
		>
			<p className='stage--words__text'>
				{words.map((block, blockIndex) => {
					const user = users[blockIndex];
					if (!user) return null;
					const chosenExpression =
						block[
							Math.round(
								(block.length * user.position.top) /
									window.innerHeight
							)
						];
					return (
						<span
							key={blockIndex}
							className="stage--words__block"
						>
							{chosenExpression}{' '}
						</span>
					);
				})}
			</p>
		</div>
	);
};

export default React.memo(Words);
