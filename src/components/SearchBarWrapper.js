import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, SafeAreaView, Text, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

import COLOR from '../config/colors';

class SearchBarWrapper extends Component {
	constructor(props) {
		super(props);
		this.navigateToSearchScreen = this.navigateToSearchScreen.bind(this);
	}

	navigateToSearchScreen() {
		console.log('NAVIGATION TO SEARCHSCREEN');
		this.props.navigation.navigate('SearchScreen');
	}

	render() {
		// const { search } = this.state;

		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.inputContainer}
					onPress={this.navigateToSearchScreen}
				>
					<Image
						style={styles.searchIcon}
						source={require('../assets/images/search-icon-white.png')}
					></Image>

					<Text style={styles.searchText}>Suche</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLOR.DARK_BLUE,
		height: 50
	},
	inputContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	searchText: {
		color: COLOR.WHITE,
		paddingHorizontal: 6,
		fontSize: 16
	},
	searchIcon: {
		width: 16,
		height: 16,
		resizeMode: 'contain'
		// position: 'absolute',
		// left: 16,
		// top: 5
	}
});

export default withNavigation(SearchBarWrapper);
