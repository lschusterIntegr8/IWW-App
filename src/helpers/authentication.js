/* eslint-disable no-console */
import { store, persistor } from '../redux/store/index';
import { NavigationActions } from 'react-navigation';

import * as API from './api';
import * as storageHelper from './storage';
import { getActiveTokens, setActiveTokens } from './tokens';
import { fetchAndSetArticles, fetchAndSetSubscriptions, initAppContent } from './content';
import { setSubscriptions, setArticles } from '../redux/actions/index';

// store.subscribe(() => {
// 	console.log('...STORE SUBSCRIBER RAN...');
// 	storageHelper.storeTokens({
// 		accessToken: store.getState().accessToken,
// 		refreshToken: store.getState().refreshToken
// 	});
// });

export const sendPasswordResetEmail = async () => {
	return new Promise((resolve, reject) => {
		console.log('started password reset.');
		setTimeout(() => {
			console.log('done password reset.');
			return resolve('yes');
		}, 4000);
	});
};

export const resetStore = async () => {
	// store.dispatch()
};

export const initAppStart = async props => {
	console.info('getactive tokens (initappstart)');

	try {
		// await API.setAxiosAuthInterceptor();
		/* 1. Check if access token already exists in asyncStorage from previous log-ins */
		const fetchedTokens = await getActiveTokens();

		if (fetchedTokens.navigation) {
			console.log('Navigating to: ', fetchedTokens.navigation);

			const navigateAction = NavigationActions.navigate({
				routeName: fetchedTokens.navigation,
				params: {},

				action: NavigationActions.navigate({ routeName: fetchedTokens.navigation })
			});

			return props.navigation.dispatch(navigateAction);
		}

		await setActiveTokens(fetchedTokens);

		// const fetchedArticles = await fetchAndSetArticles();
		// const fetchedSubscriptions = await fetchAndSetSubscriptions();
		console.log('Initing app content ...');
		await initAppContent(false, props);
		return props.navigation.navigate('App');
	} catch (err) {
		console.error('App init error ...');
		console.error(err);
		return props.navigation.navigate('Authentication');
	}
};

export const authenticateLogin = async (email, password, props) => {
	const authResponse = await API.userLogin(email, password).catch(err => {
		console.log(err);
		return err;
	});

	/* If auth === success, store tokens to redux + storage */

	return authResponse;
};
