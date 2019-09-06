import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import COLOR from '../config/colors';

const ArchiveCard = props => (
	<View style={styles.cardContainer}>
		<TouchableOpacity style={styles.downloadCorner} elevation={3}>
			<Image
				source={require('../assets/images/download-icon.png')}
				style={{ width: '100%' }}
				elevation={3}
				resizeMode="contain"
			/>
		</TouchableOpacity>

		<TouchableOpacity
			style={styles.clickableArea}
			onPress={() => {
				/* TODO: Press handler passed via props
				 * props.handlePress(props.article);
				 */
				alert('TODO');
			}}
		>
			<View style={styles.cardBodyWrapper}>
				<View style={styles.authorCorner}>
					<Text style={styles.authorText}>{props.article.author}</Text>
				</View>

				<Text style={styles.dateText}>{props.article.published_on}</Text>
				<Text style={styles.titleText}>{props.article.title}</Text>
				<Text style={styles.categoryText}>#{props.article.category}</Text>
			</View>
		</TouchableOpacity>
	</View>
);

ArchiveCard.propTypes = {
	navigation: PropTypes.object,
	article: PropTypes.object,
	handlePress: PropTypes.func
};

const styles = StyleSheet.create({
	cardContainer: {
		minHeight: 170,
		marginBottom: 30,
		maxWidth: 600,
		width: '100%',
		paddingHorizontal: 16,
		alignSelf: 'center'
	},
	clickableArea: {
		flex: 1,
		alignSelf: 'stretch',
		backgroundColor: '#ffffff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.45,
		shadowRadius: 3,
		elevation: 3,
		borderWidth: 0.5,
		borderColor: COLOR.GREY
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
		flex: 1,
		justifyContent: 'center',
		width: 50,
		height: 50,
		position: 'relative',
		top: -16,
		left: -16,
		backgroundColor: COLOR.RED
	},
	downloadCorner: {
		flex: 1,
		zIndex: 3,
		width: 30,
		height: 30,
		marginHorizontal: 16,
		position: 'absolute',
		top: 0,
		right: 16,
		elevation: 3
	},
	authorText: {
		color: COLOR.WHITE,
		alignSelf: 'center',
		fontSize: 10,
		fontWeight: 'bold'
	},
	dateText: {
		color: COLOR.BLACK,
		fontSize: 10
	},
	titleText: {
		color: COLOR.BLACK,
		fontSize: 18,
		fontWeight: 'bold'
	},
	categoryText: {
		color: COLOR.ALMOST_BLUE,
		fontSize: 12,
		fontWeight: 'bold'
	}
});

export default withNavigation(ArchiveCard);
