import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ArticleCard from './ArticleCard';

const mapStateToProps = state => ({
	articles: state.articles
});

class NewsFeedList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<FlatList
				data={this.props.articles}
				renderItem={({ item }) => <ArticleCard key={item.articleId} article={item} />}
				keyExtractor={item => item.url}
			/>
		);
	}
}
NewsFeedList.propTypes = {
	articles: PropTypes.array
};

const NewsFeedListContainer = connect(mapStateToProps)(NewsFeedList);

export default NewsFeedListContainer;
