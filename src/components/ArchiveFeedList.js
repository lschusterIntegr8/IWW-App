import React, { Component } from 'react';
import { FlatList, View, InteractionManager, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import ArchiveCard from './ArchiveCard';

const mapStateToProps = state => ({
	archive: state.archive
});

class ArchiveFeedlist extends Component {
	constructor(props) {
		super(props);
		this.renderItem = this.renderItem.bind(this);
	}
	state = {
		interactionsComplete: false
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
