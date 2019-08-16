import React, { Component } from 'react';
import { StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Header, Left, Icon } from 'native-base';
import { withNavigation } from 'react-navigation';

import COLOR from '../config/colors';

class HeaderMenu extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		StatusBar.setBarStyle('light-content', true);
		StatusBar.setBackgroundColor(COLOR.BLUE);
	}

	render() {
		return (
			<Header style={styles.header}>
				<Left style={{ flex: 1, marginHorizontal: 11 }}>
					<TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
						<Icon name="ios-menu" style={styles.icons} />
					</TouchableOpacity>
				</Left>
			</Header>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: COLOR.BLUE
	},
	icons: {
		color: '#FFFFFF',
		fontSize: 40
	}
});

export default withNavigation(HeaderMenu);
