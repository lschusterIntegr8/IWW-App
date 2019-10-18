import React, { Component } from 'react';
import { View, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderMenu from '../components/HeaderMenu';
import NewsFeedWrapper from '../components/NewsFeed.container';
import NestedNews from '../screens/NestedNews';
import InfoServiceWrapper from '../components/InfoService.container';
import SearchBarWrapper from '../components/SearchBarWrapper';
import LoadingScreen from '../components/LoadingScreen';
import AudioPlayerModal from '../components/AudioPlayerModal';
import { setHomeScreenRefreshing, openAudioPlayerModal } from '../redux/actions/index';
import { isCloseToBottom } from '../helpers/util/util';
import { initAppContent } from '../helpers/content';
import TrackPlayer from 'react-native-track-player';

const mapStateToProps = state => {
	return {
		activeSubscriptionFilter: state.sessionReducer.activeSubscriptionFilter,
		homeScreenRefreshing: state.sessionReducer.homeScreenRefreshing,
		audioPlayerModal: state.rootReducer.audioPlayerModal
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
	}

	static navigationOptions = {
		header: null
	};

	state = {
		newsFeedFilter: undefined, // archive/undefined/rubriken
		routeRenderOptions: {
			routeName: 'NewsFeed'
		}
	};

	BackGroundHandler = async () => {
		TrackPlayer.setupPlayer();
		TrackPlayer.updateOptions({
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

	handleInifiniteScroll({ nativeEvent }) {
		console.log('Onscroll');
		if (isCloseToBottom(nativeEvent)) {
			console.warn('Reached end of page --> should load more articles');
			/* TODO: load next N articles */
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
						scrollEventThrottle={0}
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
