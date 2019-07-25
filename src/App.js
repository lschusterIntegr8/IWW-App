/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AppContainer from './router';

// import {
// 	Header,
// 	LearnMoreLinks,
// 	Colors,
// 	DebugInstructions,
// 	ReloadInstructions
// } from 'react-native/Libraries/NewAppScreen';

const App = () => {
	return <AppContainer />;
};

const styles = StyleSheet.create({
	defaultCenterView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	fonty: {
		fontSize: 40,
		color: 'red'
	}
});

// export default App;

export default App;
