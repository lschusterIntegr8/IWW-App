/* eslint-disable no-console */
import { store, persistor } from '../redux/store/index';

import * as API from './api';
import * as storageHelper from './storage';
import { setSubscriptions, setArticles, addArticle } from '../redux/actions/index';
import { cleanUrls, matchSubscriptionIdToShortcut } from './util/util';

export const fetchAndAddArticles = async (subId, limit, skip, searchtext) => {
	const { data: articles } = await API.getSubscriptionArticles(
		subId,
		limit,
		skip,
		searchtext
	).catch(responseContent => {
		console.log(responseContent);
	});

	store.dispatch(addArticle(articles));
};

export const getArticleContent = async (articleId, applicationId) => {
	const { data: articleContent } = await API.singleArticleContent(articleId).catch(err => {
		console.log(err);
		return err;
	});

	const articleTag = await matchSubscriptionIdToShortcut(applicationId);
	const cleanHTML = cleanUrls(articleContent.content, articleTag);
	console.log('CLEAN HTML IS:\n');
	console.log(cleanHTML);
	const resultObj = articleContent;
	resultObj.content = cleanHTML;
	console.log('Result object is:\n');
	console.log(resultObj);
	return resultObj;
};
