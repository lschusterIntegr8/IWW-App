import { AsyncStorage } from 'react-native';
import {
	ADD_ARTICLE,
	GET_TOKEN,
	SET_TOKENS,
	SET_SUBSCRIPTIONS,
	SET_ACTIVE_SUB_FILTER,
	SET_ARTICLES
} from './action-types';

/* ACTIONS */

/* articles */
export function addArticle(payload) {
	return {
		type: ADD_ARTICLE,
		payload
	};
}

export function setArticles(payload) {
	return {
		type: SET_ARTICLES,
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

export function setActiveSubFilter(payload) {
	return {
		type: SET_ACTIVE_SUB_FILTER,
		payload
	};
}
