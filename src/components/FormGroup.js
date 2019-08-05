import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Header, Form, Content, Input, Item } from 'native-base';
import PropTypes from 'prop-types';

class FormGroup extends React.Component<any, any> {
	componentDidMount() {
		// alert(this.props.formType);
	}

	render() {
		return (
			<Form style={{ flex: 0, width: '100%' }}>
				{this.props.formType === 'login' ? (
					<React.Fragment>
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
					</React.Fragment>
				) : (
					<React.Fragment>
						<Text>Fail</Text>
					</React.Fragment>
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
		marginBottom: 10
	}
});

FormGroup.propTypes = {
	navigation: PropTypes.object,
	formType: PropTypes.string
};
export default FormGroup;
