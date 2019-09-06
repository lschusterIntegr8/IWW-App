import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import COLOR from '../config/colors';

const ArticleCard = props => (
	<View style={styles.cardContainer}>
		<TouchableHighlight
			style={styles.clickableArea}
			onPress={() => {
				/* Press handler passed via props */
				props.handlePress(props.article);
			}}
		>
			<ImageBackground source={props.article.thumbnail} style={styles.articleImage}>
				<View style={styles.cardBodyWrapper}>
					<View style={styles.authorCorner}>
						<Text style={styles.authorText}>{props.article.author}</Text>
					</View>
					<View style={styles.headingWrapper}>
						<Text style={styles.dateText}>{props.article.published_on}</Text>
						<Text style={styles.titleText}>{props.article.title}</Text>
						<Text style={styles.categoryText}>#{props.article.category}</Text>
					</View>
				</View>
			</ImageBackground>
		</TouchableHighlight>
	</View>
);

ArticleCard.propTypes = {
	navigation: PropTypes.object,
	article: PropTypes.object,
	handlePress: PropTypes.func
};

const styles = StyleSheet.create({
	cardContainer: {
		minHeight: 250,
		marginBottom: 30,
		maxWidth: 600,
		width: '100%',
		alignSelf: 'center'
	},
	clickableArea: {
		flex: 1,
		alignSelf: 'stretch'
	},
	articleImage: {
		flex: 1,
		height: undefined,
		width: undefined,
		alignSelf: 'stretch'
	},
	cardBodyWrapper: {
		flex: 1,
		padding: 16,
		paddingBottom: 32,
		alignItems: 'flex-start',
		justifyContent: 'flex-start'
	},
	headingWrapper: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	authorCorner: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
		width: 50,
		maxHeight: 50,
		position: 'relative',
		top: -16,
		left: -16,
		backgroundColor: COLOR.RED
	},
	authorText: {
		color: COLOR.WHITE,
		alignSelf: 'center',
		fontSize: 10,
		fontWeight: 'bold'
	},
	dateText: {
		color: COLOR.WHITE,
		fontSize: 10
	},
	titleText: {
		color: COLOR.WHITE,
		fontSize: 18,
		fontWeight: 'bold'
	},
	categoryText: {
		color: COLOR.RED,
		fontSize: 12,
		fontWeight: 'bold'
	}
});

export default withNavigation(ArticleCard);
