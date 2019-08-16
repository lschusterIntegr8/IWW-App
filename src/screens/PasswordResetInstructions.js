import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

import COLOR from '../config/colors';

class PasswordResetInstructions extends React.Component {
	static navigationOptions = {
		title: null,
		/* Borderless Header */
		headerStyle: {
			elevation: 0,
			shadowOpacity: 0,
			borderBottomWidth: 0
		},
		headerLeft: null
	};

	render() {
		return (
			<View style={styles.mainContent}>
				<Text style={styles.instructions}>
					Wir haben Ihnen eine Email mit der Anleitung zum Zurücksetzen Ihres Passwortes
					zugeschickt
				</Text>
				<Button
					title="Zum Hauptscreen"
					buttonStyle={styles.homeButton}
					titleStyle={{
						color: COLOR.BLUE,
						fontSize: 14
					}}
					onPress={() => this.props.navigation.navigate('Login')}
				/>
			</View>
		);
	}
}

PasswordResetInstructions.propTypes = {
	navigation: PropTypes.object
};

const styles = {
	mainContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 40
	},
	instructions: {
		fontSize: 24,
		color: COLOR.BLUE,
		textAlign: 'center'
	},
	homeButton: {
		backgroundColor: 'transparent',
		marginTop: 40,
		height: 50,
		width: '100%',
		maxWidth: 450,
		alignSelf: 'center',
		borderRadius: 50,
		borderColor: COLOR.BLUE,
		borderWidth: 1
	}
};

export default PasswordResetInstructions;
