import React, { Component } from 'react';
import { FlatList, InteractionManager, ActivityIndicator, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import ArticleCard from './ArticleCard';
import { fetchAndAddArticles, getArticleContent } from '../helpers/content';
import HeaderMenu from '../components/HeaderMenu';
import SearchBarWrapper from '../components/SearchBarWrapper';

// import { isCloseToBottom } from '../helpers/util/util';

class NewsFeedList extends Component {
	constructor(props) {
		super(props);
		this.openArticle = this.openArticle.bind(this);
		this.renderItem = this.renderItem.bind(this);
	}

	state = {
		interactionsComplete: false,
		page: 1
	};

	componentDidMount() {
		console.log('ARTICLES MOUNT:');
		console.log(this.props.articles);
		console.log(this.props.activeSubscriptionFilter);
		InteractionManager.runAfterInteractions(() => {
			// alert('Complete');
			this.setState({ interactionsComplete: true });
		});
	}

	async openArticle(article) {
		let audioVersion = undefined;
		console.log('Opening: ', this.props.activeSubscriptionFilter);
		if (this.props.activeSubscriptionFilter && this.props.activeSubscriptionFilter.audio) {
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
		return <ArticleCard key={item.article_id} article={item} handlePress={this.openArticle} />;
	}

	// async loadMoreArticles() {
	// 	console.log('PAGE: ');
	// 	console.log(this.state.page);
	// 	await fetchAndAddArticles(undefined, 10, this.state.page, undefined);
	// 	console.log('ARTICLES AFTER ADD');
	// 	console.log(this.props.articles);
	// 	this.setState({ page: this.state.page + 1 });
	// }

	render() {
		return (
			<FlatList
				data={this.props.articles}
				renderItem={this.renderItem}
				keyExtractor={item => (item.article_id ? item.article_id.toString() : '')}
				initialNumToRender={10}
				// ListHeaderComponent={() => (
				// 	<View style={{ flex: 1 }}>
				// 		<HeaderMenu />
				// 		<SearchBarWrapper />
				// 	</View>
				// )}
			/>
		);
	}
}

const styles = StyleSheet.create({
	indicatorContainer: {
		marginTop: 40
	}
});

NewsFeedList.propTypes = {
	articles: PropTypes.array,
	navigation: PropTypes.object
};

export default withNavigation(NewsFeedList);
