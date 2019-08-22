import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
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
	}

	render() {
		return (
			<View>
				<FlatList
					data={this.props.archive}
					renderItem={({ item }) => (
						<ArchiveCard
							key={item.articleId}
							article={item}
							handlePress={this.openArticle}
						/>
					)}
					keyExtractor={item => item.url}
				/>
			</View>
		);
	}
}
ArchiveFeedlist.propTypes = {
	archive: PropTypes.array,
	navigation: PropTypes.object
};

const ArchiveFeedlistContainer = connect(mapStateToProps)(ArchiveFeedlist);

export default withNavigation(ArchiveFeedlistContainer);
