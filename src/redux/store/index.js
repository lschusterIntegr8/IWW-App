// src/js/store/index.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer, createMigrate, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../reducers/index';
import sessionReducer from '../reducers/session';

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
	12: state => {
		return {
			rootReducer: {
				...state.rootReducer,
				audioPlayerModal: []
			}
		};
	}
};

const persistConfig = {
	// Root
	key: 'root',
	// Storage Method (React Native)
	storage: AsyncStorage,
	// migrate: createMigrate(migrations, { debug: true }),
	// version: 12,
	blacklist: ['sessionReducer']
	// stateReconciler: autoMergeLevel2

	// Whitelist (Save Specific Reducers)
	// whitelist: ['authReducer'],
	// Blacklist (Don't Save Specific Reducers)
};

// const persistedCombinedReducer = persistCombineReducers(persistConfig, {
// 	rootReducer,
// 	sessionReducer
// });
const combinedReducer = combineReducers({
	rootReducer,
	sessionReducer
});

const persistedCombinedReducer = persistReducer(persistConfig, combinedReducer);

// const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = createStore(persistedCombinedReducer, applyMiddleware(logger));
const persistor = persistStore(store);

export { store, persistor };
