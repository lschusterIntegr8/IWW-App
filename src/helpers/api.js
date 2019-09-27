import axios from 'axios';

import { fetchTokens } from './storage';

const BASE_ENDPOINT = 'https://www.vogel.de/api/iww';

/*
 * Configures axios headers
 * TODO: check token age, try to refresh/ask user to log-in
 */
export const setAxiosAuthInterceptor = async () => {
	axios.interceptors.request.use(
		async config => {
			const tokens = await fetchTokens();
			if (tokens) {
				config.headers['Authorization'] = 'Bearer ' + tokens.accessToken;
			} else {
				console.log('Axios interceptor did not find any tokens ...');
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
	console.info('CALLED REFRESH TOKEN: ', refreshToken);
	return new Promise((resolve, reject) => {
		axios
			.post(`${BASE_ENDPOINT}/oauth`, {
				grant_type: 'refresh_token',
				client_id: 'IWW',
				refresh_token: refreshToken
			})
			.then(response => {
				const { access_token: accessToken, refresh_token: refreshToken } = response.data;
				console.log('ACCESS TOKEN after REFRESH: ', accessToken);
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
				console.log('ACCESS TOKEN: ', accessToken);
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
				return resolve({ success: true, data: response.data._embedded.subscriptions });
			})
			.catch(err => {
				console.log(err);
				return reject({ success: false });
			});
	});
};

/* Returns general articles OR articles of a specific infoDienst, when subId is specified */
export const getSubscriptionArticles = (subId, limit, skip, searchtext, audio) => {
	const params = {};
	if (subId) params.application = subId;
	if (limit) params.limit = limit;
	if (skip) params.skip = skip;
	if (searchtext) params.searchtext = searchtext;
	if (audio) params.audio = audio;
	console.info(`Articles called with:
	subid: ${subId},
	limit: ${limit},
	skip: ${skip},
	searchtext: ${searchtext},
	audio: ${audio}
	`);

	return new Promise((resolve, reject) => {
		axios
			.get(`${BASE_ENDPOINT}/contents`, {
				params
			})
			.then(response => {
				console.log('Articles RESPONSE:');
				console.log(response.data._embedded.contents);
				return resolve({ success: true, data: response.data._embedded.contents });
			})
			.catch(err => {
				console.log(err);
				return reject({ success: false });
			});
	});
};

/* Returns HTML content of the specified article */
export const singleArticleContent = articleId => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${BASE_ENDPOINT}/contents/${articleId}`)
			.then(response => {
				return resolve({ success: true, data: response.data._embedded });
			})
			.catch(err => {
				console.log(err);
				return reject({ success: false });
			});
	});
};

/* Returns all archive issues */
export const getArchiveIssues = subId => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${BASE_ENDPOINT}/issues?application=${subId}`)
			.then(response => {
				return resolve({ success: true, data: response.data._embedded });
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
