import React, { Component } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Header, Left, Right, Icon } from 'native-base';
import COLOR from '../config/colors';
import { withNavigation } from 'react-navigation';

class HeaderMenu extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log('PROPS:');
		console.log(this.props);
		StatusBar.setBarStyle('light-content', true);
		StatusBar.setBackgroundColor('red');
	}

	render() {
		return (
			<Header style={styles.header}>
				<Left style={{ flex: 1 }}>
					<Icon
						name="menu"
						style={styles.icons}
						onPress={() => this.props.navigation.openDrawer()}
					/>
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
		color: '#FFFFFF'
	}
});

export default withNavigation(HeaderMenu);
