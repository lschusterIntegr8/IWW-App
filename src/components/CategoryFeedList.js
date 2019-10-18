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
import { getCategoryContent, getArticleContent } from '../helpers/content';

class CategoryFeedList extends Component {
	constructor(props) {
		super(props);
		this.openArticle = this.openArticle.bind(this);
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

	async openArticle(article) {
		let audioVersion = undefined;
		console.log('Opening: ', this.props.activeSubscriptionFilter);
		if (this.props.activeSubscriptionFilter && this.props.activeSubscriptionFilter.audio) {
			console.log('SHOULD OPEN AUDIO VERSION');
			audioVersion = true;
		}

		const articleContent = getArticleContent(
			article.article_id,
			article.application_id,
			audioVersion
		);

		this.props.navigation.navigate('SingleArticle', {
			article: articleContent, // single article details (content / html)
			articleBasic: article // basic article info
		});
	}

	renderItem({ item }) {
		return (
			<ArchiveCard
				key={item.articleId}
				article={item}
				handlePress={this.openArticle}
				downloadedArticles={this.props.downloadedArticles}
			/>
		);
	}

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			// alert('Complete');
			this.setState({ interactionsComplete: true });
			console.log('ON ARCHIVEFEEDLISTMOUNT');
			/* TODO load  */
			console.log('LOADING FOR: ', this.props.activeSubscriptionFilter.id);
			getCategoryContent(
				this.props.activeSubscriptionFilter.id,
				undefined,
				this.props.activeSubscriptionFilter.audio &&
					this.props.activeSubscriptionFilter.audio === true
					? true
					: undefined
			);
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

			console.log('SUBID GETCATEGORYCONTENT: ', nextProps.activeSubscriptionFilter.id);
			getCategoryContent(
				nextProps.activeSubscriptionFilter.id,
				undefined,
				nextProps.activeSubscriptionFilter.audio &&
					nextProps.activeSubscriptionFilter.audio === true
					? true
					: undefined
			);
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
				<DropdownFilter issues={this.props.issues} activeView={this.props.activeView} />
				{/* Archive flatlist (archived news cards) */}
				<FlatList
					data={this.props.articles}
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

CategoryFeedList.propTypes = {
	articles: PropTypes.array,
	issues: PropTypes.array,
	navigation: PropTypes.object,
	activeView: PropTypes.string
};

export default withNavigation(CategoryFeedList);
