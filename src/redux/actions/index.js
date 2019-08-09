import { AsyncStorage } from 'react-native';
import { ADD_ARTICLE, GET_TOKEN, SAVE_TOKEN } from './action-types';

export function addArticle(payload) {
	return { type: ADD_ARTICLE, payload };
}

export const getToken = token => ({
	type: GET_TOKEN,
	token
});

export const saveToken = token => ({
	type: SAVE_TOKEN,
	token
});
