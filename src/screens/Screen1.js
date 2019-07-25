import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default class Screen1 extends Component {
	static navigationOptions = {
		title: 'Screen1',
		header: null
	};

	render() {
		return (
			<View style={styles.container}>
				<Text
					style={styles.title}
					onPress={() => this.props.navigation.navigate('Screen2')}
				>
					Screen1
				</Text>
			</View>
		);
	}
}

Screen1.propTypes = {
	navigation: PropTypes.object
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	title: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		color: 'red'
	}
});
