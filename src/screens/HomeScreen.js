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
import { addArticle, setHomeScreenRefreshing } from '../redux/actions/index';
import { isCloseToBottom } from '../helpers/util/util';
import { initAppContent, getArchiveContent } from '../helpers/content';

const mapStateToProps = state => {
	return {
		activeSubscriptionFilter: state.sessionReducer.activeSubscriptionFilter,
		homeScreenRefreshing: state.sessionReducer.homeScreenRefreshing
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addArticle: article => dispatch(addArticle(article)),
		setHomeScreenRefreshing: flag => dispatch(setHomeScreenRefreshing(flag))
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

	/* TODO: Fetch fresh articles and set to store */
	_onRefresh = async () => {
		console.info('Refreshing home screen...');
		console.log('Refreshing home screen...');
		this.props.setHomeScreenRefreshing(true);
		await initAppContent(true, this.props);
		this.props.setHomeScreenRefreshing(false);
	};

	componentDidMount() {
		console.log('STATE: ', this.props);
		console.log('REFRESHING: ', this.props.homeScreenRefreshing);
		console.log('ROUTE : ', this.props.navigation);
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
		}
	}

	setNewsFeedFilter(value) {
		console.log('set newsfeedfilter called');
		this.setState({ newsFeedFilter: value });
		// if (value !== undefined) {
		// 	getArchiveContent(this.props.activeSubscriptionFilter, undefined);
		// }
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
								refreshing={this.props.homeScreenRefreshing}
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
