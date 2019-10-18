import axios from 'axios';

import { fetchTokens, storeTokens } from './storage';

const BASE_ENDPOINT = 'https://www.vogel.de/api/iww';

/*
 * Configures axios headers
 */
export const setAxiosAuthInterceptor = async () => {
	/* Request interceptor --> Appends token to the Authorization header */
	axios.interceptors.request.use(
		async config => {
			const tokens = await fetchTokens();
			if (tokens && tokens.accessToken) {
				console.info('Setting header token: ', tokens.accessToken);
				config.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
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

	/* Response interceptor --> Refreshes token if error response === 401 (unauthorized) */
	axios.interceptors.response.use(null, async error => {
		console.warn('[Interceptor]: Response interceptor error');
		try {
			if (error.config && error.response && error.response.status === 401) {
				console.warn('Axios response interceptor: detected 401 --> refreshing token');
				const storedTokens = await fetchTokens();
				console.log('Previously stored tokens: ', storedTokens);

				if (storedTokens && storedTokens.refreshToken) {
					const refreshedTokens = await refreshToken(storedTokens.refreshToken);
					console.log('[Interceptor]: refreshed token: ', refreshedTokens);
					await storeTokens(refreshedTokens);
					error.config.headers['Authorization'] = `Bearer ${storedTokens.accessToken}`;
				} else {
					console.log('Axios interceptor did not find any tokens ...');
				}

				/* TODO: refresh token */
				/* TODO: Store new token */

				return axios.request(error.config);
			}
		} catch (err) {
			console.warn(err);
		}

		return Promise.reject(error);
	});
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
				console.log(err.response);
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
				console.warn(err.response);
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
				console.warn(err);
				console.warn(err.response);
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
				console.log(err.response);
				return reject({ success: false });
			});
	});
};

/* Returns HTML content of the specified article */
export const singleArticleContent = (articleId, audioVersion = undefined) => {
	const params = {};
	if (audioVersion) params.audio = audioVersion;

	return new Promise((resolve, reject) => {
		axios
			.get(`${BASE_ENDPOINT}/contents/${articleId}`, { params })
			.then(response => {
				return resolve({ success: true, data: response.data._embedded });
			})
			.catch(err => {
				console.log(err.response);
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
				return resolve({ success: true, data: response.data._embedded.issues });
			})
			.catch(err => {
				console.log(err.response);
				return reject({ success: false });
			});
	});
};

/* Returns all archive articles for :issueId and subId */
export const getArchiveArticles = (subId, issueId, audio = undefined) => {
	const params = {};
	if (subId) params.application = subId;
	if (audio) params.audio = audio;

	return new Promise((resolve, reject) => {
		axios
			.get(`${BASE_ENDPOINT}/issues/${issueId}`, { params })
			.then(response => {
				return resolve({ success: true, data: response.data._embedded.contents });
			})
			.catch(err => {
				console.log(err.response);
				return reject({ success: false });
			});
	});
};

/* Gets favorite articles */
export const getFavourites = (subId = '') => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${BASE_ENDPOINT}/favourites?application=${subId}`)
			.then(response => {
				return resolve({ success: true, data: response.data._embedded.favourites });
			})
			.catch(err => {
				console.log(err.response);
				return reject({ success: false });
			});
	});
};

/* Gets all Categories (Rubriken) of 1 subscriptionAbo (infodienst) */
export const getCategoryIssues = subId => {
	return new Promise((resolve, reject) => {
		axios
			.get(`${BASE_ENDPOINT}/categories?application=${subId}`)
			.then(response => {
				console.log('cat issues: ', response.data._embedded.categories);
				return resolve({ success: true, data: response.data._embedded.categories });
			})
			.catch(err => {
				console.log(err.response);
				return reject({ success: false });
			});
	});
};

/* Gets all articles of 1 category */
export const getCategoryArticles = (subId, categoryId, audio = undefined) => {
	const params = {};
	if (subId) params.application = subId;
	if (audio) params.audio = audio;

	return new Promise((resolve, reject) => {
		axios
			.get(`${BASE_ENDPOINT}/categories/${categoryId}`, { params })
			.then(response => {
				console.log('cat articles: ', response.data._embedded.contents);
				return resolve({ success: true, data: response.data._embedded.contents });
			})
			.catch(err => {
				console.log(err.response);
				return reject({ success: false });
			});
	});
};

/* Initialize axios interceptor, so that each request contains the accessToken automatically */
(async () => {
	console.log('Running async axios interceptor ...');
	await setAxiosAuthInterceptor();
})();
