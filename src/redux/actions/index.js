import { AsyncStorage } from 'react-native';
import { ADD_ARTICLE, GET_TOKEN, SET_TOKENS, SET_SUBSCRIPTIONS } from './action-types';

/* ACTIONS */
export function addArticle(payload) {
	return {
		type: ADD_ARTICLE,
		payload
	};
}

export function saveToken(payload) {
	return {
		type: SET_TOKENS,
		payload
	};
}
export function setSubscriptions(payload) {
	return {
		type: SET_SUBSCRIPTIONS,
		payload
	};
}

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
