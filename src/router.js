import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import { createSwitchNavigator, withFadeTransition } from 'react-navigation-switch-transitioner';
import React from 'react';

import { zoomIn, zoomOut } from 'react-navigation-transitions';
import { View, Text } from 'react-native';
// let screenDim = Dimensions.get('window');
/* Components */
import HeaderBackImage from './components/HeaderBackImage';

/* Authentication Screens */
import Screen1 from './screens/Screen1';
import Screen2 from './screens/Screen2';
import SplashScreen from './screens/SplashScreen';
import WelcomeOnboarding from './screens/WelcomeOnboarding';
import Login from './screens/Login';
import ForgottenPassword from './screens/ForgottenPassword';
import PasswordResetInstructions from './screens/PasswordResetInstructions';

/* Main Screens */
import HomeScreen from './screens/HomeScreen';

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

const AuthNavigator = createStackNavigator(
	{
		WelcomeOnboarding: {
			screen: WelcomeOnboarding,
			navigationOptions: {
				headerBackTitle: null
			}
		},
		Login: {
			screen: Login,
			navigationOptions: {
				tabBarLabel: 'Login',
				headerBackImage: <HeaderBackImage />
			}
		},
		ForgottenPassword: {
			screen: ForgottenPassword,
			navigationOptions: {
				tabBarLabel: 'ForgottenPassword',
				headerBackImage: <HeaderBackImage />
			}
		},
		PasswordResetInstructions: {
			screen: PasswordResetInstructions,
			navigationOptions: {
				tabBarLabel: 'PasswordResetInstructions',
				headerLeft: null
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

const AppNavigator = createDrawerNavigator(
	{
		Home: {
			screen: HomeScreen,
			navigationOptions: {
				tabBarLabel: 'Home Screen'
			}
		}
	},
	{
		// hideStatusBar: true,
		// drawerBackgroundColor: '#FFFFFF',
		// overlayColor: '#6b52ae',
		// color: '#000000',
		// contentOptions: {
		// 	activeTintColor: '#fff',
		// 	activeBackgroundColor: ''
		// }
	}
);

const InitialNavigator = createSwitchNavigator(
	{
		Splash: withFadeTransition(SplashScreen),
		Authentication: withFadeTransition(AuthNavigator),
		App: AppNavigator
	},
	{
		initialRouteName: 'App'
	}
);

export default createAppContainer(InitialNavigator);