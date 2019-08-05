import React from 'react';
import { View, Text, Image } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container } from 'native-base';

import PropTypes from 'prop-types';
import COLOR from '../config/colors';

import FormGroup from '../components/FormGroup';

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

	render() {
		return (
			<View style={styles.mainContent}>
				<View style={{ marginBottom: 40 }}>
					<Text style={styles.title}>Anmelden</Text>
					<Text style={styles.subtitle}>Bitte geben Sie Ihre Zugangsdaten ein</Text>
				</View>

				<FormGroup formType="login" />
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
	}
};

export default Login;
