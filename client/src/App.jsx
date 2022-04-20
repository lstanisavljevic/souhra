import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './resources/styles/all.scss';
import ErrorBoundry from './components/error-boundry/ErrorBoundry';
import Spinner from './components/spinner/Spinner';

const Login = lazy(() => import('./pages/login/Login'));
const Roles = lazy(() => import('./pages/roles/Roles'));
const PokerGame = lazy(() => import('./pages/poker-game/PokerGame'));

function App() {
	return (
		<ErrorBoundry>
			<Suspense fallback={<Spinner />}>
				<BrowserRouter>
					<Switch>
						<Route path='/' exact component={Roles} />
						<Route path='/login/:role?/:roomName?' component={Login} />
						<Redirect exact from='/scrum-poker/:role?' to='/login/:role?' />
						<Redirect
							exact
							from='/scrum-poker/:role?/:roomName'
							to='/login/user/:roomName'
						/>
						<Route
							path='/scrum-poker/:role/:roomName/game'
							component={PokerGame}
						/>
					</Switch>
				</BrowserRouter>
			</Suspense>
		</ErrorBoundry>
	);
}

export default App;
