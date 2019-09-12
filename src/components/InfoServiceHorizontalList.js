import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InfoTile from './InfoTile';

const mapStateToProps = state => ({
	subscriptionServices: state.subscriptionServices
});

class InfoServiceHorizontalList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<FlatList
				data={this.props.subscriptionServices}
				renderItem={({ item }) => <InfoTile key={item.id} tile={item} />}
				keyExtractor={item => item.id}
				horizontal
				contentContainerStyle={{ paddingHorizontal: 6, paddingVertical: 30 }}
			/>
		);
	}
}
InfoServiceHorizontalList.propTypes = {
	subscriptionServices: PropTypes.array
};

const InfoServiceHorizontalListContainer = connect(mapStateToProps)(InfoServiceHorizontalList);

export default InfoServiceHorizontalListContainer;
