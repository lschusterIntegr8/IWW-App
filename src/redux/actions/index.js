import { AsyncStorage } from 'react-native';
import { ADD_ARTICLE, GET_TOKEN, SAVE_TOKEN } from './action-types';

/* ACTIONS */
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

/* ACTION CREATORS */
/* 
export const getUserToken = () => dispatch =>
	AsyncStorage.getItem('userToken')
		.then(data => {
			dispatch(loading(false));
			dispatch(getToken(data));
		})
		.catch(err => {
			dispatch(loading(false));
			dispatch(error(err.message || 'ERROR'));
		});
*/
