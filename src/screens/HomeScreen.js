import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import COLOR from '../config/colors';
import { Button } from 'react-native-elements';

class HomeScreen extends Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
		title: 'Home'
	};

	componentDidMount() {
		// alert(slides[0]);
	}

	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>this is the home screen.</Text>
			</View>
		);
	}
}

HomeScreen.propTypes = { navigation: PropTypes.object };

export default HomeScreen;
