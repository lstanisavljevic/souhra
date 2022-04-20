import React, { useState } from 'react';
import Words from './variants/Words';

const Stage = ({ users, username, handleUserMove }) => {
	const [level, setLevel] = useState(1);
	const handleMouseMove = e => {
		e.preventDefault();
		if (e.buttons === 1) {
			const left = e.clientX;
			const top = e.clientY;
			const newPosition = {
				left,
				top
			};
			handleUserMove(newPosition);
		}
	};
	if (!users.length) return null;
	const firstUser = users[0];
	const labels = [];
	return (
		<div className="stage" onMouseMove={e => handleMouseMove(e)}>
			<svg
				className="stage__band"
				width="100%"
				height="100%"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g fill="none" fillRule="evenodd">
					<path
						d={`M ${firstUser.position.left}, ${
							firstUser.position.top
						} ${users
							.map((user, index) => {
								const left =
									level >= 5
										? (window.innerWidth * index) /
										  users.length
										: user.position.left;
								const top = user.position.top;
								const userModifier =
									user.username === username
										? 'current'
										: 'other';
								const labelStyle = { left, top };
								labels.push(
									<div
										key={`${user.username}-label`}
										className={`stage__user stage__user--${userModifier}`}
										style={labelStyle}
									>
										{user.username}
									</div>
								);
								switch (level) {
									case 1:
									default:
										return `L ${left}, ${top} `;
									case 2:
										if (index < users.length - 1) {
											return `S ${left}, ${top}, ${users[index + 1].position.left}, ${users[index + 1].position.top} `;
										}
										break;
									case 3:
										if (index < users.length - 1) {
											return `S ${left}, ${top}, ${(left +
												users[index + 1].position
													.left) /
												2}, ${(top +
												users[index + 1].position.top) /
												2} `;
										}
										break;
									case 4:
										if (index < users.length - 1) {
											return `A ${left}, ${top}, 0, 0, 1, ${users[index + 1].position.left}, ${users[index + 1].position.top} `;
										}
										break;
								}
								return null;
							})
							.join('')}z`}
						fill="#a1ddb0"
						stroke="#56C271"
						strokeWidth={
							level === 4 ? users[0].position.left / 10 : 1
						}
					/>
				</g>
			</svg>
			{labels}
			{level === 6 && (
				<Words handleMouseMove={handleMouseMove} users={users} />
			)}
			<button
				className="stage__level"
				onClick={() => setLevel(level + 1)}
			>
				{level}
			</button>
		</div>
	);
};

export default React.memo(Stage);
