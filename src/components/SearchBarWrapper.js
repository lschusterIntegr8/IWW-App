import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Header, Left, Icon } from 'native-base';
import { withNavigation } from 'react-navigation';
import { SearchBar } from 'react-native-elements';

import COLOR from '../config/colors';

class SearchBarWrapper extends React.Component {
	state = {
		search: ''
	};

	updateSearch = search => {
		this.setState({ search });
	};

	render() {
		const { search } = this.state;

		return (
			<View>
				<SearchBar
					placeholder="Schreib etwas alter"
					onChangeText={this.updateSearch}
					value={search}
					containerStyle={styles.container}
					inputContainerStyle={styles.inputContainer}
					inputStyle={styles.input}
					leftIconContainerStyle={styles.leftIconContainer}
					placeholderTextColor={'rgba(255, 255, 255, 0.41)'}
					searchIcon={
						<SafeAreaView>
							<View>
								<Icon name="search" style={{ color: COLOR.WHITE, fontSize: 14 }} />
							</View>
						</SafeAreaView>
					}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLOR.DARK_BLUE
	},
	inputContainer: {
		backgroundColor: COLOR.DARK_BLUE
	},
	input: {
		// textAlign: 'center',
		// flex: 1,
		// alignContent: 'center',
		// alignItems: 'center',
		// justifyContent: 'center',
		color: COLOR.WHITE,
		fontSize: 16
	},
	leftIconContainer: {}
});

export default SearchBarWrapper;
