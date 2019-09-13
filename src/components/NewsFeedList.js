import React, { Component } from 'react';
import { FlatList, InteractionManager, ActivityIndicator, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import ArticleCard from './ArticleCard';

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
		console.log('ARTICLES MOUNT:');
		console.log(this.props.articles);
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
		return <ArticleCard key={item.article_id} article={item} handlePress={this.openArticle} />;
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
				keyExtractor={item => item.article_id}
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

export default withNavigation(NewsFeedList);
