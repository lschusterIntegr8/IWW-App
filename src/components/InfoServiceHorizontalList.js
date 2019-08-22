import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InfoTile from './InfoTile';

const mapStateToProps = state => ({
	aboInfoServices: state.aboInfoServices
});

class InfoServiceHorizontalList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<FlatList
				data={this.props.aboInfoServices}
				renderItem={({ item }) => <InfoTile key={item.articleId} tile={item} />}
				keyExtractor={item => item.url}
				horizontal
				contentContainerStyle={{ paddingHorizontal: 6, paddingVertical: 30 }}
			/>
		);
	}
}
InfoServiceHorizontalList.propTypes = {
	aboInfoServices: PropTypes.array
};

const InfoServiceHorizontalListContainer = connect(mapStateToProps)(InfoServiceHorizontalList);

export default InfoServiceHorizontalListContainer;
