import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

import InfoTile from './InfoTile';

const InfoServiceHorizontalList = props => (
	<FlatList
		data={props.subscriptionServices}
		renderItem={({ item }) => (
			<InfoTile
				key={v4()}
				tile={item}
				setActiveSubFilter={props.setActiveSubFilter}
				storeSubscriptionArticles={props.storeSubscriptionArticles}
				activeSubscriptionFilter={props.activeSubscriptionFilter}
			/>
		)}
		keyExtractor={item => v4()}
		horizontal
		contentContainerStyle={{ paddingHorizontal: 6, paddingVertical: 30 }}
	/>
);

InfoServiceHorizontalList.propTypes = {
	subscriptionServices: PropTypes.array,
	setActiveSubFilter: PropTypes.func
};

export default InfoServiceHorizontalList;
