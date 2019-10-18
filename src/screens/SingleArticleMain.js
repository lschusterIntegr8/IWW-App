import React, { Component } from 'react';
import {
	View,
	ScrollView,
	Text,
	Dimensions,
	StyleSheet,
	ActivityIndicator,
	Alert,
	Linking
} from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';
import HTML from 'react-native-render-html';
import Video from 'react-native-video';
import TrackPlayer from 'react-native-track-player';

import { checkAndPrependToUrl } from '../helpers/util/util';

class SingleArticleMain extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		article: undefined
	};
	componentDidMount() {
		// this.backgroundAudioRender();
	}
	backgroundAudioRender(article) {
		TrackPlayer.setupPlayer().then(async () => {
			// TrackPlayer.registerPlaybackService(async () => {
			// 	TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

			// 	TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

			// 	TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());
			// });

			TrackPlayer.updateOptions({
				capabilities: [
					TrackPlayer.CAPABILITY_PLAY,
					TrackPlayer.CAPABILITY_PAUSE,
					TrackPlayer.CAPABILITY_STOP
				]
			});

			// Adds a track to the queue
			await TrackPlayer.add({
				id: 'trackId',
				url: require('../assets/audio/test.wav'),
				title: 'Track Title',
				artist: 'Track Artist'
			});

			// Starts playing it
			TrackPlayer.play();
		});
		// if (this.state.article.audio) {
		// 	const audioSource = `../assets/audio/test.wav`;
		// 	return (
		// 		<View>
		// 			<Video
		// 				source={() => audioSource}
		// 				style={{ width: '100%', height: 400 }}
		// 				muted={false}
		// 				repeat={false}
		// 				resizeMode={'contain'}
		// 				volume={1.0}
		// 				rate={1.0}
		// 				ignoreSilentSwitch={'ignore'}
		// 				playWhenInactive={true}
		// 				playInBackground={true}
		// 				controls={true}
		// 			/>
		// 		</View>
		// 	);
		// }

		// return;
	}

	render() {
		/* Get parameter that is passed via navigation */
		if (!this.state.article) {
			console.log('single article props: ', this.props);
			const { navigation } = this.props;
			console.log(navigation.getParam('article', {}));
			navigation.getParam('article', {}).then(data => {
				console.log('PROMISE DATA: ', data);
				let articleBasic = navigation.getParam('articleBasic', {});
				console.log('Setting state to...', { ...data, ...articleBasic });

				this.setState({ article: { ...data, ...articleBasic } });
			});
		}

		if (this.state.article && this.state.article.content && !this.state.article.audio) {
			return (
				<View style={styles.htmlContainer}>
					<WebView
						ref={ref => {
							this.webview = ref;
						}}
						onNavigationStateChange={async event => {
							console.log('NAVIGATION STATE CHANGE: ', event);
							if (event.url.indexOf('http') !== -1) {
								console.log('STOPPING');
								this.webview.stopLoading();
								Linking.openURL(event.url);
							}
						}}
						style={styles.webview}
						originWhitelist={['*']}
						scalesPageToFit={false}
						source={{
							html: `<!DOCTYPE html>
							<html>
								<head>
									<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
									<link rel="stylesheet" type="text/css" href="https://www.iww.de/css/basic.css"/>
									<link rel="stylesheet" type="text/css" href="https://www.iww.de/css/product.css"/>
								</head>
								<body>
									<div style="padding: 12px; padding-bottom: 42px;">${this.state.article.content}</div>
								</body>
							</html>`
						}}
					/>
				</View>
			);
		} else {
			return (
				<View style={styles.indicatorContainer}>
					<ActivityIndicator size="large" color="#E3001B" />
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	htmlContainer: {
		flex: 1,
		backgroundColor: 'transparent'
	},
	webview: {
		backgroundColor: 'transparent',
		shadowColor: 'transparent',
		shadowOpacity: 0,
		shadowRadius: 0,
		shadowOffset: {
			height: 0,
			width: 0
		}
	},
	indicatorContainer: {
		marginTop: 40
	}
});

SingleArticleMain.propTypes = {
	navigation: PropTypes.object
};

export default SingleArticleMain;
