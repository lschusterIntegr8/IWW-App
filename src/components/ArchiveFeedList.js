import React, { Component } from 'react';
import {
	FlatList,
	View,
	InteractionManager,
	ActivityIndicator,
	StyleSheet,
	Text
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withNavigation, ScrollView } from 'react-navigation';

import ArchiveCard from './ArchiveCard';
import DropdownFilter from './DropdownFilter';

const mapStateToProps = state => ({
	archive: state.archive
});

class ArchiveFeedlist extends Component {
	constructor(props) {
		super(props);
		this.renderItem = this.renderItem.bind(this);
	}
	state = {
		interactionsComplete: false,
		contents: [
			{
				title: 'Title 1',
				body: 'Hi. I love this component. What do you think?'
			}
		]
	};

	renderItem({ item }) {
		return <ArchiveCard key={item.articleId} article={item} handlePress={this.openArticle} />;
	}

	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			// alert('Complete');
			this.setState({ interactionsComplete: true });
		});
	}
	render() {
		if (!this.state.interactionsComplete) {
			return (
				<View style={styles.indicatorContainer}>
					<ActivityIndicator size="large" color="#E3001B" />
				</View>
			);
		}
		return (
			<View>
				{/* Archive category filter */}
				<DropdownFilter />
				{/* Archive flatlist (archived news cards) */}
				<FlatList
					data={this.props.archive}
					renderItem={this.renderItem}
					keyExtractor={item => item.url}
					initialNumToRender={3}
					windowSize={3}
					maxToRenderPerBatch={1}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	indicatorContainer: {
		marginTop: 40
	}
});

ArchiveFeedlist.propTypes = {
	archive: PropTypes.array,
	navigation: PropTypes.object
};

const ArchiveFeedlistContainer = connect(mapStateToProps)(ArchiveFeedlist);

export default withNavigation(ArchiveFeedlistContainer);
