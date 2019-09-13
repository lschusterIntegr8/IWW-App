import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import InfoTile from './InfoTile';

const InfoServiceHorizontalList = props => (
	<FlatList
		data={props.subscriptionServices}
		renderItem={({ item }) => (
			<InfoTile key={item.id} tile={item} setActiveSubFilter={props.setActiveSubFilter} />
		)}
		keyExtractor={item => item.id}
		horizontal
		contentContainerStyle={{ paddingHorizontal: 6, paddingVertical: 30 }}
	/>
);

InfoServiceHorizontalList.propTypes = {
	subscriptionServices: PropTypes.array,
	setActiveSubFilter: PropTypes.func
};

export default InfoServiceHorizontalList;
