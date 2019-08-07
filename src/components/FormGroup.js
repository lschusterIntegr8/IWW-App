import React, { Fragment } from 'react';
import { StyleSheet } from 'react-native';
import { Form, Input } from 'native-base';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import COLOR from '../config/colors';
import { withNavigation } from 'react-navigation';

class FormGroup extends React.Component<any, any> {
	componentDidMount() {
		console.log('Mounted');
	}

	componentDidUpdate() {
		console.log('Updated');
	}

	render() {
		return (
			<Form style={{ flex: 0, width: '100%' }}>
				{
					{
						/* CASE1: LOGIN */
						['login']: (
							<Fragment>
								<Input
									placeholder="Email Adresse*"
									style={styles.input}
									keyboardType="email-address"
									autoCapitalize="none"
									autoCorrect={false}
									autoCompleteType="off"
									onChangeText={text => this.props.setValidity(text, 'email')}
								/>
								<Input
									placeholder="Passwort*"
									secureTextEntry={true}
									autoCorrect={false}
									style={styles.input}
									autoCapitalize="none"
									autoCompleteType="off"
									onChangeText={text => this.props.setValidity(text, 'password')}
								/>
								<Button
									buttonStyle={styles.submitButton}
									titleStyle={{ fontSize: 13, fontWeight: 'bold' }}
									title="ANMELDEN"
									onPress={() =>
										this.props.navigation.navigate('WelcomeOnboarding')
									}
									disabled={!this.props.isValidInput ? true : false}
								/>
							</Fragment>
						),
						/* CASE2: FORGOTTEN PASSWORD */
						['forgotten_password']: (
							<Fragment>
								<Input
									placeholder="Email Adresse*"
									style={styles.input}
									keyboardType="email-address"
									autoCapitalize="none"
									autoCorrect={false}
									autoCompleteType="off"
									onChangeText={text => this.props.setValidity(text, 'email')}
								/>
								<Button
									buttonStyle={styles.submitButton}
									titleStyle={{ fontSize: 13, fontWeight: 'bold' }}
									title="ZURÜCKSETZEN"
									onPress={this.props.handleSubmit}
									disabled={this.props.blockButton}
								/>
							</Fragment>
						)
					}[this.props.formType]
				}
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
	formType: PropTypes.string,
	handleSubmit: PropTypes.func
};
export default withNavigation(FormGroup);
