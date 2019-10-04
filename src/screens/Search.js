import React, { Component } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import PropTypes from 'prop-types';

import COLOR from '../config/colors';

class Search extends Component {
	constructor(props) {
		super(props);
		this.onInputChange = this.onInputChange.bind(this);
	}

	state = {
		typeTimeout: null
	};

	onInputChange(val) {
		clearTimeout(this.state.typeTimeout);
		this.setState({
			typeTimeout: setTimeout(function() {
				console.log('Input is: ', val);
				/* TODO: FETCH SEARCH API */
			}, 750)
		});
	}

	render() {
		return (
			<View style={styles.mainContent}>
				<TextInput
					style={styles.searchInput}
					placeholder="Search"
					onChangeText={this.onInputChange}
				></TextInput>
				<Image
					style={styles.searchIcon}
					source={require('../assets/images/search-icon.png')}
				></Image>
			</View>
		);
	}
}

Search.propTypes = {
	navigation: PropTypes.object
};

const styles = {
	mainContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 16
	},
	searchInput: {
		borderBottomColor: COLOR.GREY_SEARCH_BORDER,
		borderBottomWidth: 1,
		width: '100%',
		fontSize: 26,
		paddingHorizontal: 32,
		paddingBottom: 6
	},
	searchIcon: {
		width: 22,
		height: 22,
		resizeMode: 'contain',
		position: 'absolute',
		left: 16,
		top: 5
	}
};

export default Search;
