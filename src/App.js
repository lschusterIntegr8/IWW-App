/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
console.disableYellowBox = true;

import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import AppContainer from './router';
import store from './redux/store/index';

const App = () => {
	return (
		<Provider store={store}>
			<AppContainer />
		</Provider>
	);
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
