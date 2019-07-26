import { ADD_ARTICLE } from './action-types';

export function addArticle(payload) {
	return { type: ADD_ARTICLE, payload };
}
