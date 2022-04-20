import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import cardPacks from '../../resources/cardPacks.json';

const initialState = {
	serverMessage: '',
	connectionMessage: '',
	connectionStatus: 'initial',
	pokerStatus: 'initial',
	appStatus: {
		waiting: 'waiting',
		voting: 'voting',
		results: 'results',
		activeUserChange: 'activeUserChange'
	},
	activeUsers: [],
	usersAreActive: false,
	pokerResults: {
		maxValue: [],
		minValue: [],
		modeValue: [],
		hideMode: false
	},
	activePokerCard: '',
	allUsersVoted: false,
	cardPack: cardPacks.fibonacci
};

const withSocketPokerGame = (WrappedComponent, props) => {
	class EnhancedWrappedComponent extends Component {
		constructor() {
			super();

			this.state = {
				...initialState
			};

			// handle input fields for selected card
			this.handlePokerSelection = this.handlePokerSelection.bind(this);
			// handle input fields for selected card
			this.handleUserMove = this.handleUserMove.bind(this);
			// reset poker round
			this.resetPokerRound = this.resetPokerRound.bind(this);
			this.resetPokerSelecton = this.resetPokerSelecton.bind(this);
			// release results to all clients
			this.releasePokerRound = this.releasePokerRound.bind(this);
		}

		componentDidMount() {
			const { roomName, role } = props.match.params;

			if (!props.location.state)
				return props.history.push(`/login/user/${roomName}`);
			const { username } = props.location.state;

			this.setState({
				roomName,
				username,
				role
			});

			this.connectToSocketIO();
			this._addSocketEventListeners();
		}

		connectToSocketIO() {
			this.socket = socketIOClient.connect({
				reconnection: true,
				reconnectionDelay: 500,
				reconnectionAttempts: 5
			});
		}

		_addSocketEventListeners() {
			this.socket.on('connect', () => this.setSocket());
			this.socket.on('updateusers', activeUsers =>
				this.updateUsers(activeUsers)
			);
			this.socket.on('updatechat', (serverMessage, status) =>
				this.updateChat(serverMessage, status)
			);
			this.socket.on('releasechoices', (data, msg, status) =>
				this.releaseChoices(data, msg, status)
			);
			this.socket.on('resetchoices', () => this.resetPokerSelecton());
			this.socket.on('all_users_voted', allVoted =>
				this.handleAllUsersVoted(allVoted)
			);
			this.socket.on(
				'user_connection_changed',
				(serverMessage, status, allUsersVoted) =>
					this.userConnectionChanged(
						serverMessage,
						status,
						allUsersVoted
					)
			);
			this.socket.on('reconnect', number =>
				this.handleConnection(number, 'reconnect')
			);
			this.socket.on('connect_error', number =>
				this.handleConnection(number, 'connect_error')
			);
			this.socket.on('reconnect_failed', number =>
				this.handleConnection(number, 'reconnect_failed')
			);
		}

		getRandom = (max) => {
			return Math.floor(Math.random() * max);
		}

		setSocket() {
			this.setState({
				client: {
					username: this.state.username,
					id: this.socket.id,
					role: this.state.role,
					pokerValue: null,
					roomName: this.state.roomName,
					position: {
						left: this.getRandom(window.innerWidth),
						top: this.getRandom(window.innerHeight)
					}
				}
			});
			// call the server-side function 'joinRoom' and send one parameter (value of prompt)
			if (this.state.role === 'admin') {
				this.socket.emit('createRoom', this.state.client);
			} else if (this.state.role === 'user') {
				this.socket.emit('joinRoom', this.state.client);
			}
			console.info('Client is connected');
		}

		updateUsers(activeUsers) {
			// listener to 'updateusers', updates the active users list
			this.setState({
				activeUsers,
				usersAreActive: activeUsers.length ? true : false
			});
		}

		updateChat(serverMessage, status) {
			this.setState({
				serverMessage,
				pokerStatus: this.state.appStatus[status]
			});
		}

		releaseChoices(data, msg, status) {
			// listen to 'releasechoices' and display results
			this.resetPokerSelecton();
			this.setState({
				pokerResults: data,
				serverMessage: msg,
				pokerStatus: this.state.appStatus[status],
				allUsersVoted: initialState.allUsersVoted
			});
		}

		resetPokerSelecton(msg) {
			this.setState({
				pokerResults: initialState.pokerResults,
				activePokerCard: initialState.activePokerCard,
				serverMessage: msg
			});
		}

		handleAllUsersVoted(allVoted) {
			this.setState({
				allUsersVoted: allVoted
			});
		}

		userConnectionChanged(msg, status, allUsersVoted) {
			this.handleAllUsersVoted(allUsersVoted);
			this.setState({
				connectionMessage: msg,
				connectionStatus: status
			});
		}

		// eslint-disable-next-line class-methods-use-this
		handleConnection(number, event) {
			switch (event) {
				case 'reconnect':
					console.log(
						`After attempting${number} we finally reconnected`
					);
					break;
				case 'connect_error':
					console.log('Error connecting to Socket.IO');
					break;
				case 'reconnect_failed':
					console.log('We failed to reconnect to Socket.IO');
					break;
				default:
					console.log(event);
			}
		}

		// reset poker round
		resetPokerRound() {
			this.resetPokerSelecton(this.state.appStatus.voting);
			this.socket.emit('reset');
		}

		// release results to all clients
		releasePokerRound() {
			this.socket.emit('release');
		}

		// handle input fields for selected card
		handlePokerSelection(event) {
			this.setState({
				activePokerCard: event.target.value
			});
			this.socket.emit('poker', event.target.value);
		}

		handleUserMove(position) {
			this.socket.emit('move', position);
		}

		render() {
			return (
				<WrappedComponent
					{...this.state}
					{...props}
					resetPokerRound={this.resetPokerRound}
					releasePokerRound={this.releasePokerRound}
					handlePokerSelection={this.handlePokerSelection}
					handleUserMove={this.handleUserMove}
				/>
			);
		}
	}

	return EnhancedWrappedComponent;
};

export default withSocketPokerGame;
