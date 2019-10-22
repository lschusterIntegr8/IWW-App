import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, StatusBar } from 'react-native';
import { Header, Left, Icon, Center, Body, Right } from 'native-base';
import { withNavigation } from 'react-navigation';

import COLOR from '../config/colors';

class HeaderMenu extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return (
			<Header style={styles.header}>
				<StatusBar backgroundColor={COLOR.BLUE} barStyle="light-content" />

				<View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 11 }}>
					{/* <StatusBar hidden={false} translucent={true} /> */}
					<Left style={{ flex: 1, zIndex: 1 }}>
						<TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
							<Icon name="ios-menu" style={styles.icons} />
						</TouchableOpacity>
					</Left>
					<Body
						style={{
							flex: 1
						}}
					>
						<Image
							source={require('../assets/images/iww_white.png')}
							resizeMode="contain"
							style={{
								height: 36,
								alignSelf: 'center'
							}}
						/>
					</Body>
					<Right style={{ flex: 1 }}></Right>
				</View>
			</Header>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: COLOR.BLUE,
		display: 'flex',
		flexDirection: 'row'
	},
	icons: {
		color: '#FFFFFF',
		fontSize: 40
	}
});

export default withNavigation(HeaderMenu);
