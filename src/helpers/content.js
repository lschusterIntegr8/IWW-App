/* eslint-disable no-console */
import { store, persistor } from '../redux/store/index';
import { getArticles, getSubscriptions } from '../redux/selectors/content.selector';

import * as API from './api';
import * as storageHelper from './storage';
import { getActiveTokens, setActiveTokens } from './tokens';
import {
	setSubscriptions,
	setArticles,
	addArticle,
	addSubscriptionArticles,
	setHomeScreenRefreshing,
	setArchiveIssues,
	setArchiveArticles,
	addToDownloads
} from '../redux/actions/index';
import { cleanUrls, matchSubscriptionIdToShortcut } from './util/util';

/* Get search articles */
export const getSearchResult = async (subId, limit, skip, searchtext, audio) => {
	console.log('Fetching endpoint data');
	const { data: searchResult } = await API.getSubscriptionArticles(
		subId,
		limit,
		skip,
		searchtext,
		audio
	).catch(responseContent => {
		console.log(responseContent);
		return searchResult;
	});

	return searchResult;
};

/* Set general articles */
export const fetchAndSetArticles = async (subId, limit, skip, searchtext, audio) => {
	console.log('Fetching endpoint data');
	const { data: articles } = await API.getSubscriptionArticles(
		subId,
		limit,
		skip,
		searchtext,
		audio
	).catch(responseContent => {
		console.log(responseContent);
		return responseContent;
	});

	return store.dispatch(setArticles(articles));
};

/* Set subscription articles */
export const storeSubscriptionArticles = async (subId, limit, skip, searchtext, audio) => {
	console.info('STORE SUBS ARTICLES CALLED (content)');
	/* Check if subscription articles are already present in the store  */
	const subscriptionArticles = store.getState().aboArticles;
	console.log('SUB ART:', subscriptionArticles);

	if (subscriptionArticles) {
		for (const aboArticle of subscriptionArticles) {
			if (
				aboArticle.id === subId &&
				aboArticle.audio === audio &&
				aboArticle.articles.length > 0
			) {
				console.info(
					'---------Found cached subscription articles, no need to fetch new ...----------'
				);
				return true;
			}
		}
	}

	/* If subscription articles are not already cached --> fetch and store them to store */

	const { data: articles } = await API.getSubscriptionArticles(
		subId,
		limit,
		skip,
		searchtext,
		audio
	).catch(responseContent => {
		console.log(responseContent);
		return responseContent;
	});

	const result = {
		id: subId,
		audio: audio,
		articles: articles
	};

	console.log('STORING SUB ARTICLES (DISPATCH)', result);

	return store.dispatch(addSubscriptionArticles(result));
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
	console.log('Fetching endpoint data');
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

/*
 * Fetches and stores archive issues/articles to the Redux store, based on the (default if issueID ==== undefined) selection
 */
export const getArchiveContent = async (subId, issueID = undefined) => {
	console.log('Fetching endpoint data');
	store.dispatch(setHomeScreenRefreshing(true));
	console.info('GET ARCHIVE CONTENT CALLED with subId: ', subId, 'and issueID: ', issueID);
	try {
		/* Default case (usually when archive tab is opened) */
		if (!issueID) {
			/* Get archive issues and select first issue (default) and set to store */
			console.info('ArchiveIssueID not provided --> fetching archive issues');
			let archiveIssues = await API.getArchiveIssues(subId).catch(issuesErr => {
				throw new Error('Archive issues could not be fetched for subId: ', subId);
			});
			console.info('ARCHIVE ISSUES');
			archiveIssues = archiveIssues.data;
			console.log(archiveIssues);
			const firstIssueID = archiveIssues[0].id;
			store.dispatch(setArchiveIssues(archiveIssues));

			/* Fetch default archive articles and set to store */
			const { data: archiveArticles } = await API.getArchiveArticles(
				subId,
				firstIssueID
			).catch(articlesErr => {
				throw new Error(
					'Archive Articles could not be fetched for subId: ',
					subId,
					'\tissueID: ',
					issueID
				);
			});

			store.dispatch(setHomeScreenRefreshing(false));
			return store.dispatch(setArchiveArticles(archiveArticles));
		}

		store.dispatch(setHomeScreenRefreshing(true));
		const { data: archiveArticlesFiltered } = await API.getArchiveArticles(
			subId,
			issueID
		).catch(articlesErr => {
			throw new Error(
				'Archive Articles could not be fetched for subId: ',
				subId,
				'\tissueID: ',
				issueID
			);
		});

		store.dispatch(setHomeScreenRefreshing(false));
		return store.dispatch(setArchiveArticles(archiveArticlesFiltered));
	} catch (err) {
		store.dispatch(setHomeScreenRefreshing(false));
		console.error(err);
		return err;
	}
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

export const storeArticleToDownloads = async (articleInfo, subId) => {
	/* Fetch article content */
	const articleContents = await getArticleContent(articleInfo.id, subId);
	console.log('TRYING TO DOWNLOAD: ', articleContents);
	/* Store to redux-persist store */
	return store.dispatch(addToDownloads(articleContents));
};
