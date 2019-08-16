import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import validator from 'validator';

import COLOR from '../config/colors';
import FormGroup from '../components/FormGroup';
import { sendPasswordResetEmail } from '../helpers/authentication';
class ForgottenPassword extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	state = {
		isLoading: false,
		email: '',
		isValidInput: false
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
		return validator.isEmail(this.state.email);
	};

	setValidity = (text, type) => {
		console.log('FORGOTTEN PASS: ', text, type);
		if (type === 'email') this.setState({ email: text }, validateCallback);

		function validateCallback() {
			const valid = this.validateInput(text);
			this.setState({
				isValidInput: valid
			});
		}
	};

	async handleSubmit() {
		/* 1. Start loader and disable button */
		this.setState({
			isLoading: true
		});

		/* 2. Do request */
		await sendPasswordResetEmail();

		/* 3. Stop loader */
		this.setState({
			isLoading: false
		});
		/* 4. Navigate */
		this.props.navigation.navigate('PasswordResetInstructions');
	}

	render() {
		return (
			<View style={styles.mainContent}>
				<View style={{ marginBottom: 40 }}>
					<Text style={styles.title}>Passwort vergessen?</Text>
					<Text style={styles.subtitle}>Bitte geben Sie Ihre Email-Adresse ein</Text>
				</View>

				<FormGroup
					formType="forgotten_password"
					handleSubmit={this.handleSubmit}
					blockButton={!this.state.isValidInput || this.state.isLoading}
					setValidity={this.setValidity}
				/>
				{this.state.isLoading ? (
					<View style={styles.indicatorContainer}>
						<ActivityIndicator size="large" color="#E3001B" />
					</View>
				) : (
					<View />
				)}
			</View>
		);
	}
}

ForgottenPassword.propTypes = {
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
	},
	indicatorContainer: {
		marginTop: 40
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

export default ForgottenPassword;
