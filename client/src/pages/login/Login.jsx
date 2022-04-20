import React, { useState } from 'react';
import Header from '../../components/header/Header';
import AuthForm from '../../components/forms/auth-form/AuthForm';

const Login = ({ match }) => {
	const [userRole] = useState(match.params.role || '');
	const [roomName] = useState(match.params.roomName || '');
	const hasRoomId = match.params.roomName ? true : false;

	return (
		<div className="login grid">
			<Header />
			<main className="g-login">
				<AuthForm
					hasRoomId={hasRoomId}
					userRole={userRole}
					roomName={roomName}
				/>
			</main>
		</div>
	);
};

export default Login;
