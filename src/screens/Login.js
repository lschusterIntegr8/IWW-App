import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import COLOR from '../config/colors';
import FormGroup from '../components/FormGroup';
import validator from 'validator';
import { authenticateLogin } from '../helpers/authentication';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	state = {
		isLoading: false,
		isValidInput: false,
		email: '',
		password: ''
	};

	static navigationOptions = {
		title: null,
		/* Borderless Header */
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0,
			borderBottomWidth: 0
		}
	};

	validateInput = () => {
		return (
			validator.isEmail(this.state.email) &&
			validator.isLength(this.state.password, { min: 2 })
		);
	};

	setValidity = (text, type) => {
		console.log('LOGIN: ', text, type);
		if (type === 'email')
			this.setState(
				{
					email: text
				},
				validateCallback
			);
		else if (type === 'password')
			this.setState(
				{
					password: text
				},
				validateCallback
			);

		function validateCallback() {
			const valid = this.validateInput(text);
			console.log('Setting to: ', valid);
			this.setState({
				isValidInput: valid
			});
		}
	};

	async handleSubmit() {
		try {
			/* 1. Start loader and disable button */
			this.setState({
				isLoading: true
			});

			/* 2. Do request */
			const authSuccess = await authenticateLogin(this.state.email, this.state.password);

			/* 3. Stop loader */
			this.setState({
				isLoading: false
			});
			/* 4. Navigate */
			if (authSuccess) this.props.navigation.navigate('App');
		} catch (err) {
			alert('Wrong Email or Password');
		}
	}

	render() {
		return (
			<View style={styles.mainContent}>
				<View style={{ marginBottom: 40 }}>
					<Text style={styles.title}>Anmelden</Text>
					<Text style={styles.subtitle}>Bitte geben Sie Ihre Zugangsdaten ein</Text>
				</View>

				<FormGroup
					formType="login"
					setValidity={this.setValidity}
					isValidInput={this.state.isValidInput}
					handleSubmit={this.handleSubmit}
				/>
				<Button
					buttonStyle={styles.passwordResetButton}
					titleStyle={{
						color: 'rgba(1, 49, 95, 0.3)',
						fontSize: 12,
						fontWeight: 'bold'
					}}
					title="Passwort vergessen?"
					onPress={() => this.props.navigation.navigate('ForgottenPassword')}
				/>
			</View>
		);
	}
}

Login.propTypes = {
	navigation: PropTypes.object
};

const styles = {
	mainContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 40
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold',
		color: COLOR.BLUE,
		textAlign: 'center',
		marginBottom: 16

		// marginTop: 50
	},
	subtitle: {
		fontSize: 14,
		color: COLOR.BLUE,
		textAlign: 'center'
	},
	passwordResetButton: {
		backgroundColor: 'transparent',
		marginTop: 18
	}
};

export default Login;
