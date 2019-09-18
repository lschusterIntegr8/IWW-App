// src/js/store/index.js
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from '../reducers/index';

const persistConfig = {
	// Root
	key: 'root',
	// Storage Method (React Native)
	storage: AsyncStorage
	// Whitelist (Save Specific Reducers)
	// whitelist: ['authReducer'],
	// Blacklist (Don't Save Specific Reducers)
	// blacklist: ['counterReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);

export { store, persistor };
