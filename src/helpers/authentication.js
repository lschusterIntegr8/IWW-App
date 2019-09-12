/* eslint-disable no-console */
import store from '../redux/store/index';

import * as API from './api';
import * as storageHelper from './storage';
import { setSubscriptions } from '../redux/actions/index';

export const sendPasswordResetEmail = async () => {
	return new Promise((resolve, reject) => {
		console.log('started password reset.');
		setTimeout(() => {
			console.log('done password reset.');
			return resolve('yes');
		}, 4000);
	});
};

export const initAppStart = async props => {
	const data = await storageHelper.fetchTokens().catch(err => {
		console.log(err);
		props.navigation.navigate('Authentication');
	});

	if (!data || (Object.entries(data).length === 0 && data.constructor === Object)) {
		props.navigation.navigate('Authentication');
	} else if (data.accessToken && data.refreshToken) {
		/* 2. Try to fetch screens data from API */
		const subs = await API.getSubscriptions().catch(async responseContent => {
			/* 3. If token is expired --> refresh the token */
			if (!responseContent) {
				console.log('NO RESPONSE CONTENT ---> SHOULD REFRESH');
				const refreshedTokens = await API.refreshToken(data.refreshToken).catch(
					validRefreshToken => {
						if (!validRefreshToken) {
							props.navigation.navigate('Authentication');
							return true;
						}
					}
				);
				console.log('Refreshed tokens');
				console.log(refreshedTokens);
				await storageHelper.storeTokens(refreshedTokens);
				await API.setAxiosAuthInterceptor();
				/* Recurse this function after new tokens are set */
				return initAppStart(props);
			}
		});

		console.log(subs);

		/* Store subscriptions */
		console.log('I should store subs here ...');
		console.log(store);
		store.dispatch(setSubscriptions(subs));
		console.log('STORE: ');
		console.log(store.getState());
		props.navigation.navigate('App');
	} else {
		console.log('SOMETHING UNEXPLAINED HAPPENED');
	}
};

export const authenticateLogin = async (email, password) => {
	console.log('started login.');
	const authResponse = await API.userLogin(email, password);
	console.log('Returning...');
	return authResponse;
	// if (email === 't@t.de' && password === 'test') return resolve(true);
	// else return reject(false);
};
