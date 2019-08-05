import React, { Fragment } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Header, Form, Content, Input, Item } from 'native-base';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import COLOR from '../config/colors';

class FormGroup extends React.Component<any, any> {
	componentDidMount() {
		// alert(this.props.formType);
	}

	render() {
		return (
			<Form style={{ flex: 0, width: '100%' }}>
				{this.props.formType === 'login' ? (
					<Fragment>
						<Input
							placeholder="Email Adresse*"
							style={styles.input}
							keyboardType="email-address"
							autoCapitalize="none"
							autoCorrect={false}
							autoCompleteType="off"
						/>
						<Input
							placeholder="Passwort*"
							secureTextEntry={true}
							autoCorrect={false}
							style={styles.input}
							autoCapitalize="none"
							autoCompleteType="off"
						/>
						<Button
							buttonStyle={styles.submitButton}
							titleStyle={{ fontSize: 13, fontWeight: 'bold' }}
							title="ANMELDEN"
							onPress={() => this.props.navigation.navigate('Login')}
						/>
					</Fragment>
				) : (
					<Fragment>
						<Text>Fail</Text>
					</Fragment>
				)}
			</Form>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		borderBottomColor: 'black',
		borderWidth: 0.5,
		flex: 0,
		width: '100%',
		alignSelf: 'center',
		maxWidth: 450,
		marginBottom: 10,
		height: 50,
		fontSize: 14
	},
	submitButton: {
		width: '100%',
		maxWidth: 450,
		alignSelf: 'center',
		backgroundColor: COLOR.BLUE,
		height: 50
	}
});

FormGroup.propTypes = {
	navigation: PropTypes.object,
	formType: PropTypes.string
};
export default FormGroup;
