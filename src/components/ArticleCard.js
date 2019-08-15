import React, { Component } from 'react';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import {
	ScrollView,
	StyleSheet,
	Text,
	Image,
	View,
	TouchableOpacity,
	ImageBackground
} from 'react-native';

import PropTypes from 'prop-types';
import COLOR from '../config/colors';

const ArticleCard = props => (
	// <Card
	// 	image={props.article.thumbnail}
	// 	containerStyle={styles.cardContainer}
	// 	imageProps={{
	// 		resizeMode: 'cover',
	// 		padding: 0,
	// 		margin: 0,
	// 		border: null
	// 	}}
	// 	imageWrapperStyle={{ padding: 0, margin: 0 }}
	// 	imageStyle={{}}
	// 	wrapperStyle={{}}
	// >
	// 	<View key={props.article.articleId}>
	// 		<Text style={styles.name}>{props.article.title}</Text>
	// 	</View>
	// </Card>
	<View style={styles.cardContainer}>
		{/* <Image source={props.article.thumbnail} style={styles.image} resizeMode="cover" /> */}
		<TouchableOpacity style={styles.clickableArea}>
			<ImageBackground source={props.article.thumbnail} style={styles.articleImage}>
				<View style={styles.cardBodyWrapper}>
					<Text style={styles.dateText}>{props.article.published_on}</Text>
					<Text style={styles.titleText}>{props.article.title}</Text>
					<Text style={styles.categoryText}>#{props.article.category}</Text>
				</View>
			</ImageBackground>
		</TouchableOpacity>
	</View>
);

ArticleCard.propTypes = {
	navigation: PropTypes.object,
	article: PropTypes.object
};

const styles = StyleSheet.create({
	cardContainer: {
		minHeight: 250,
		marginBottom: 30,
		maxWidth: 600,
		width: '100%',
		marginHorizontal: 16,

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
		justifyContent: 'flex-end'
	},
	dateText: {
		color: '#FFFFFF',
		fontSize: 10
	},
	titleText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: 'bold'
	},
	categoryText: {
		color: COLOR.RED,
		fontSize: 12,
		fontWeight: 'bold'
	}
});

export default ArticleCard;
