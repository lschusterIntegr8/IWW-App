/* eslint-disable no-console */
import { AsyncStorage } from '@react-native-community/async-storage';
import * as Keychain from 'react-native-keychain';

import * as API from './api';

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

export const sendPasswordResetEmail = async () => {
	return new Promise((resolve, reject) => {
		console.log('started password reset.');
		setTimeout(() => {
			console.log('done password reset.');
			return resolve('yes');
		}, 4000);
	});
};

export const authenticateLogin = async (email, password) => {
	console.log('started login.');
	const authResponse = await API.userLogin(email, password);
	console.log('Returning...');
	return authResponse;
	// if (email === 't@t.de' && password === 'test') return resolve(true);
	// else return reject(false);
};
