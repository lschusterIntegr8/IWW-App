import React, { Component } from 'react';
import { FlatList, InteractionManager, ActivityIndicator, View, StyleSheet } from 'react-native';
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
		this.renderItem = this.renderItem.bind(this);
	}

	state = {
		interactionsComplete: false
	};

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			// alert('Complete');
			this.setState({ interactionsComplete: true });
		});
	}

	openArticle(article) {
		console.log('RECEIVED ARTICLE: ', article);
		this.props.navigation.navigate('SingleArticle', { article: article });
	}

	renderItem({ item }) {
		return <ArticleCard key={item.articleId} article={item} handlePress={this.openArticle} />;
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
			<FlatList
				data={this.props.articles}
				renderItem={this.renderItem}
				keyExtractor={item => item.articleId}
				initialNumToRender={3}
				windowSize={3}
				maxToRenderPerBatch={1}
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

const NewsFeedListContainer = connect(mapStateToProps)(NewsFeedList);

export default withNavigation(NewsFeedListContainer);
