import axios from 'axios';

import { fetchTokens } from './storage';

const BASE_ENDPOINT = 'https://www.vogel.de/api/iww';

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

				// resolve(response.data);
				return resolve({ success: true, accessToken, refreshToken });
			})
			.catch(err => {
				console.log(err);
				return reject(false);
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
				return reject(false);
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
				return resolve(response.data._embedded.subscriptions);
				// const { access_token: accessToken, refresh_token: refreshToken } = response.data;
				// console.log('ACCESS TOKEN:');
				// console.log(accessToken);
				// console.log('done login');

				// return resolve({ success: true, accessToken, refreshToken });
			})
			.catch(err => {
				console.log(err);
				return reject(false);
			});
	});
};

(async () => {
	console.log('Running async axios interceptor ...');
	await setAxiosAuthInterceptor();
})();
