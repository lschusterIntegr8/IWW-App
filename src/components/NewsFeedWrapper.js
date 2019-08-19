import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';

import ArticleCard from './ArticleCard';

import COLOR from '../config/colors';

class NewsFeedWrapper extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<View style={styles.inhalteHeaderWrapper}>
					<Text style={styles.inhalteHeading}>Meine Inhalte</Text>
					<View style={styles.filterBar}>
						{/* <Text>Filter</Text>
						<Text>Filter2</Text> */}
						<Button
							buttonStyle={styles.filterButton}
							titleStyle={styles.filterButtonTitle}
							title="Archiv"
						/>
						<Button
							buttonStyle={styles.filterButton}
							titleStyle={styles.filterButtonTitle}
							title="Rubriken"
						/>

						{/* <TouchableOpacity style={styles.filterButton}>
							<Text>Archive</Text>
						</TouchableOpacity> */}
					</View>
				</View>
				<FlatList
					data={this.props.articles}
					renderItem={({ item }) => <ArticleCard key={item.articleId} article={item} />}
					keyExtractor={item => item.url}
				/>
			</View>
		);
	}
}

NewsFeedWrapper.propTypes = {
	navigation: PropTypes.object
};

const styles = StyleSheet.create({
	inhalteHeaderWrapper: {
		paddingHorizontal: 16,
		marginBottom: 30,
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
	},
	filterBar: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		flex: 1
	},
	filterButton: {
		backgroundColor: COLOR.LIGHT_GREY_FILTER,
		height: 24,
		borderRadius: 50,
		padding: 0,
		marginLeft: 12
	},
	filterButtonTitle: {
		fontSize: 14,
		fontWeight: 'bold',
		color: 'rgba(0, 0, 0, 1)',
		padding: 14
	}
});

export default NewsFeedWrapper;
