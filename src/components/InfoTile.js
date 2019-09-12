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
			<View
				style={[styles.articleImage, { backgroundColor: props.tile.color.split(';')[0] }]}
				resizeMode="cover"
			>
				<View style={styles.cardBodyWrapper}>
					<Text style={styles.subName}>{props.tile.title}</Text>
				</View>
			</View>
		</TouchableHighlight>
	</View>
);

InfoTile.propTypes = {
	navigation: PropTypes.object,
	tile: PropTypes.object
};

const styles = StyleSheet.create({
	cardContainer: {
		minHeight: 80,
		width: 160,
		alignSelf: 'center',
		marginHorizontal: 8,
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
		padding: 8,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},

	subName: {
		color: COLOR.WHITE,
		textAlign: 'center',
		fontSize: 13,
		fontWeight: 'bold'
	}
});

export default withNavigation(InfoTile);
