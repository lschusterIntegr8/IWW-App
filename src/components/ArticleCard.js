import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ImageBackground,
	TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import COLOR from '../config/colors';

const ArticleCard = props => (
	<View style={styles.cardContainer}>
		<TouchableHighlight
			style={styles.clickableArea}
			onPress={() => {
				alert('test');
				/* props.navigation.navigate('ArticleDetail', {article: article}) */
				// props.navigation.navigate('ForgottenPassword');
			}}
		>
			<ImageBackground source={props.article.thumbnail} style={styles.articleImage}>
				<View style={styles.cardBodyWrapper}>
					<View style={styles.authorCorner}>
						<Text style={styles.authorText}>{props.article.author}</Text>
					</View>
					<Text style={styles.dateText}>{props.article.published_on}</Text>
					<Text style={styles.titleText}>{props.article.title}</Text>
					<Text style={styles.categoryText}>#{props.article.category}</Text>
				</View>
			</ImageBackground>
		</TouchableHighlight>
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
	authorCorner: {
		display: 'flex',
		justifyContent: 'center',
		width: 50,
		height: 50,
		position: 'absolute',
		top: 0,
		left: 0,
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
