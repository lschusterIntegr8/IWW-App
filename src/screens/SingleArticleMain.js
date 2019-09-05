import React, { Component } from 'react';
import { View, ScrollView, Text, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import HTML from 'react-native-render-html';

class SingleArticleMain extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// console.log(this.props.navigation);
	}

	render() {
		/* Get parameter that is passed via navigation */
		const { navigation } = this.props;
		const article = navigation.getParam('article', {});

		return (
			<ScrollView style={styles.singleArticleContainer}>
				<HTML
					html={article.html}
					imagesMaxWidth={Dimensions.get('window').width}
					tagsStyles={{
						h1: { marginHorizontal: 16 },
						h2: { marginHorizontal: 16 },
						h3: { marginHorizontal: 16 },
						h4: { marginHorizontal: 16 },
						h5: { marginHorizontal: 16 },
						h6: { marginHorizontal: 16 },
						p: { marginHorizontal: 16 }
					}}
				/>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	singleArticleContainer: {
		flex: 1
	},
	htmlContainer: {
		marginHorizontal: 16
	}
});

SingleArticleMain.propTypes = {
	navigation: PropTypes.object
};

export default SingleArticleMain;
