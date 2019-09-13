import axios from 'axios';

import { fetchTokens } from './storage';

const BASE_ENDPOINT = 'https://www.vogel.de/api/iww';

/*
 * Configures axios headers
 */
export const setAxiosAuthInterceptor = async () => {
	axios.interceptors.request.use(
		async config => {
			const token = await fetchTokens();
			if (token) {
				config.headers['Authorization'] = 'Bearer ' + token.accessToken;
			}
			config.headers['Content-Type'] = 'application/json';

			return config;
		},
		error => {
			Promise.reject(error);
		}
	);
};

export const refreshToken = refreshToken => {
	console.log('CALLED REFRESH TOKEN');
	return new Promise((resolve, reject) => {
		axios
			.post(`${BASE_ENDPOINT}/oauth`, {
				grant_type: 'refresh_token',
				client_id: 'IWW',
				refresh_token: refreshToken
			})
			.then(response => {
				const { access_token: accessToken, refresh_token: refreshToken } = response.data;
				console.log('ACCESS TOKEN after REFRESH:');
				console.log(accessToken);
				console.log('done login');

				return resolve({ success: true, accessToken, refreshToken });
			})
			.catch(err => {
				console.log(err);
				return reject({ success: false });
			});
	});
};

export const userLogin = (email, password) => {
	return new Promise((resolve, reject) => {
		axios
			.post(`${BASE_ENDPOINT}/oauth`, {
				grant_type: 'password',
				client_id: 'IWW',
				username: email,
				password: password
			})
			.then(response => {
				const { access_token: accessToken, refresh_token: refreshToken } = response.data;
				console.log('ACCESS TOKEN:');
				console.log(accessToken);
				console.log('done login');

				return resolve({ success: true, accessToken, refreshToken });
			})
			.catch(err => {
				return reject({ success: false });
			});
	});
};

export const getSubscriptions = () => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${BASE_ENDPOINT}/subscriptions`)
			.then(response => {
				console.log('SUBSCRIPTIONS RESPONSE:');
				console.log(response.data._embedded.subscriptions);
				return resolve({ success: true, data: response.data._embedded.subscriptions });
			})
			.catch(err => {
				console.log(err);
				return reject({ success: false });
			});
	});
};

export const getSubscriptionArticles = (subId, limit, skip, searchtext) => {
	const params = {};
	if (subId) params.application = subId;
	if (limit) params.limit = limit;
	if (skip) params.skip = skip;
	if (searchtext) params.searchtext = searchtext;

	return new Promise((resolve, reject) => {
		axios
			.get(`${BASE_ENDPOINT}/contents`, {
				params
			})
			.then(response => {
				console.log('SubArticles RESPONSE:');
				console.log(response.data._embedded.contents);
				return resolve({ success: true, data: response.data._embedded.contents });
			})
			.catch(err => {
				console.log(err);
				return reject({ success: false });
			});
	});
};

(async () => {
	console.log('Running async axios interceptor ...');
	await setAxiosAuthInterceptor();
})();
