console.disableYellowBox = true;

import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { v4 } from 'uuid';

import AppContainer from './router';
import { store, persistor } from './redux/store/index';
import * as storageHelper from './helpers/storage';
console.log('STORE');
console.log(store);

const resetAppStorage = async () => {
	console.info('Reseting app storage');
	// await storageHelper.resetCredentials();
	await persistor.purge();
	await persistor.flush();
};
(async () => {
	await resetAppStorage();
})();

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AppContainer />
			</PersistGate>
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
