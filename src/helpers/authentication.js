/* eslint-disable no-console */
import store from '../redux/store/index';

import * as API from './api';
import * as storageHelper from './storage';
import { setSubscriptions, setArticles } from '../redux/actions/index';

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
		const { data: subs } = await API.getSubscriptions().catch(async responseContent => {
			/* 3. If token is expired --> refresh the token */
			if (!responseContent || !responseContent.success) {
				// console.log('NO RESPONSE CONTENT ---> SHOULD REFRESH');
				const refreshedTokens = await API.refreshToken(data.refreshToken).catch(
					validRefreshToken => {
						if (!validRefreshToken || !validRefreshToken.success) {
							props.navigation.navigate('Authentication');
							return true;
						}
					}
				);
				// console.log('Refreshed tokens');
				// console.log(refreshedTokens);
				await storageHelper.storeTokens(refreshedTokens);
				await API.setAxiosAuthInterceptor();
				/* Recurse this function after new tokens are set */
				return initAppStart(props);
			}
		});

		const { data: articles } = await API.getSubscriptionArticles(
			undefined,
			2,
			undefined,
			undefined
		).catch(async responseContent => {
			console.log(responseContent);
		});
		// console.log('articles:');
		// console.log(articles);

		/* Store subscriptions */
		store.dispatch(setSubscriptions(subs));
		store.dispatch(setArticles(articles));
		props.navigation.navigate('App');
	} else {
		console.log('SOMETHING UNEXPLAINED HAPPENED');
	}
};

export const authenticateLogin = async (email, password) => {
	const authResponse = await API.userLogin(email, password);
	return authResponse;
	// if (email === 't@t.de' && password === 'test') return resolve(true);
	// else return reject(false);
};
