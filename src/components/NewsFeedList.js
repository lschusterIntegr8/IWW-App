import React, { Component } from 'react';
import { FlatList, InteractionManager, ActivityIndicator, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import ArticleCard from './ArticleCard';
import { fetchAndAddArticles, getArticleContent } from '../helpers/articles';
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
		InteractionManager.runAfterInteractions(() => {
			// alert('Complete');
			this.setState({ interactionsComplete: true });
		});
	}

	async openArticle(article) {
		const articleContent = await getArticleContent(article.article_id, article.application_id);
		const articleWithContent = { ...articleContent, ...article };
		console.log('articlewithcontent:');
		console.log(articleWithContent);

		this.props.navigation.navigate('SingleArticle', { article: articleWithContent });
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
		if (!this.state.interactionsComplete) {
			return (
				<View style={styles.indicatorContainer}>
					<ActivityIndicator size="large" color="#E3001B" />
				</View>
			);
		}
		return (
			<FlatList
				data={this.props.articles}
				renderItem={this.renderItem}
				keyExtractor={item => (item.article_id ? item.article_id.toString() : '')}
				initialNumToRender={10}
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
