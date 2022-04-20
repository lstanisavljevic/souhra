import React, { useState } from 'react';
import Header from '../../components/header/Header';
import RoleForm from '../../components/forms/role-form/RoleForm';

const Login = ({ match }) => {
	const [userRole, setUserRole] = useState(match.params.role || '');

	return (
		<div className='login grid'>
			<Header />
			<main className='g-login'>
				<RoleForm userRole={userRole} setUserRole={setUserRole} />
			</main>
		</div>
	);
};

export default Login;
