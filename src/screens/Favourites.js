import React, { Component } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import PropTypes from 'prop-types';

import COLOR from '../config/colors';

class Favourites extends Component {
	constructor(props) {
		super(props);
	}

	state = {};

	componentDidMount() {}

	async openArticle(article) {
		console.log('OPEN ARTICLE: ', article);
		const articleContent = getArticleContent(article.article_id, article.application_id);

		this.props.navigation.navigate('SingleArticle', {
			article: articleContent, // single article details (content / html)
			articleBasic: article // basic article info
		});
	}

	render() {
		return (
			<View style={styles.mainContent}>
				<Text>Favoriten</Text>
			</View>
		);
	}
}

Favourites.propTypes = {
	navigation: PropTypes.object
};

const styles = {
	mainContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 16
	},

	resultCardWrapper: {
		borderBottomColor: COLOR.GREY_SEARCH_BORDER,
		borderBottomWidth: 1,
		paddingVertical: 3,
		marginVertical: 6
	},
	resultText: {
		fontSize: 16
	}
};

export default Favourites;
