import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, Platform } from 'react-native';
import PropTypes from 'prop-types';
import COLOR from '../config/colors';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Button } from 'react-native-elements';

// import Onboarding from 'react-native-onboarding-swiper';
import AppIntroSlider from 'react-native-app-intro-slider';
const styles = StyleSheet.create({
	mainContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		marginBottom: 80,
		paddingTop: Platform.OS === 'ios' ? 20 : 0
	},
	image: {
		width: 320,
		height: 320
	},
	text: {
		color: COLOR.BLUE,
		backgroundColor: COLOR.WHITE,
		textAlign: 'center',
		paddingHorizontal: 16
	},
	title: {
		fontSize: 35,
		fontWeight: 'bold',
		color: COLOR.BLUE,
		textAlign: 'center',
		marginBottom: 16
	},
	paginationStyleActive: {
		backgroundColor: COLOR.RED
	},
	paginationStyleInactive: {
		backgroundColor: COLOR.GREY
	},
	loginButton: {
		backgroundColor: COLOR.BLUE,
		marginHorizontal: 40
	},
	signupButton: {
		backgroundColor: 'transparent',
		marginTop: 32,
		marginHorizontal: 40
	},
	welcomeLogo: {
		width: 85,
		marginBottom: 42,
		resizeMode: 'contain'
	}
});

const slides = [
	{
		key: 'somethun',
		title: 'Herzlich Wilkommen',
		text: '',
		titleStyle: styles.title,
		textStyle: styles.text
	},
	{
		key: 'somethun1',
		title: 'Super customizable',
		text:
			'The component is also super customizable, so you can adapt it to cover your needs and wants.',
		titleStyle: styles.title,
		textStyle: styles.text
	},
	{
		key: 'somethun2',
		title: 'No need to buy me beer',
		text: 'Usage is all free',
		titleStyle: styles.title,
		textStyle: styles.text
	}
];
class WelcomeOnboarding extends Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
		title: 'WelcomeOnboarding',
		header: null
	};

	componentDidMount() {
		// alert(slides[0]);
	}

	/* return (
			<Onboarding
				onDone={() => alert('done')}
				pages={[
					{
						backgroundColor: '#fff',
						image: <Image source={require('../assets/images/iww-logo-splash.png')} />,
						title: 'Herzlich Wilkommen',
						subtitle: ''
					},
					{
						backgroundColor: '#fe6e58',
						image: <Image source={require('../assets/images/iww-logo-splash.png')} />,
						title: 'The Title',
						subtitle: 'This is the subtitle that sumplements the title.'
					},
					{
						backgroundColor: '#999',
						image: <Image source={require('../assets/images/iww-logo-splash.png')} />,
						title: 'Triangle',
						subtitle: "Beautiful, isn't it?"
					}
				]}
			/>
		); */

	_renderItem = props => {
		const { item } = props;
		console.log('Title: ', item.title);

		return (
			<View style={styles.mainContent}>
				<Image
					style={styles.welcomeLogo}
					source={require('../assets/images/iww-logo-splash.png')}
				/>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.text}>{item.text}</Text>
			</View>
		);
	};

	_renderNextButton = () => {
		return (
			<View>
				<Button
					buttonStyle={styles.loginButton}
					titleStyle={{ fontSize: 13, fontWeight: 'bold' }}
					title="ANMELDEN"
				/>
				<Button
					buttonStyle={styles.signupButton}
					titleStyle={{ color: 'rgba(1, 49, 95, 0.3)', fontSize: 12, fontWeight: 'bold' }}
					title="Noch keinen Account?"
				/>
			</View>
		);
	};

	render() {
		return (
			<View style={{ flex: 1, flexDirection: 'column', flexWrap: 'wrap' }}>
				<AppIntroSlider
					style={{ flex: 1 }}
					slides={slides}
					bottomButton
					renderItem={this._renderItem}
					activeDotStyle={styles.paginationStyleActive}
					dotStyle={styles.paginationStyleInactive}
					buttonStyle={styles.nextButton}
					renderDoneButton={this._renderNextButton}
					renderNextButton={this._renderNextButton}
				/>
			</View>
		);
	}
}

WelcomeOnboarding.propTypes = {};

export default WelcomeOnboarding;
