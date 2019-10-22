import React, { Component } from 'react';
import { View, Text, ScrollView, RefreshControl, SafeAreaView } from 'react-native';

import NewsFeedWrapper from '../components/NewsFeed.container';
import FavouritesWrapper from '../components/FavouritesWrapper';

const NewsFeedSelector = ({ options, setNewsFeedFilter, refreshing, animateLoading }) => {
	let sel;
	console.log('Screen options: ', options);
	if (options.screenRoute === 'home') {
		sel = (
			<NewsFeedWrapper
				setNewsFeedFilter={setNewsFeedFilter}
				animateLoading={animateLoading}
			/>
		);
	} else if (options.screenRoute === 'downloads') {
		sel = (
			<View>
				<Text>Test downloads</Text>
			</View>
		);
	} else if (options.screenRoute === 'favourites') {
		sel = <FavouritesWrapper />;
	} else {
		sel = (
			<View>
				<Text>FAIL</Text>
			</View>
		);
	}

	return sel;
};

export default NewsFeedSelector;
