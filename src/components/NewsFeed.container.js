import React from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import NewsFeedList from './NewsFeedList';
import ArchiveFeedList from './ArchiveFeedList';
import COLOR from '../config/colors';
import { getArticles } from '../redux/selectors/content.selector';

const mapStateToProps = state => ({
	articles: getArticles(state)
});
class NewsFeedWrapper extends React.Component {
	constructor(props) {
		super(props);
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
			easing: Easing.cubic
		}).start(() => {
			if (this.state.runRefreshAnimation) this.opacity();
		});
	}

	toggleFilter(filterName) {
		if (this.state.currentFilter === filterName) {
			return this.setState({ currentFilter: undefined });
		}
		return this.setState({ currentFilter: filterName });
	}

	renderFilteredView() {
		if (!this.state.currentFilter) {
			return <NewsFeedList articles={this.props.articles} />;
		} else if (this.state.currentFilter === 'archive') {
			return <ArchiveFeedList />;
		} else if (this.state.currentFilter === 'rubriken') {
			return (
				<View>
					<Text>THIS IS THE RUBRIKEN</Text>
				</View>
			);
		}
	}

	/* Handle refresh animation state */
	componentDidUpdate(prevProps, prevState) {
		if (!prevProps.refreshing && this.props.refreshing) {
			this.setState({ runRefreshAnimation: true }, () => {
				this.opacity();
			});
		} else if (prevProps.refreshing && !this.props.refreshing) {
			this.setState({ runRefreshAnimation: false }, () => {
				this.opacityValue.stopAnimation(() => {
					this.opacityValue.setValue(0);
				});
			});
		}
	}

	render() {
		const opacity = this.opacityValue.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [1, 0.75, 1]
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
	refreshing: PropTypes.bool
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

const NewsFeedWrapperContainer = connect(mapStateToProps)(NewsFeedWrapper);

export default NewsFeedWrapperContainer;
