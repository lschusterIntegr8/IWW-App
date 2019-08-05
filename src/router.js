import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createSwitchNavigator, withFadeTransition } from 'react-navigation-switch-transitioner';
import React from 'react';

import { zoomIn, zoomOut } from 'react-navigation-transitions';

// let screenDim = Dimensions.get('window');
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import SplashScreen from './screens/SplashScreen';
import WelcomeOnboarding from './screens/WelcomeOnboarding';
import Login from './screens/Login';
import HeaderBackImage from './components/HeaderBackImage';

const handleCustomTransition = ({ scenes }) => {
	const prevScene = scenes[scenes.length - 2];
	const nextScene = scenes[scenes.length - 1];

	// Custom transitions go there
	// if (
	// 	prevScene &&
	// 	prevScene.route.routeName === 'Screen1' &&
	// 	nextScene.route.routeName === 'Screen2'
	// ) {
	// 	return zoomIn();
	// } else if (
	// 	prevScene &&
	// 	prevScene.route.routeName === 'Screen2' &&
	// 	nextScene.route.routeName === 'Screen1'
	// ) {
	// 	return zoomIn();
	// }

	return zoomIn();
};

const AppNavigator = createStackNavigator(
	{
		WelcomeOnboarding: {
			screen: WelcomeOnboarding,
			navigationOptions: {}
		},
		Login: {
			screen: Login,
			navigationOptions: {
				tabBarLabel: 'Login',
				headerBackImage: <HeaderBackImage />
			}
		},
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
	},
	{
		initialRouteName: 'WelcomeOnboarding',
		transitionConfig: nav => handleCustomTransition(nav)
	}
);

const InitialNavigator = createSwitchNavigator(
	{
		Splash: withFadeTransition(SplashScreen),
		App: withFadeTransition(AppNavigator)
	},
	{
		initialRouteName: 'Splash'
	}
);

export default createAppContainer(InitialNavigator);
