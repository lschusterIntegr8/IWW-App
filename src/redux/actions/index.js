import {
	SET_HOME_SCREEN_REFRESHING,
	ADD_ARTICLE,
	GET_TOKEN,
	SET_ARCHIVE_ISSUES,
	SET_SUBSCRIPTIONS,
	TOGGLE_ACTIVE_SUB_FILTER,
	SET_ARTICLES,
	ADD_SUBSCRIPTION_ARTICLES
} from './action-types';

/* ACTIONS */
export function setHomeScreenRefreshing(payload) {
	return {
		type: SET_HOME_SCREEN_REFRESHING,
		payload
	};
}
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

export function addSubscriptionArticles(payload) {
	return {
		type: ADD_SUBSCRIPTION_ARTICLES,
		payload
	};
}

export function setArchiveIssues(payload) {
	return {
		type: SET_ARCHIVE_ISSUES,
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
		type: TOGGLE_ACTIVE_SUB_FILTER,
		payload
	};
}
