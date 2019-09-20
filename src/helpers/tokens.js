import * as storageHelper from './storage';
import * as API from './api';
import dayjs from 'dayjs';

const TOKEN_TIMEOUT = 30000;

export const setActiveTokens = async tokens => {
	console.log('SET ACTIVE TOKEN: ', tokens);
	try {
		await storageHelper.storeTokens(tokens);
	} catch (err) {
		console.error('setActivetokens error');
		return err;
	}
};

/* Returns tokens from SecureStorage OR fetches and returns new tokens */
export const getActiveTokens = async () => {
	console.log('Getactivetokens called');
	const storageTokens = await storageHelper.fetchTokens();

	/* If there tokens are missing or outdated */
	if (
		!storageTokens ||
		(Object.entries(storageTokens).length === 0 && storageTokens.constructor === Object)
	) {
		return { navigation: 'Authentication' };
	}

	const tokenAge = Math.abs(dayjs().diff(dayjs(storageTokens.timestamp)));
	let isTokenOutdated = false;

	if (tokenAge > TOKEN_TIMEOUT) {
		console.warn('FOUND OUTDATED TOKEN: ', storageTokens);
		isTokenOutdated = true;
	} else {
		isTokenOutdated = false;
	}

	if (isTokenOutdated === true && storageTokens.refreshToken) {
		/* Refresh tokens */
		console.log('Getactivetoken - refreshToken()');
		const refreshedTokens = await API.refreshToken(storageTokens.refreshToken).catch(err => {
			console.warn('could not refresh tokens (tokens.js) --> login screen');
			console.warn(err);
			return { navigation: 'Authentication' };
		});

		/* Store them to AsyncStorage and refresh the interceptor */
		isTokenOutdated = false;
		return refreshedTokens;
	}

	isTokenOutdated = false;
	return storageTokens;
};
