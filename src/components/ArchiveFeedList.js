import React, { Component } from 'react';
import {
	FlatList,
	View,
	InteractionManager,
	ActivityIndicator,
	StyleSheet,
	Text
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withNavigation, ScrollView } from 'react-navigation';
import { v4 } from 'uuid';

import ArchiveCard from './ArchiveCard';
import DropdownFilter from './DropdownFilter';
import { getArchiveContent } from '../helpers/content';

class ArchiveFeedList extends Component {
	constructor(props) {
		super(props);
		this.renderItem = this.renderItem.bind(this);
	}
	state = {
		interactionsComplete: false,
		contents: [
			{
				title: 'Title 1',
				body: 'Hi. I love this component. What do you think?'
			}
		]
	};

	renderItem({ item }) {
		return <ArchiveCard key={item.articleId} article={item} handlePress={this.openArticle} />;
	}

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			// alert('Complete');
			this.setState({ interactionsComplete: true });
			console.log('ON ARCHIVEFEEDLISTMOUNT');
			/* TODO load  */
			getArchiveContent(this.props.activeSubscriptionFilter.id, undefined);
		});
	}

	componentWillReceiveProps(nextProps) {
		// You don't have to do this check first, but it can help prevent an unneeded render
		console.log('PROPS-CHANGED');
		if (nextProps.activeSubscriptionFilter !== this.props.activeSubscriptionFilter) {
			console.log('PROP IS NOT THE SAME - FILTER CHANGED');
			console.log(
				`Prev ${this.props.activeSubscriptionFilter.id}, new ${nextProps.activeSubscriptionFilter.id}`
			);
			getArchiveContent(nextProps.activeSubscriptionFilter.id, undefined);
		}
	}
	render() {
		if (!this.state.interactionsComplete) {
			return (
				<View style={styles.indicatorContainer}>
					<ActivityIndicator size="large" color="#E3001B" />
				</View>
			);
		}
		return (
			<View>
				{/* Archive category filter */}
				<DropdownFilter archiveIssues={this.props.archiveIssues} />
				{/* Archive flatlist (archived news cards) */}
				<FlatList
					data={this.props.archiveArticles}
					renderItem={this.renderItem}
					keyExtractor={item => v4()}
					initialNumToRender={3}
					windowSize={3}
					maxToRenderPerBatch={2}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	indicatorContainer: {
		marginTop: 40
	}
});

ArchiveFeedList.propTypes = {
	archiveArticles: PropTypes.array,
	navigation: PropTypes.object
};

export default withNavigation(ArchiveFeedList);
