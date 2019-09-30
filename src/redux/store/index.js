// src/js/store/index.js
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../reducers/index';

const migrations = {
	0: state => {
		return {
			...state,
			aboArticles: {}
		};
	},
	1: state => {
		return {
			...state,
			aboArticles: []
		};
	},
	2: state => {
		return {
			...state,
			aboArticles: [],
			activeSubscriptionFilter: undefined
		};
	},
	6: state => {
		return {
			...state,
			aboArticles: [],
			activeSubscriptionFilter: undefined,
			archiveIssues: [],
			archiveArticles: []
		};
	}
};

const persistConfig = {
	// Root
	key: 'root',
	// Storage Method (React Native)
	storage: AsyncStorage,
	migrate: createMigrate(migrations, { debug: true }),
	version: 6
	// stateReconciler: autoMergeLevel2

	// Whitelist (Save Specific Reducers)
	// whitelist: ['authReducer'],
	// Blacklist (Don't Save Specific Reducers)
	// blacklist: ['counterReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);

export { store, persistor };
