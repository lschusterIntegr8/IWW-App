/* eslint-disable no-console */
import { store, persistor } from '../redux/store/index';
import {
	getArticles,
	getSubscriptions,
	getSubscriptionIDs,
	getDownloadedArticleContents,
	getCachedArticleContents
} from '../redux/selectors/content.selector';

import * as API from './api';
import * as storageHelper from './storage';
import { getActiveTokens, setActiveTokens } from './tokens';
import {
	setSubscriptions,
	setArticles,
	addSubscriptionArticles,
	setHomeScreenRefreshing,
	setArchiveIssues,
	setArchiveArticles,
	setCategoryIssues,
	setCategoryArticles,
	addToDownloads,
	setFavourites,
	appendArticles,
	cacheArticle
} from '../redux/actions/index';
import { cleanUrls, matchSubscriptionIdToShortcut } from './util/util';
import config from '../config/main';

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
	console.log("fetch and set articles ",articles);
	return store.dispatch(setArticles(articles));
};

export const loadMoreArticles = async (
	subId,
	limit,
	skip,
	searchtext,
	audio,
	issueId,
	categoryId,
	articleType // can be: general, subscription, category
) => {
	/* CASE1: load more general articles */
	let articles;

	if (['general', 'subscription'].includes(articleType)) {
		({ data: articles } = await API.getSubscriptionArticles(
			subId,
			limit,
			skip,
			searchtext,
			audio
		).catch(responseContent => {
			console.log(responseContent);
			return responseContent;
		}));
	} else if (articleType === 'category') {
		console.log('CATEGORY ARTICLETYPE');
		({ data: articles } = await API.getCategoryArticles(subId, categoryId, audio, skip, limit));
		console.log('Fetched cat articles');
	} else {
		console.warn('Unsupported articleType used for loadMoreArticles...');
	}

	console.info('Appending: ', { articles: articles, articleType });
	console.log("load more articles ",articles);
	cachedArticle(articles, audio);
	return store.dispatch(appendArticles({ articles: articles, articleType, id: subId, audio }));
};

/* Set subscription articles */
export const storeSubscriptionArticles = async (subId, limit, skip, searchtext, audio) => {
	console.info('STORE SUBS ARTICLES CALLED (content)');
	/* Check if subscription articles are already present in the store  */
	const subscriptionArticles = store.getState().rootReducer.aboArticles.entries;
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
		console.warn('Error fetchAndSetSubscriptions');
		console.warn(err);
		throw err;
	}
};

/*
 *	Returns cleaned/parsed content of a single article
 */
export const getArticleContent = async (
	articleId,
	applicationId,
	audioVersion = undefined,
	srcCallerFlag = undefined
) => {
	
	/* Check if article is in downloads */
	if (srcCallerFlag === 'downloads') {
		const foundArticle = getDownloadedArticleContents(store.getState(), {
			article_id: articleId,
			audio: audioVersion,
			application_id: applicationId
		});
		console.log('Searching article contents in downloads ...');
		if (foundArticle) {
			console.log('Found article contents inside downloads');
			return foundArticle;
		}

		console.log('Could not find article stored in the downloads ...');
	}

	/* TODO: check if article contents are already cached */
	const cachedArticle = getCachedArticleContents(store.getState(), {
		article_id: articleId,
		audio: audioVersion,
		application_id: applicationId
	});

	console.log('Searching article contents in the CACHE ...');
	if (cachedArticle) {
		console.log('Found article contents inside CACHED ARTICLES');
		return cachedArticle;
	}

	console.log('Could not find article stored in the CACHE ...');

	console.log('Fetching endpoint data where audio=', audioVersion);
	const { data: articleContent } = await API.singleArticleContent(articleId, audioVersion).catch(
		err => {
			console.log(err);
			throw err;
		}
	);

	let resultObj = articleContent;

	if (!audioVersion) {
		const articleTag = await matchSubscriptionIdToShortcut(applicationId);
		const cleanHTML = cleanUrls(articleContent.content, articleTag);
		resultObj.content = cleanHTML;
	} else {
		resultObj.audio = true;
	}

	/* TODO: STORE TO CACHE */
	console.log('WILL STORE TO CACHE:');
	const articleInfo = {
		article_id: articleId,
		audio: audioVersion,
		application_id: applicationId
	};

	const mergedArticleForCache = { ...articleInfo, ...resultObj, audio: audioVersion };
	console.log('MERGED CACHE ARTICLE: ', mergedArticleForCache);

	store.dispatch(cacheArticle(mergedArticleForCache));

	return resultObj;
};

/*
 * Fetches and stores archive issues/articles to the Redux store, based on the (default if issueID ==== undefined) selection
 */
export const getArchiveContent = async (subId, issueID = undefined, audioVersion = undefined) => {
	console.log('Fetching endpoint data');
	store.dispatch(setHomeScreenRefreshing(true));
	console.info(
		'GET ARCHIVE CONTENT CALLED with subId: ',
		subId,
		'and issueID: ',
		issueID,
		'and audio: ',
		audioVersion
	);
	try {
		/* Default case (usually when archive tab is opened) */
		if (!issueID) {
			/* Get archive issues and select first issue (default) and set to store */
			console.info('ArchiveIssueID not provided --> fetching archive issues');
			let archiveIssues = await API.getArchiveIssues(subId).catch(async issuesErr => {
				console.warn('Archive issues could not be fetched for subId: ', subId);
				console.info('RETRYING ARCHIVE CONTENT in 1 sec');
				await new Promise(r => setTimeout(r, 1000));
				console.info('RETRY');
				return getArchiveContent(subId, issueID, audioVersion);
			});
			console.info('ARCHIVE ISSUES');
			archiveIssues = archiveIssues.data;
			console.log(archiveIssues);

			/* Set automatically issue id to the first element/issue */
			const firstIssueID = archiveIssues[0].id;
			store.dispatch(setArchiveIssues(archiveIssues));

			/* Fetch default archive articles and set to store */
			const { data: archiveArticles } = await API.getArchiveArticles(
				subId,
				firstIssueID,
				audioVersion
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
			issueID,
			audioVersion
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
		console.warn(err);
		throw err;
	}
};

/*
 * Fetches and stores category (RUBRIKEN) issues/articles to the Redux store, based on the (default if issueID ==== undefined) selection
 */
export const getCategoryContent = async (subId, issueID = undefined, audioVersion = undefined) => {
	console.log('Fetching endpoint data');
	store.dispatch(setHomeScreenRefreshing(true));
	console.info(
		'GET CATEGORY CONTENT CALLED with subId: ',
		subId,
		'and issueID: ',
		issueID,
		'and audio: ',
		audioVersion
	);
	try {
		/* Default case (usually when category tab is opened) */
		if (!issueID) {
			/* Get category issues and select first issue (default) and set to store */
			console.info('CategoryIssueID not provided --> fetching category issues');
			let categoryIssues = await API.getCategoryIssues(subId).catch(issuesErr => {
				console.warn('Category issues could not be fetched for subId: ', subId);
				setTimeout(() => {
					return getCategoryContent(subId, issueID, audioVersion);
				}, 1000);
			});
			console.info('CATEGORY ISSUES');
			categoryIssues = categoryIssues.data;
			console.log(categoryIssues);

			/* Set automatically issue id to the first element/issue */
			const firstIssueID = categoryIssues[0].id;
			console.log('FIRST CATEGORY ISSUE ID: ', firstIssueID);
			store.dispatch(setCategoryIssues(categoryIssues));

			/* Fetch default category articles and set to store */
			const { data: categoryArticles } = await API.getCategoryArticles(
				subId,
				firstIssueID,
				audioVersion,
				0,
				config.NUM_OF_ARTICLES_PER_FETCH
			).catch(articlesErr => {
				console.warn(articlesErr.response);
				throw new Error(
					'Category Articles could not be fetched for subId: ',
					subId,
					'\tissueID: ',
					issueID
				);
			});

			store.dispatch(setHomeScreenRefreshing(false));
			return store.dispatch(setCategoryArticles(categoryArticles));
		}

		store.dispatch(setHomeScreenRefreshing(true));
		const { data: categoryArticlesFiltered } = await API.getCategoryArticles(
			subId,
			issueID,
			audioVersion
		).catch(articlesErr => {
			console.warn(articlesErr.response);

			throw new Error(
				'Category Articles could not be fetched for subId: ',
				subId,
				'\tissueID: ',
				issueID
			);
		});

		store.dispatch(setHomeScreenRefreshing(false));
		return store.dispatch(setCategoryArticles(categoryArticlesFiltered));
	} catch (err) {
		store.dispatch(setHomeScreenRefreshing(false));
		console.warn(err);
		return err;
	}
};

/* Fetches for every infodienst the favourites list and combines + stores to redux */
export const getAllFavourites = async () => {
	try {
		store.dispatch(setHomeScreenRefreshing(true));
		/* Fetch for all infodienste --> doing multiple requests for every infodienst (*tnx iww*) */
			const favouriteData = await API.getFavourites();
			console.log("data favourities fetched: ", favouriteData)
			
			let formattedFavourites = favouriteData.data;
			/* Combine all responses to a single formatted array of favourites */

			console.log('formattedFavourites: ', formattedFavourites);
			store.dispatch(setHomeScreenRefreshing(false));
			store.dispatch(setFavourites(formattedFavourites));

	} catch (err) {
		console.warn(err);
	}
};

/* If content not in redux-store --> fetch from API */
export const initAppContent = async (fetchNew, props) => {
	/* New data should be fetched:
	 *	1. refresh token (to not receive cached data)
	 *	2. fetch content with the new token
	 */

	console.log('STORE');
	console.log(store.getState().rootReducer);
	console.log('initAppContent called with: ', fetchNew, props);

	try {
		if (fetchNew) {
			console.info('HEARD FETCH NEW FLAG');
			const tokens = await getActiveTokens().catch(err => {
				console.warn("TOKEN CAN'T BE fetched");
				console.warn(err);
				return err;
			});

			if (tokens.navigation) {
				console.log('Navigating to: ', tokens.navigation);
				return props.navigation.navigate(tokens.navigation);
			}

			const refreshedTokens = await API.refreshToken(tokens.refreshToken).catch(err => {
				console.warn("TOKEN CAN'T BE REFRESHED");
				console.warn(err);
				return err;
			});

			console.log('SETTING REFRESHED TOKEN');
			await setActiveTokens(refreshedTokens);

			// console.time('FETCHPROMISES');
			const fetchedSubscriptions = await fetchAndSetSubscriptions();
			const fetchedArticles = await fetchAndSetArticles(
				undefined,
				config.NUM_OF_ARTICLES_PER_FETCH,
				undefined,
				undefined
			);
			// console.timeEnd('FETCHPROMISES');

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
				fetchPromises.push(
					fetchAndSetArticles(
						undefined,
						config.NUM_OF_ARTICLES_PER_FETCH,
						undefined,
						undefined
					).catch(err => {
						console.warn(err);
					})
				);
			}

			if (fetchPromises.length > 0) {
				return Promise.all(fetchPromises);
			}

			return true;

			// return props.navigation.navigate('App');
		}
	} catch (err) {
		console.warn('INIT APP CONTENT ERR');
		console.warn(err);
		return props.navigation.navigate('Authentication');
	}
};

export const storeArticleToDownloads = async (articleInfo, audioVersion = undefined) => {
	console.log('Store article to downloads called ...');
	console.log(articleInfo);
	try {
		/* Fetch article content */
		const articleContents = await getArticleContent(
			articleInfo.article_id,
			articleInfo.application_id,
			audioVersion
		);
		console.log('TRYING TO DOWNLOAD: ', articleContents);

		const mergedDlArticle = { ...articleInfo, ...articleContents, audio: audioVersion };

		/* Store to redux-persist store */
		return store.dispatch(addToDownloads(mergedDlArticle));
	} catch (err) {
		console.warn(err);
		console.warn(err.response);
		console.warn('Error while trying to download article');
		throw new Error({ status: 'error' });
	}
};

const cachedArticle = async (articles, audio) => {
	console.log("number of articles cached: ",store.getState().rootReducer.cachedArticles.length);
	console.log("--------Cashing load more articles------")
	let audioVersion = audio ? audio : undefined
	for (let article of articles){
		const foundArticle = getCachedArticleContents(store.getState(), {
			article_id: article.article_id,
			audioVersion,
			application_id: article.application_id
		});
		if (foundArticle) continue;

		console.log("Article content was not found in store, proceed to cashe");
		const { data: articleContent } = await API.singleArticleContent(article.article_id, audioVersion).catch(
			err => {
				console.log(err);
				throw err;
			}
		);
	
		let resultObj = articleContent;
			console.log("audio value on load more function ", audio);
		if (!audioVersion) {
			const articleTag = await matchSubscriptionIdToShortcut(article.application_id);
			const cleanHTML = cleanUrls(articleContent.content, articleTag);
			resultObj.content = cleanHTML;
		} else {
			resultObj.audio = true;
		}
		console.log('WILL STORE TO CACHE:');
		const articleInfo = {
			article_id: article.article_id,
			audio: audioVersion,
			application_id: article.application_id
		};
		
		console.log("audioversion ", audioVersion)
		const mergedArticleForCache = { ...articleInfo, ...resultObj, audioVersion};
		console.log('MERGED CACHE ARTICLE: from load more', mergedArticleForCache);
	
		store.dispatch(cacheArticle(mergedArticleForCache));
	}

}