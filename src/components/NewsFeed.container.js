import React from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import NewsFeedList from './NewsFeedList';
import ArchiveFeedList from './ArchiveFeedList';
import CategoryFeedList from './CategoryFeedList';
import COLOR from '../config/colors';
import {
	getFilteredSubscriptionArticles,
	getArticles,
	test
} from '../redux/selectors/content.selector';
import { getArchiveContent } from '../helpers/content';

const makeMapStateToProps = () => {
	const filteredArticles = getFilteredSubscriptionArticles;
	const mapStateToProps = state => {
		return {
			articles: filteredArticles(state),
			archiveIssues: state.rootReducer.archiveIssues,
			archiveArticles: state.rootReducer.archiveArticles,
			activeSubscriptionFilter: state.sessionReducer.activeSubscriptionFilter,
			categoryIssues: state.rootReducer.categoryIssues,
			categoryArticles: state.rootReducer.categoryArticles,
			downloadedArticles: state.rootReducer.downloadedArticles
		};
	};

	return mapStateToProps;
};

class NewsFeedWrapper extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log('MOUNTED NEWSFEED');
		console.info(this.props.articles);
	}

	state = {
		currentFilter: undefined,
		runRefreshAnimation: false
	};

	opacityValue = new Animated.Value(0);

	opacity() {
		this.opacityValue.setValue(0);
		Animated.timing(this.opacityValue, {
			toValue: 1,
			duration: 2000,
			easing: Easing.cubic,
			useNativeDriver: true
		}).start(() => {
			if (this.state.runRefreshAnimation) this.opacity();
		});
	}

	toggleFilter(filterName) {
		if (this.state.currentFilter === filterName) {
			this.props.setNewsFeedFilter(undefined);
			return this.setState({ currentFilter: undefined });
		}
		this.props.setNewsFeedFilter(filterName);
		return this.setState({ currentFilter: filterName });
	}

	renderFilteredView() {
		/* DEFAULT - RANDOM NEWS */
		if (!this.state.currentFilter) {
			return (
				<NewsFeedList
					articles={this.props.articles}
					activeSubscriptionFilter={this.props.activeSubscriptionFilter}
				/>
			);
		} /* ARCHIVE */ else if (this.state.currentFilter === 'archive') {
			if (!this.props.activeSubscriptionFilter) {
				return (
					<View style={{ flex: 1, textAlign: 'center' }}>
						<Text style={{ textAlign: 'center' }}>
							Bitte wählen sie einen Informationsdiensten aus.
						</Text>
					</View>
				);
			}

			return (
				<ArchiveFeedList
					issues={this.props.archiveIssues}
					articles={this.props.archiveArticles}
					activeSubscriptionFilter={this.props.activeSubscriptionFilter}
					activeView={this.state.currentFilter}
					downloadedArticles={this.props.downloadedArticles}
				/>
			);
		} else if (this.state.currentFilter === 'rubriken') {
			if (!this.props.activeSubscriptionFilter) {
				return (
					<View style={{ flex: 1, textAlign: 'center' }}>
						<Text style={{ textAlign: 'center' }}>
							Bitte wählen sie einen Informationsdiensten aus.
						</Text>
					</View>
				);
			}

			return (
				<CategoryFeedList
					issues={this.props.categoryIssues}
					articles={this.props.categoryArticles}
					activeSubscriptionFilter={this.props.activeSubscriptionFilter}
					activeView={this.state.currentFilter}
					downloadedArticles={this.props.downloadedArticles}
				/>
			);
		}
	}

	/* Handle refresh animation state */
	componentDidUpdate(prevProps, prevState) {
		if (!prevProps.animateLoading && this.props.animateLoading) {
			console.log('Run animation');
			this.setState({ runRefreshAnimation: true }, () => {
				this.opacity();
			});
		} else if (prevProps.animateLoading && !this.props.animateLoading) {
			console.log('Stop animation');
			setTimeout(() => {
				this.setState({ runRefreshAnimation: false }, () => {
					this.opacityValue.stopAnimation(() => {
						this.opacityValue.setValue(0);
					});
				});
			}, 1000);
		}
	}

	render() {
		const opacity = this.opacityValue.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [1, 0.5, 1]
		});

		return (
			<View>
				<View style={styles.inhalteHeaderWrapper}>
					<Text style={styles.inhalteHeading}>Meine Inhalte</Text>
					<View style={styles.filterBar}>
						<Button
							buttonStyle={[
								styles.filterButton,
								this.state.currentFilter === 'archive'
									? styles.filterActiveButton
									: null
							]}
							titleStyle={[
								styles.filterButtonTitle,
								this.state.currentFilter === 'archive'
									? styles.filterActiveButtonTitle
									: null
							]}
							title="Archiv"
							onPress={() => this.toggleFilter('archive')}
						/>
						<Button
							buttonStyle={[
								styles.filterButton,
								this.state.currentFilter === 'rubriken'
									? styles.filterActiveButton
									: null
							]}
							titleStyle={[
								styles.filterButtonTitle,
								this.state.currentFilter === 'rubriken'
									? styles.filterActiveButtonTitle
									: null
							]}
							title="Rubriken"
							onPress={() => this.toggleFilter('rubriken')}
						/>
					</View>
				</View>
				<Animated.View style={[{ opacity }]}>
					{/* 
				RENDER CORRECT VIEW BASED ON CURRENT SELECTED FILTER
				1. undefined ==> News Feed List
				2. archive ==> Archive
				3. rubriken ==> Rubriken
				*/
					this.renderFilteredView()}
				</Animated.View>
			</View>
		);
	}
}

NewsFeedWrapper.propTypes = {
	navigation: PropTypes.object,
	refreshing: PropTypes.bool,
	setNewsFeedFilter: PropTypes.func
};

const styles = StyleSheet.create({
	inhalteHeaderWrapper: {
		paddingHorizontal: 16,
		marginBottom: 30,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-end'
	},
	inhalteHeading: {
		fontSize: 20,
		fontWeight: 'bold',
		color: COLOR.DARK_GREY_HEADING,
		flex: 1,
		justifyContent: 'flex-end'
	},
	filterBar: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		flex: 1
	},
	filterButton: {
		backgroundColor: COLOR.LIGHT_GREY_FILTER,
		height: 24,
		borderRadius: 50,
		padding: 0,
		marginLeft: 12
	},
	filterButtonTitle: {
		fontSize: 14,
		fontWeight: 'bold',
		color: 'rgba(0, 0, 0, 1)',
		padding: 14
	},
	filterActiveButton: {
		backgroundColor: COLOR.RED
	},
	filterActiveButtonTitle: {
		color: COLOR.WHITE,
		fontWeight: 'bold'
	}
});

const NewsFeedWrapperContainer = connect(makeMapStateToProps)(NewsFeedWrapper);

export default NewsFeedWrapperContainer;
