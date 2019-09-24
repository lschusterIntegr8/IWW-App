/* eslint-disable no-console */
import { store, persistor } from '../redux/store/index';
import { getArticles, getSubscriptions } from '../redux/selectors/content.selector';

import * as API from './api';
import * as storageHelper from './storage';
import { getActiveTokens, setActiveTokens } from './tokens';
import { setSubscriptions, setArticles, addArticle } from '../redux/actions/index';
import { cleanUrls, matchSubscriptionIdToShortcut } from './util/util';

/* */
export const fetchAndSetArticles = async (subId, limit, skip, searchtext) => {
	const { data: articles } = await API.getSubscriptionArticles(
		subId,
		limit,
		skip,
		searchtext
	).catch(responseContent => {
		console.log(responseContent);
		return responseContent;
	});

	return store.dispatch(setArticles(articles));
};

export const fetchAndSetSubscriptions = async () => {
	/* Fetch subscriptions */
	try {
		const { data: subscriptions } = await API.getSubscriptions();

		store.dispatch(setSubscriptions(subscriptions));
		return { navigation: 'App' };
	} catch (err) {
		console.error('Error fetchAndSetSubscriptions');
		console.error(err);
	}
};

/*
 *	Returns cleaned/parsed content of a single article
 */
export const getArticleContent = async (articleId, applicationId) => {
	const { data: articleContent } = await API.singleArticleContent(articleId).catch(err => {
		console.log(err);
		return err;
	});

	const articleTag = await matchSubscriptionIdToShortcut(applicationId);
	const cleanHTML = cleanUrls(articleContent.content, articleTag);
	const resultObj = articleContent;
	resultObj.content = cleanHTML;

	return resultObj;
};

/* If content not in redux-store --> fetch from API */
export const initAppContent = async (fetchNew, props) => {
	/* New data should be fetched:
	 *	1. refresh token (to not receive cached data)
	 *	2. fetch content with the new token
	 */
	try {
		if (fetchNew) {
			console.info('HEARD FETCH NEW FLAG');
			const tokens = await getActiveTokens().catch(err => {
				console.error("TOKEN CAN'T BE fetched");
				console.error(err);
				return err;
			});

			if (tokens.navigation) {
				console.log('Navigating to: ', tokens.navigation);
				return props.navigation.navigate(tokens.navigation);
			}

			const refreshedTokens = await API.refreshToken(tokens.refreshToken).catch(err => {
				console.error("TOKEN CAN'T BE REFRESHED");
				console.error(err);
				return err;
			});

			console.log('SETTING REFRESHED TOKEN');
			await setActiveTokens(refreshedTokens);

			console.time('FETCHPROMISES');
			const fetchedSubscriptions = await fetchAndSetSubscriptions();
			const fetchedArticles = await fetchAndSetArticles(undefined, 10, undefined, undefined);
			console.timeEnd('FETCHPROMISES');

			if (fetchedSubscriptions.navigation) {
				// return props.navigation.navigate(fetchedSubscriptions.navigation);
				console.warn('FETCHED .navigation');
				console.warn(fetchedSubscriptions);
			}

			if (fetchedSubscriptions.retry) {
				console.warn('FETCHED .retry');
			}

			return true;
		} else {
			console.info('ONLY FETCHING IF DATA IS EMPTY');

			let fetchPromises = [];
			/* If it shouldn't fetch fresh ones --> only refresh content if it's empty */
			if (getSubscriptions(store.getState()).length === 0) {
				console.log('Subscriptions empty - fetching');
				fetchPromises.push(fetchAndSetSubscriptions());
			}

			if (getArticles(store.getState()).length === 0) {
				console.log('Articles empty - fetching');
				/* Fetch articles */
				fetchPromises.push(fetchAndSetArticles(undefined, 10, undefined, undefined));
			}

			if (fetchPromises.length > 0) {
				return Promise.all(fetchPromises);
			}

			return true;

			// return props.navigation.navigate('App');
		}
	} catch (err) {
		console.error('INIT APP CONNTENT ERR');
		console.error(err);
		throw err;
	}
};
