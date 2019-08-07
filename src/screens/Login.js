import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import COLOR from '../config/colors';
import FormGroup from '../components/FormGroup';
import validator from 'validator';

class Login extends React.Component {
	static navigationOptions = {
		title: null,
		/* Borderless Header */
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0,
			borderBottomWidth: 0
		}
	};

	state = {
		isValidInput: false,
		email: '',
		password: ''
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
