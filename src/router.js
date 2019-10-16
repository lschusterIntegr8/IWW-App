import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createSwitchNavigator, withFadeTransition } from 'react-navigation-switch-transitioner';
import React from 'react';

import { zoomIn, zoomOut, fromBottom } from 'react-navigation-transitions';
// let screenDim = Dimensions.get('window');
/* Components */
import HeaderBackImage from './components/HeaderBackImage';

/* Authentication Screens */
import SplashScreen from './screens/SplashScreen';
import WelcomeOnboarding from './screens/WelcomeOnboarding';
import Login from './screens/Login';
// import ForgottenPassword from './screens/ForgottenPassword';
// import PasswordResetInstructions from './screens/PasswordResetInstructions';

/* Main Screens */
import HomeScreen from './screens/HomeScreen';
import SingleArticleMain from './screens/SingleArticleMain';
import Search from './screens/Search';
import CustomSidebarMenu from './components/CustomSidebarMenu';
import Downloads from './screens/Downloads';

/* Detect in-out screen and create a transition of your choice */
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

	if (prevScene) {
		if (
			(prevScene.route.routeName === 'NewsFeed' &&
				nextScene.route.routeName === 'SingleArticle') ||
			(prevScene.route.routeName === 'SingleArticle' &&
				nextScene.route.routeName === 'NewsFeed')
		) {
			return fromBottom(600);
		}
	}

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
		}
		/* THESE SCREENS ARE NOT IN USE ANYMORE -->
		 PASSWORD-RESET/FORGOTTEN HAPPENS NOW DIRECTLY ON THE WEBSITE */

		// ForgottenPassword: {
		// 	screen: ForgottenPassword,
		// 	navigationOptions: {
		// 		tabBarLabel: 'ForgottenPassword',
		// 		headerBackImage: <HeaderBackImage />
		// 	}
		// },
		// PasswordResetInstructions: {
		// 	screen: PasswordResetInstructions,
		// 	navigationOptions: {
		// 		tabBarLabel: 'PasswordResetInstructions',
		// 		headerLeft: null
		// 	}
		// }
	},
	{
		initialRouteName: 'WelcomeOnboarding',
		transitionConfig: nav => handleCustomTransition(nav)
	}
);

const NewsStack = createStackNavigator(
	{
		NewsFeed: {
			screen: HomeScreen,
			navigationOptions: {
				title: 'News Feed',
				header: () => null,
				headerBackTitle: null
			}
		},
		SingleArticle: {
			screen: SingleArticleMain,
			navigationOptions: {
				tabBarLabel: 'Article',
				headerBackTitle: null,
				headerBackImage: <HeaderBackImage />,
				/* Borderless Header */
				headerStyle: {
					elevation: 0,
					shadowOpacity: 0,
					borderBottomWidth: 0
				}
			}
		},
		SearchScreen: {
			screen: Search,
			navigationOptions: {
				tabBarLabel: 'Searchy',
				headerBackTitle: null,
				headerBackImage: <HeaderBackImage />,
				/* Borderless Header */
				headerStyle: {
					elevation: 0,
					shadowOpacity: 0,
					borderBottomWidth: 0
				}
			}
		}
	},
	{
		initialRouteName: 'NewsFeed',
		transitionConfig: nav => handleCustomTransition(nav),
		headerMode: 'screen'
	}
);

const AppNavigator = createDrawerNavigator(
	{
		Home: {
			screen: NewsStack,
			navigationOptions: {
				title: 'Startseite'
				// drawerLabel: () => null //hidden from drawer,,
			}
		},
		Favoriten: {
			screen: NewsStack,
			navigationOptions: {
				title: 'Favoriten'
				// drawerLabel: () => null //hidden from drawer,,
			}
		},
		Downloads: {
			screen: Downloads,
			navigationOptions: {
				tabBarLabel: 'Downloads'
			}
		}
	},
	{
		contentComponent: CustomSidebarMenu,
		transitionConfig: nav => handleCustomTransition(nav)
	}

	// {
	// 	// hideStatusBar: true,
	// 	// drawerBackgroundColor: '#FFFFFF',
	// 	// overlayColor: '#6b52ae',
	// 	// color: '#000000',
	// 	// contentOptions: {
	// 	// 	activeTintColor: '#fff',
	// 	// 	activeBackgroundColor: ''
	// 	// }
	// }
);

// const MainDrawer = createStackNavigator(
// 	{
// 		AppNavigator: AppNavigator
// 	},
// 	{
// 		defaultNavigationOptions: {
// 			header: null
// 		}
// 	}
// );

const InitialNavigator = createSwitchNavigator(
	{
		Splash: withFadeTransition(SplashScreen),
		Authentication: withFadeTransition(AuthNavigator),
		App: withFadeTransition(AppNavigator)
	},
	{
		initialRouteName: 'Splash'
	}
);

export default createAppContainer(InitialNavigator);
