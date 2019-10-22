import React, { Component } from 'react';
import { View, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';

import HeaderMenu from '../components/HeaderMenu';
import NewsFeedWrapper from '../components/NewsFeed.container';
import NestedNews from '../screens/NestedNews';
import InfoServiceWrapper from '../components/InfoService.container';
import SearchBarWrapper from '../components/SearchBarWrapper';
import LoadingScreen from '../components/LoadingScreen';
import AudioPlayerModal from '../components/AudioPlayerModal';
import { setHomeScreenRefreshing, openAudioPlayerModal } from '../redux/actions/index';
import { isCloseToBottom } from '../helpers/util/util';
import { initAppContent, loadMoreArticles } from '../helpers/content';
import {
	getFilteredSubscriptionArticles,
	getCategoryArticles
} from '../redux/selectors/content.selector';
import config from '../config/main';
import { store, persistor } from '../redux/store/index';

const mapStateToProps = state => {
	return {
		activeSubscriptionFilter: state.sessionReducer.activeSubscriptionFilter,
		homeScreenRefreshing: state.sessionReducer.homeScreenRefreshing,
		audioPlayerModal: state.rootReducer.audioPlayerModal,
		activeDropdownItem: state.sessionReducer.activeDropdownItem
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setHomeScreenRefreshing: flag => dispatch(setHomeScreenRefreshing(flag)),
		openAudioPlayerModal: article => dispatch(openAudioPlayerModal(article))
	};
};

class HomeScreen extends Component {
	constructor(props) {
		super(props);
		this.handleInifiniteScroll = this.handleInifiniteScroll.bind(this);
		this.setNewsFeedFilter = this.setNewsFeedFilter.bind(this);
	}

	static navigationOptions = {
		header: null
	};

	state = {
		newsFeedFilter: undefined, // possible: archive / undefined / rubriken
		routeRenderOptions: {
			routeName: 'NewsFeed'
		},
		numOfArticlesPerFetch: config.NUM_OF_ARTICLES_PER_FETCH,
		articlesOffset: config.NUM_OF_ARTICLES_PER_FETCH, // hack to go around IWW's faulty API
		loadingArticles: false,
		animateLoading: false
	};

	BackGroundHandler = async () => {
		console.log('BACKGROUND PLAYER INIT');
		TrackPlayer.setupPlayer();
		TrackPlayer.updateOptions({
			stopWithApp: true,
			capabilities: [
				TrackPlayer.CAPABILITY_PLAY,
				TrackPlayer.CAPABILITY_PAUSE,
				TrackPlayer.CAPABILITY_STOP,
				TrackPlayer.CAPABILITY_SEEK_TO
			]
		});
	};
	/* TODO: Fetch fresh articles and set to store */
	_onRefresh = async () => {
		console.info('Refreshing home screen...');
		console.log('Refreshing home screen...');
		this.props.setHomeScreenRefreshing(true);
		await initAppContent(true, this.props);
		this.props.setHomeScreenRefreshing(false);
	};

	_playHandler = async () => {
		try {
			await TrackPlayer.play();
		} catch (error) {
			console.error(error);
		}
	};

	_pauseHandler = async () => {
		try {
			await TrackPlayer.pause();
		} catch (error) {
			console.error(error);
		}
	};

	_stopHandler = async () => {
		try {
			await TrackPlayer.reset();
			this.props.openAudioPlayerModal([]);
		} catch (error) {
			console.error(error);
		}
	};

	_audioPositionHandler = async value => {
		try {
			await TrackPlayer.seekTo(value);
		} catch (error) {
			console.error(error);
		}
	};

	componentDidMount() {
		console.log('STATE: ', this.props);
		console.log('REFRESHING: ', this.props.homeScreenRefreshing);
		console.log('ROUTE : ', this.props.navigation);
		this.BackGroundHandler();
		this.setState({
			routeRenderOptions: {
				routeName: this.props.navigation.state.routeName
			}
		});
	}

	async handleInifiniteScroll(event) {
		let nativeEvent = event.nativeEvent;
		// console.log('NEWSFEEDFILTER: ', this.state.newsFeedFilter);

		if (
			isCloseToBottom(nativeEvent) &&
			!this.state.loadingArticles &&
			this.state.newsFeedFilter !== 'archive'
		) {
			this.setState({ loadingArticles: true, animateLoading: true }, () => {
				console.info('loadingArticles: ', true);
			});

			console.warn('Reached end of page --> should load more articles');
			/* TODO: load next N articles */
			// loadMoreArticles()
			let articleType = this.props.activeSubscriptionFilter ? 'subscription' : 'general';
			if (this.state.newsFeedFilter === 'rubriken') {
				articleType = 'category';
			}

			let filteredArticles;

			if (articleType === 'category') {
				filteredArticles = getCategoryArticles(store.getState());
			} else {
				filteredArticles = getFilteredSubscriptionArticles(store.getState());
			}

			const newOffset = filteredArticles.length;

			console.log('NEW OFFSET: ', newOffset);

			this.setState(
				{
					articlesOffset: newOffset
				},
				async () => {
					await loadMoreArticles(
						['subscription', 'category'].includes(articleType)
							? this.props.activeSubscriptionFilter.id
							: undefined,
						this.state.numOfArticlesPerFetch,
						this.state.articlesOffset,
						undefined,
						['subscription', 'category'].includes(articleType)
							? this.props.activeSubscriptionFilter.audio
							: undefined,
						undefined,
						['category'].includes(articleType) && this.props.activeDropdownItem
							? this.props.activeDropdownItem
							: undefined,
						articleType
					).catch(err => {
						console.warn(
							'Could not load more articles: ',
							this.state.articlesOffset,
							articleType
						);
						console.warn(err);
						return;
					});

					this.setState(
						{
							articlesOffset:
								this.state.articlesOffset + this.state.numOfArticlesPerFetch,
							animateLoading: false
						},
						() => {
							setTimeout(() => {
								console.info('loadingArticles: ', false);
								this.setState({
									loadingArticles: false
								});
							}, 4000);
						}
					);
				}
			);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		//
		if (prevProps.activeSubscriptionFilter && this.props.activeSubscriptionFilter) {
			if (
				prevProps.activeSubscriptionFilter.id === this.props.activeSubscriptionFilter.id ||
				prevProps.activeSubscriptionFilter.audio ===
					this.props.activeSubscriptionFilter.audio
			) {
				console.log('Not changing - same props.');
			} else {
				console.info(`Resetting offset to ${config.NUM_OF_ARTICLES_PER_FETCH}.`);
				this.setState({ articlesOffset: config.NUM_OF_ARTICLES_PER_FETCH });
			}
		} else if (
			(!prevProps.activeSubscriptionFilter && this.props.activeSubscriptionFilter) ||
			(prevProps.activeSubscriptionFilter && !this.props.activeSubscriptionFilter)
		) {
			console.info(`Resetting offset to ${config.NUM_OF_ARTICLES_PER_FETCH}.`);
			this.setState({ articlesOffset: config.NUM_OF_ARTICLES_PER_FETCH });
		} else {
			console.warn(
				'Prop case not defined: ',
				prevProps.activeSubscriptionFilter,
				this.props.activeSubscriptionFilter
			);
		}
	}

	setNewsFeedFilter(value) {
		console.log('set newsfeedfilter called');
		this.setState({ newsFeedFilter: value });
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<HeaderMenu />
				<SearchBarWrapper />
				<SafeAreaView style={{ flex: 1 }}>
					<ScrollView
						contentInsetAdjustmentBehavior="automatic"
						style={{ flex: 1 }}
						onScroll={this.handleInifiniteScroll}
						scrollEventThrottle={150}
						contentContainerStyle={{
							flexGrow: 1,
							paddingVertical: 30
						}}
						refreshControl={
							<RefreshControl
								refreshing={false}
								onRefresh={this._onRefresh}
								style={{ zIndex: 99 }}
								zIndex={99}
							/>
						}
					>
						{/*--------------------
							Informationsdienste
							--------------------*/}
						<InfoServiceWrapper currentFeedTab={this.state.newsFeedFilter} />

						{/*--------------------
							Meine Inhalte
							--------------------*/}
						{/* <NewsFeedWrapper
							refreshing={this.props.homeScreenRefreshing}
							setNewsFeedFilter={this.setNewsFeedFilter}
						/> */}
						<NestedNews
							refreshing={this.props.homeScreenRefreshing}
							setNewsFeedFilter={this.setNewsFeedFilter}
							options={{ screenRoute: 'home' }}
							animateLoading={this.state.animateLoading}
						/>
					</ScrollView>
					{this.props.activeSubscriptionFilter &&
						this.props.activeSubscriptionFilter.audio &&
						this.props.audioPlayerModal.audio && (
							<AudioPlayerModal
								article={this.props.audioPlayerModal}
								playHandler={this._playHandler}
								stopHandler={this._stopHandler}
								pauseHandler={this._pauseHandler}
								audioPositionHandler={this._audioPositionHandler}
							/>
						)}
				</SafeAreaView>
				{this.props.homeScreenRefreshing && <LoadingScreen />}
			</View>
		);
	}
}

HomeScreen.propTypes = {
	navigation: PropTypes.object,
	activeSubscriptionFilter: PropTypes.object,
	homeScreenRefreshing: PropTypes.bool
};

const HomeScreenContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeScreen);

export default HomeScreenContainer;
