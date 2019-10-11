import React, { Component } from 'react';
import { View, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

class FavouritesWrapper extends Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
		header: null
	};

	render() {
		return (
			<View>
				<Text>This is the favourites screen</Text>
			</View>
		);
	}
}

export default FavouritesWrapper;
