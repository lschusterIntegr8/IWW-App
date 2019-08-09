import React from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import PropTypes from 'prop-types';
import COLOR from '../config/colors';

const SPLASH_SCREEN_TIMEOUT = 500;
class SplashScreen extends React.Component {
	performTimeConsumingTask = async () => {
		return new Promise(resolve =>
			setTimeout(() => {
				resolve('result');
			}, SPLASH_SCREEN_TIMEOUT)
		);
	};

	async componentDidMount() {
		// Preload data from an external API
		// Preload data using AsyncStorage
		const data = await this.performTimeConsumingTask();

		if (data !== null) {
			this.props.navigation.navigate('Authentication');
		}
	}

	render() {
		return (
			<View style={styles.mainContainer}>
				<Image
					style={styles.splashLogo}
					source={require('../assets/images/iww-logo-splash.png')}
				/>
				<View style={styles.indicatorContainer}>
					<ActivityIndicator size="large" color="#E3001B" />
					<Text style={styles.loadingText}>WIRD GELADEN</Text>
				</View>
			</View>
		);
	}
}

SplashScreen.propTypes = {
	navigation: PropTypes.object
};

const styles = {
	mainContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLOR.WHITE
	},
	splashLogo: {
		width: 125,
		resizeMode: 'contain'
	},
	indicatorContainer: {
		marginTop: 52
	},
	loadingText: {
		fontWeight: 'bold',
		fontSize: 10,
		marginTop: 20
	}
};

export default SplashScreen;
