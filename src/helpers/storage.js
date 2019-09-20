import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-community/async-storage';
import dayjs from 'dayjs';
/*
 *
 * Function that stores auth tokens securely using encription
 */
export const storeTokens = async authResponse => {
	console.log('STORE TOKENS: ', authResponse);
	const tmpTokens = JSON.stringify({
		accessToken: authResponse.accessToken,
		refreshToken: authResponse.refreshToken,
		timestamp: authResponse.timestamp ? authResponse.timestamp : dayjs().format()
	});

	/* Save to storage */
	try {
		console.log('Storing ', tmpTokens);
		await Keychain.setGenericPassword('tokens', tmpTokens);
	} catch (err) {
		console.warn('----------ERROR STORING TOKENS----------');
		console.error(err);
		alert('ERROR STORING TOKENS ...');
	}
};

/*
 *
 * Function that fetches auth tokens from the secure storage
 */
export const fetchTokens = async () => {
	try {
		let { password: tokens } = await Keychain.getGenericPassword();

		if (!tokens) {
			console.log('FETCH TOKEN DID NOT FIND STORED TOKENS');
			console.log(tokens);
			return undefined;
		}

		tokens = JSON.parse(tokens);

		if (!tokens.accessToken || !tokens.refreshToken) {
			console.log('Missing access+refresh token');
			console.log(tokens);
			return undefined;
		}

		console.info('Found tokens in secure storage:\n', tokens);
		return tokens;
	} catch (err) {
		console.log(err);
		alert('Error fetching tokens ...');
		return undefined;
	}
};

export const resetCredentials = async () => {
	await Keychain.resetGenericPassword();
};
