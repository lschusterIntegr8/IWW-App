import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import COLOR from '../config/colors';

const InfoTile = props => (
	<View style={styles.cardContainer}>
		<TouchableHighlight
			style={styles.clickableArea}
			onPress={() => {
				alert('test');
				/* props.navigation.navigate('ArticleDetail', {article: article}) */
				// props.navigation.navigate('ForgottenPassword');
			}}
		>
			<ImageBackground
				source={props.tile.thumbnail}
				style={styles.articleImage}
				resizeMode="cover"
			>
				<View style={styles.cardBodyWrapper}>
					<Text style={styles.authorText}>{props.tile.title}</Text>
				</View>
			</ImageBackground>
		</TouchableHighlight>
	</View>
);

InfoTile.propTypes = {
	navigation: PropTypes.object,
	tile: PropTypes.object
};

const styles = StyleSheet.create({
	cardContainer: {
		height: 80,
		maxHeight: 80,
		width: 150,
		alignSelf: 'center',
		marginHorizontal: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.45,
		shadowRadius: 3,
		elevation: 3,
		marginVertical: 0
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
		alignItems: 'center',
		justifyContent: 'center'
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
		fontSize: 20,
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

export default withNavigation(InfoTile);
