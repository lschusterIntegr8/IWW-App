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

import { checkAndPrependToUrl } from '../helpers/util/util';

class SingleArticleMain extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// console.log(this.props.navigation);
	}

	backgroundAudioRender(article) {
		if (article.audio) {
			const audioSource = `../assets/audio/test.wav`;
			return (
				<View>
					<Video
						source={() => audioSource}
						style={{ width: '100%', height: 400 }}
						muted={false}
						repeat={false}
						resizeMode={'contain'}
						volume={1.0}
						rate={1.0}
						ignoreSilentSwitch={'ignore'}
						playWhenInactive={true}
						playInBackground={true}
						controls={true}
					/>
				</View>
			);
		}

		return;
	}

	render() {
		/* Get parameter that is passed via navigation */
		const { navigation } = this.props;
		const article = navigation.getParam('article', {});

		return (
			<View style={styles.htmlContainer}>
				<ScrollView style={{ flex: 1 }}>
					<HTML
						style={styles.webview}
						html={`<div style="padding: 8px">${article.content}</div>`}
						imagesMaxWidth={Dimensions.get('window').width - 16}
						onLinkPress={async (event, href) => {
							// const cleanedHref = checkAndPrependToUrl(href, articleTag);
							await Linking.openURL(href);
						}}
					/>
				</ScrollView>
			</View>
		);
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
	}
});

SingleArticleMain.propTypes = {
	navigation: PropTypes.object
};

export default SingleArticleMain;
