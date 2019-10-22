import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import COLOR from '../config/colors';
import { setHomeScreenRefreshing } from '../redux/actions/index';
import config from '../config/main';

const mapDispatchToProps = dispatch => {
	return {
		setHomeScreenRefreshing: flag => dispatch(setHomeScreenRefreshing(flag))
	};
};

const InfoTile = props => (
	<View
		style={[
			styles.cardContainer,
			{
				opacity:
					props.activeSubscriptionFilter &&
					props.activeSubscriptionFilter.id === props.tile.id &&
					props.activeSubscriptionFilter.audio === props.tile.audio
						? 1
						: !props.activeSubscriptionFilter
						? 1
						: 0.45
			}
		]}
	>
		<TouchableHighlight
			style={styles.clickableArea}
			onPress={async () => {
				/* Set active subscription filter */

				/* props.navigation.navigate('ArticleDetail', {article: article}) */
				// props.navigation.navigate('ForgottenPassword');

				/* Set active filter to store */
				try {
					// console.log('CALLED');
					// props.setHomeScreenRefreshing(true);
					/* Apply current Infodienst filter to the store filter variable */
					props.setActiveSubFilter({ id: props.tile.id, audio: props.tile.audio });
					/* Fetch Articles */
					await props.storeSubscriptionArticles(
						props.tile.id,
						config.NUM_OF_ARTICLES_PER_FETCH,
						undefined,
						undefined,
						props.tile.audio
					);

					// props.setHomeScreenRefreshing(false);
				} catch (err) {
					console.log('ERROR');
					console.log(err);
				}
			}}
		>
			<View
				style={[styles.articleImage, { backgroundColor: props.tile.color.split(';')[0] }]}
				resizeMode="cover"
			>
				<View style={styles.cardBodyWrapper}>
					<Text style={styles.subName}>{props.tile.title}</Text>
					{props.tile.audio ? <Text style={styles.subName}>(audio)</Text> : null}
				</View>
			</View>
		</TouchableHighlight>
	</View>
);

InfoTile.propTypes = {
	navigation: PropTypes.object,
	tile: PropTypes.object,
	setActiveSubFilter: PropTypes.func,
	storeSubscriptionArticles: PropTypes.func
};

const styles = StyleSheet.create({
	cardContainer: {
		minHeight: 80,
		width: 160,
		alignSelf: 'center',
		marginHorizontal: 8,
		elevation: 3,
		marginVertical: 0,
		opacity: 1
	},
	clickableArea: {
		flex: 1,
		alignSelf: 'stretch'
	},
	articleImage: {
		flex: 1,
		height: undefined,
		width: undefined,
		alignSelf: 'stretch',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.45,
		shadowRadius: 3
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

const InfoTileContainer = connect(
	null,
	mapDispatchToProps
)(InfoTile);

export default withNavigation(InfoTileContainer);
