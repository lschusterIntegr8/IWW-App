import * as Keychain from 'react-native-keychain';

/*
 *
 * Function that stores auth tokens securely using encription
 */
export const storeTokens = async authResponse => {
	/* Dispatch tokens to redux store */
	console.log('Storing ', authResponse);

	const tmpTokens = {
		accessToken: authResponse.accessToken,
		refreshToken: authResponse.refreshToken
	};

	/* Save to storage */
	try {
		await Keychain.setGenericPassword('tokens', JSON.stringify(tmpTokens));
	} catch (err) {
		console.log(err);
		alert('ERROR STORING TOKENS ...');
	}
};

/*
 *
 * Function that fetches auth tokens from the secure storage
 */
export const fetchTokens = async () => {
	console.log('inside fetchTokens');
	try {
		let { password: tokens } = await Keychain.getGenericPassword();
		console.log(tokens);
		if (!tokens) {
			return undefined;
		}

		tokens = JSON.parse(tokens);
		console.log('tokens:\n', tokens);
		return tokens;
	} catch (err) {
		console.log(err);
		alert('Error fetching tokens ...');
	}
};

export const resetCredentials = async () => {
	await Keychain.resetGenericPassword();
};
