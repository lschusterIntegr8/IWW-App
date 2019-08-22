import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import ArticleCard from './ArticleCard';

const mapStateToProps = state => ({
	articles: state.articles
});

class NewsFeedList extends Component {
	constructor(props) {
		super(props);
		this.openArticle = this.openArticle.bind(this);
	}

	openArticle(article) {
		console.log('RECEIVED ARTICLE: ', article);
		this.props.navigation.navigate('SingleArticle', { article: article });
	}

	render() {
		return (
			<FlatList
				data={this.props.articles}
				renderItem={({ item }) => (
					<ArticleCard
						key={item.articleId}
						article={item}
						handlePress={this.openArticle}
					/>
				)}
				keyExtractor={item => item.url}
			/>
		);
	}
}
NewsFeedList.propTypes = {
	articles: PropTypes.array,
	navigation: PropTypes.object
};

const NewsFeedListContainer = connect(mapStateToProps)(NewsFeedList);

export default withNavigation(NewsFeedListContainer);
