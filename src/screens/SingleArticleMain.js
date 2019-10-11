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

	state = {
		article: undefined
	};

	backgroundAudioRender(article) {
		if (this.state.article.audio) {
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
		if (!this.state.article) {
			const { navigation } = this.props;
			navigation.getParam('article', {}).then(data => {
				console.log('PROMISE DATA: ', data);
				let articleBasic = navigation.getParam('articleBasic', {});
				console.log('Setting state to...', { ...data, ...articleBasic });

				this.setState({ article: { ...data, ...articleBasic } });
			});
		}

		if (this.state.article && this.state.article.content) {
			return (
				<View style={styles.htmlContainer}>
					{/* <ScrollView style={{ flex: 1 }}> */}
					{/* <HTML
							style={styles.webview}
							html={`
							<!DOCTYPE html>
							<html>
								<head>
									<link rel="stylesheet" type="text/css" href="https://www.iww.de/css/basic.css"/>
									<link rel="stylesheet" type="text/css" href="https://www.iww.de/css/product.css"/>
								</head>
								<body>
									<div style="padding: 8px">${this.state.article.content}</div>
									<link rel="stylesheet" type="text/css" href="https://www.iww.de/css/basic.css"/>
									<link rel="stylesheet" type="text/css" href="https://www.iww.de/css/product.css"/>
								</body>
							</html>`}
							// 							html={`<div style="padding: 8px">${this.state.article.content}</div><link rel="stylesheet" type="text/css" href="https://www.iww.de/css/basic.css"/>
							// <link rel="stylesheet" type="text/css" href="https://www.iww.de/css/product.css"/>`}
							imagesMaxWidth={Dimensions.get('window').width - 16}
							onLinkPress={async (event, href) => {
								// const cleanedHref = checkAndPrependToUrl(href, articleTag);
								await Linking.openURL(href);
							}}
							ignoredTags={[]}
							ignoredStyles={[]}
							classesStyles={stylesCSS}
						/> */}

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
					{/* </ScrollView> */}
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

const stylesCSS = StyleSheet.create({
	wrapper_sub_header: {
		zIndex: 999,
		borderBottomWidth: 0
	},

	product_list: {
		overflow: 'hidden',
		borderBottomWidth: 1,
		borderColor: '#ccc'
	},
	teaser_box: {
		overflow: 'hidden',
		backgroundColor: '#f1f1f1',
		paddingTop: '10%',
		paddingRight: '10%',
		paddingBottom: '10%',
		paddingLeft: '10%',
		marginBottom: '12%'
	},
	filter: {
		overflow: 'hidden'
	},
	'teaser_iww-seminare': {
		overflow: 'hidden',
		backgroundColor: '#f1f1f1',
		paddingTop: '10%',
		paddingRight: '10%',
		paddingBottom: '10%',
		paddingLeft: '10%',
		marginBottom: '12%'
	},
	last: {
		marginRight: '0 !important'
	},
	left: {
		// float: 'left'
	},
	right: {
		// float: 'right'
	},
	phone: {},

	'm-t-10': {
		marginTop: 10
	},
	'm-t-20': {
		marginTop: 20
	},
	'm-b-10': {
		marginBottom: 10
	},
	'm-b-20': {
		marginBottom: 20
	},
	flex: {
		justifyContent: 'space-between',
		flexWrap: 'wrap'
	},
	button_switch: {
		color: '#444',
		fontWeight: '100'
	},
	balken: {
		color: '#444',
		fontWeight: '100'
	},
	button_grey: {
		color: '#fff',
		fontWeight: '100',

		textAlign: 'center',
		paddingTop: 12,
		paddingRight: 25,
		paddingBottom: 8,
		paddingLeft: 25,
		borderRadius: 3,
		textDecorationLine: 'none',
		textDecorationColor: 'black',
		textDecorationStyle: 'solid',
		borderWidth: 0,
		borderColor: 'black',
		borderStyle: 'solid'
		// backgroundImage: 'url(/img/button_bg_grey.png)'
	},
	test_button: {
		color: '#fff',
		fontWeight: '100',

		textAlign: 'center',
		paddingTop: 12,
		paddingRight: 25,
		paddingBottom: 8,
		paddingLeft: 25,
		borderRadius: 3,
		textDecorationLine: 'none',
		textDecorationColor: 'black',
		textDecorationStyle: 'solid',
		borderWidth: 0,
		borderColor: 'black',
		borderStyle: 'solid'
		// backgroundImage: 'url(/img/button_bg_grey.png)'
	},
	button_blue: {
		color: '#fff',
		fontWeight: '100',

		textAlign: 'center',
		paddingTop: 12,
		paddingRight: 25,
		paddingBottom: 8,
		paddingLeft: 25,
		borderRadius: 3,
		textDecorationLine: 'none',
		textDecorationColor: 'black',
		textDecorationStyle: 'solid',
		borderWidth: 0,
		borderColor: 'black',
		borderStyle: 'solid'
		// backgroundImage: 'url(/img/button_bg_blue.png)'
	},
	button_green: {
		color: '#fff',
		fontWeight: '100',

		textAlign: 'center',
		paddingTop: 12,
		paddingRight: 25,
		paddingBottom: 8,
		paddingLeft: 25,
		borderRadius: 3,
		textDecorationLine: 'none',
		textDecorationColor: 'black',
		textDecorationStyle: 'solid',
		borderWidth: 0,
		borderColor: 'black',
		borderStyle: 'solid'
		// backgroundImage: 'url(/img/button_bg_grey.png)'
	},
	button_orange: {
		color: '#fff',
		textAlign: 'center',
		paddingTop: 12,
		paddingRight: 25,
		paddingBottom: 8,
		paddingLeft: 25,
		borderRadius: 3,
		textDecorationLine: 'none',
		textDecorationColor: 'black',
		textDecorationStyle: 'solid',
		borderWidth: 0,
		borderColor: 'black',
		borderStyle: 'solid'
	},
	'button_switch.active': {
		color: '#fff'
	},
	highlightkeyword: {
		color: '#fff',
		backgroundColor: '#00305e'
	},
	available_soon: {
		color: '#a1a1a1',
		fontWeight: '100'
	},
	slider: {
		backgroundColor: '#f1f1f1',
		position: 'relative',
		paddingTop: '3%',
		paddingRight: '6%',
		paddingBottom: '3%',
		paddingLeft: '6%',
		width: '53%'
		// float: 'left'
	},
	textfield: {
		fontWeight: '100',
		color: '#444',
		paddingTop: 12,
		paddingRight: 10,
		paddingBottom: 8,
		paddingLeft: 10,
		width: 363,
		borderWidth: 1,
		borderColor: '#ccc',
		borderStyle: 'solid'
	},
	textarea: {
		fontWeight: '100',

		color: '#444',
		paddingTop: 12,
		paddingRight: 10,
		paddingBottom: 8,
		paddingLeft: 10,
		width: 363,
		borderWidth: 1,
		borderColor: '#ccc',
		borderStyle: 'solid'
	},
	interview_frage_abs: {
		fontWeight: '100',
		fontStyle: 'italic',
		marginBottom: 0
	},
	Autorenzeile: {
		fontWeight: '100',

		marginBottom: 20
	},
	Autorenzeile_KI: {
		fontWeight: '100'
	},
	articlesource: {
		fontWeight: '100'
	},
	like_h2: {
		fontWeight: '100'
	},
	span_b: {
		fontWeight: '100'
	},
	level1: {
		fontWeight: '100'
	},
	button: {
		fontWeight: '100'
	},
	filter_type: {
		fontWeight: '100',

		marginBottom: 10
	},
	'Ueberschrift-gross': {
		fontWeight: '100'
	},
	'Ueberschrift-Autor': {
		fontWeight: '100'
	},
	'Ueberschrift-autor': {
		fontWeight: '100'
	},
	titel: {
		fontWeight: '100'
	},
	level2: {
		fontWeight: '100'
	},
	'Ueberschrift-klein': {
		fontWeight: '100',

		marginBottom: 10
	},
	tabelle_fett_bunt: {
		fontWeight: '100'
	},
	interview_frage: {
		fontWeight: '100'
	},
	interview_antwort: {
		fontWeight: '100'
	},
	blue_headline: {
		fontWeight: '100'
	},
	user_data_title: {
		fontWeight: '100'
	},
	webinar__title: {
		fontWeight: '100',

		marginBottom: 10
	},
	editor_name: {
		fontWeight: '100',
		fontStyle: 'italic'
	},
	paging: {
		fontWeight: '100'
	},
	'infra-title': {
		fontWeight: '100'
	},
	Grundtext: {
		marginBottom: 0
	},
	Einzug1: {},
	quality_content: {
		// float: 'right',
		width: '55%'
	},
	hint: {},
	source: {},
	cooperation_line: {},
	optional: {
		marginTop: 30
	},
	Bildzeile: {},
	success_hint: {},
	Dachzeile: {},
	dachzeile: {},
	'Ueberschrift-mittel': {
		marginBottom: 10
	},
	kasten: {
		marginBottom: 20
	},
	mer_quelle: {
		marginBottom: 0
	},
	interview_antwort_abs: {
		marginBottom: 0
	},
	klein: {
		marginBottom: 0
	},
	header: {
		width: 1200,
		marginTop: 0,
		marginRight: 'auto',
		marginBottom: 0,
		marginLeft: 'auto',
		paddingTop: 20,
		paddingRight: 0,
		paddingBottom: 20,
		paddingLeft: 0
	},
	wrapper_header: {
		borderBottomWidth: 1,
		borderBottomColor: '#ccc'
	},
	main_content: {
		// float: 'left',
		width: '67%',
		position: 'relative'
	},
	teaser: {
		// float: 'right',
		width: '30%'
	},
	btn: {},
	slider_img: {
		// float: 'left',
		marginRight: '4%'
	},
	box_head: {
		marginBottom: 20
	},
	'teaser_box.content_box': {
		width: '40%',
		paddingTop: '4%',
		paddingRight: '4%',
		paddingBottom: '4%',
		paddingLeft: '4%'
	},
	'teaser_box.seminars_contact_box': {
		position: 'relative'
	},
	'webapp-header__link': {
		// float: 'left',
		paddingTop: 4,
		paddingRight: 0,
		paddingBottom: 5,
		paddingLeft: 15
	},
	'webapp-header__arrow': {
		height: 20,
		position: 'relative',
		top: 4,
		marginRight: 5
	},
	brand_value: {
		width: '18.4%',
		// float: 'left',
		marginRight: '1%'
	},
	icon_seminar: {
		width: 40,
		// float: 'left',
		marginTop: 4,
		marginRight: 20,
		marginBottom: 0,
		marginLeft: 0
	},
	icon_newsletter: {
		width: 50,
		// float: 'left',
		marginTop: 4,
		marginRight: 20,
		marginBottom: 0,
		marginLeft: 0
	},
	icon_facebook: {
		width: 50,
		// float: 'left',
		marginTop: 4,
		marginRight: 20,
		marginBottom: 0,
		marginLeft: 0
	},
	icon_twitter: {
		width: 50,
		// float: 'left',
		marginTop: 4,
		marginRight: 20,
		marginBottom: 0,
		marginLeft: 0
	},
	quality: {
		width: '100%',
		marginBottom: 30,
		maxHeight: 110
	},
	'f-18': {
		fontSize: 18
	},
	checkbox_with_text: {
		marginTop: 20,
		marginRight: 0,
		marginBottom: 5,
		marginLeft: 0
	},
	further_links: {
		marginTop: 40
	},
	'hint-red': {
		borderWidth: 2,
		borderColor: '#e60004',
		borderStyle: 'solid',
		color: '#444',
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		textAlign: 'center',
		width: '99%',
		marginBottom: 25
	},
	loader: {
		overflow: 'hidden',
		left: 5,
		top: 28,
		fontSize: 2,
		position: 'relative',

		borderColor: '#00305e',
		borderStyle: 'solid',
		borderLeftWidth: 1.1,
		borderLeftColor: '#e60004',

		borderRadius: 50
	}
});
export default SingleArticleMain;
