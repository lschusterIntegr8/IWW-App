import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArticleCard from '../components/ArticleCard';
import HeaderMenu from '../components/HeaderMenu';
import { getArticleContent, getAllFavourites } from '../helpers/content';

import COLOR from '../config/colors';

const mapStateToProps = state => {
	return {
		favouriteArticles: state.rootReducer.favouriteArticles
	};
};

class Favourites extends Component {
	constructor(props) {
		super(props);
		this.openArticle = this.openArticle.bind(this);
		this.renderItem = this.renderItem.bind(this);
	}

	static navigationOptions = {
		header: null
	};

	state = {};

	componentDidMount() {
		console.log(this.props.favouriteArticles);
		if (this.props.favouriteArticles.length === 0) {
			getAllFavourites();
		}
	}

	async openArticle(article) {
		console.log('OPEN ARTICLE: ', article);
		const articleContent = getArticleContent(
			article.article_id,
			article.application_id,
			undefined
		);

		this.props.navigation.navigate('SingleArticle', {
			article: articleContent, // single article details (content / html)
			articleBasic: article // basic article info
		});
	}

	renderItem({ item }) {
		return <ArticleCard key={item.article_id} article={item} handlePress={this.openArticle} />;
	}

	render() {
		return (
			<View style={styles.mainContent}>
				{/* <HeaderMenu /> */}
				<HeaderMenu />
				<FlatList
					data={this.props.favouriteArticles}
					renderItem={this.renderItem}
					keyExtractor={item => (item.article_id ? item.article_id.toString() : '')}
					initialNumToRender={10}
					ListHeaderComponent={() => (
						<View style={styles.inhalteHeaderWrapper}>
							<Text style={styles.inhalteHeading}>Favoriten</Text>
						</View>
					)}
				/>
			</View>
		);
	}
}

Favourites.propTypes = {
	navigation: PropTypes.object
};

const styles = StyleSheet.create({
	mainContent: {
		flex: 1
	},
	inhalteHeaderWrapper: {
		paddingHorizontal: 16,
		paddingVertical: 30,
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
	}
});

export default connect(mapStateToProps)(Favourites);
