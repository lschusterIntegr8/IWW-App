import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import {
	StackNavigator,
	TabNavigator,
	createStackNavigator,
	createAppContainer
} from 'react-navigation';

let screenDim = Dimensions.get('window');
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';

const AppNavigator = createStackNavigator({
	Screen1: {
		screen: Screen1,
		navigationOptions: {
			tabBarLabel: 'Screen1'
		}
	},
	Screen2: {
		screen: Screen2,
		navigationOptions: {
			tabBarLabel: 'Screen2'
		}
	}
});

export default createAppContainer(AppNavigator);
