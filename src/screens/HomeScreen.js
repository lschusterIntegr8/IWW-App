import React, { Component } from 'react';
import { View, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderMenu from '../components/HeaderMenu';
import NewsFeedWrapper from '../components/NewsFeed.container';
import InfoServiceWrapper from '../components/InfoService.container';
import SearchBarWrapper from '../components/SearchBarWrapper';
import { addArticle } from '../redux/actions/index';
import { isCloseToBottom } from '../helpers/util/util';
import { initAppContent } from '../helpers/content';

const mapStateToProps = state => {
	return {
		activeSubscriptionFilter: state.activeSubscriptionFilter
	};
};

const mapDispatchToProps = dispatch => {
	return {
		addArticle: article => dispatch(addArticle(article))
	};
};

class HomeScreen extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		refreshing: false
	};

	static navigationOptions = {
		header: null
	};

	/* TODO: Fetch fresh articles and set to store */
	_onRefresh = async () => {
		this.setState({ refreshing: true });
		await initAppContent(true, this.props);
		this.setState({ refreshing: false });
	};

	componentDidMount() {
		console.log('STATE: ', this.state);
	}

	handleInifiniteScroll({ nativeEvent }) {
		console.log('Onscroll');
		if (isCloseToBottom(nativeEvent)) {
			console.warn('Reached end of page --> should load more articles');
		}
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
								refreshing={this.state.refreshing}
								onRefresh={this._onRefresh}
								style={{ zIndex: 99 }}
								zIndex={99}
							/>
						}
					>
						{/*--------------------
								Informationsdienste
							--------------------*/}
						<InfoServiceWrapper />

						{/*--------------------
								Meine Inhalte
							--------------------*/}
						<NewsFeedWrapper refreshing={this.state.refreshing} />
					</ScrollView>
				</SafeAreaView>
			</View>
		);
	}
}

HomeScreen.propTypes = {
	navigation: PropTypes.object,
	activeSubscriptionFilter: PropTypes.object
};

const HomeScreenContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeScreen);

export default HomeScreenContainer;
