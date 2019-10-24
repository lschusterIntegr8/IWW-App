import {
	SET_HOME_SCREEN_REFRESHING,
	GET_TOKEN,
	SET_ARCHIVE_ISSUES,
	SET_ARCHIVE_ARTICLES,
	SET_CATEGORY_ISSUES,
	SET_CATEGORY_ARTICLES,
	SET_SUBSCRIPTIONS,
	TOGGLE_ACTIVE_SUB_FILTER,
	SET_ARTICLES,
	ADD_SUBSCRIPTION_ARTICLES,
	ADD_TO_DOWNLOADS,
	OPEN_AUDIO_PLAYER_MODAL,
	SET_FAVOURITES,
	APPEND_ARTICLES,
	SET_ACTIVE_DROPDOWN_ITEM,
	CACHE_ARTICLE
} from './action-types';

/* ACTIONS */
export function setHomeScreenRefreshing(payload) {
	return {
		type: SET_HOME_SCREEN_REFRESHING,
		payload
	};
}

export function appendArticles(payload) {
	return {
		type: APPEND_ARTICLES,
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

export function setArchiveArticles(payload) {
	return {
		type: SET_ARCHIVE_ARTICLES,
		payload
	};
}
export function setCategoryIssues(payload) {
	return {
		type: SET_CATEGORY_ISSUES,
		payload
	};
}

export function setCategoryArticles(payload) {
	return {
		type: SET_CATEGORY_ARTICLES,
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

export function addToDownloads(payload) {
	return {
		type: ADD_TO_DOWNLOADS,
		payload
	};
}

export function openAudioPlayerModal(payload) {
	return {
		type: OPEN_AUDIO_PLAYER_MODAL,
		payload
	};
}

export function setFavourites(payload) {
	return {
		type: SET_FAVOURITES,
		payload
	};
}

export function setActiveDropdownItem(payload) {
	return {
		type: SET_ACTIVE_DROPDOWN_ITEM,
		payload
	};
}

export function cacheArticle(payload) {
	return {
		type: CACHE_ARTICLE,
		payload
	};
}
