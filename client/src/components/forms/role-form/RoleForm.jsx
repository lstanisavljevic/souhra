import React from 'react';
import { withRouter } from 'react-router-dom';

const RoleForm = ({ history }) => {
	return (
		<form className="role-form form">
			<h2 className="form--item">Choose your role</h2>
			<div className="form__actions">
				<button
					className="btn btn--gray"
					type="submit"
					value="submit"
					onClick={() => {
						history.push(`/login/admin`);
					}}
				>
					Scrum Master
				</button>
				<div className="form__divider">
					<span className="form__divider-text">or</span>
				</div>
				<button
					className="btn"
					type="submit"
					value="submit"
					onClick={() => {
						history.push(`/login/user`);
					}}
				>
					Team Member
				</button>
			</div>
		</form>
	);
};

export default withRouter(RoleForm);
