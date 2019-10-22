import { createSelector } from 'reselect';

export const getArticles = state => state.rootReducer.articles;
export const getSubscriptions = state => state.rootReducer.subscriptionServices;
export const getActiveSubscriptionFilter = state => state.sessionReducer.activeSubscriptionFilter;
export const getSubscriptionArticles = state => state.rootReducer.aboArticles.entries;
export const subLastModified = state => state.rootReducer.aboArticles.lastModified;
export const getArchiveIssues = state => state.rootReducer.archiveIssues;
export const getArchiveArticles = state => state.rootReducer.archiveArticles;
export const getDownloads = state => state.rootReducer.downloadedArticles;
export const isHomescreenRefreshing = state => state.sessionReducer.homeScreenRefreshing;
export const getCategoryArticles = state => state.rootReducer.categoryArticles;

export const getSubscriptionIDs = state => {
	const allSubIDs = [];
	for (const sub of getSubscriptions(state)) {
		if (!allSubIDs.includes(sub.id)) {
			allSubIDs.push(sub.id);
		}
	}

	return allSubIDs;
};

export const mapSubscriptionIdToShortcut = (state, subId) => {
	for (const sub of getSubscriptions(state)) {
		if (sub.id === subId) {
			return sub.shortcut;
		}
	}

	return undefined;
};

export const mapSubscriptionIdToTileColor = (state, subId) => {
	for (const sub of getSubscriptions(state)) {
		if (sub.id === subId) {
			return sub.color.split(';')[0];
		}
	}

	return undefined;
};

// export const isArticleAlreadyDownloaded = (state, article) => {
// 	if (!isHomescreenRefreshing(state)) {
// 		console.log('Called isarticlealreadydl with: ', article.article_id);

// 		for (const downloadedArticle of getDownloads(state)) {
// 			if (downloadedArticle.article_id === article.article_id) {
// 				return true;
// 			}
// 		}
// 		return false;
// 	}

// 	console.log('Still refreshing ...');
// };

function isObject(value) {
	return value && typeof value === 'object' && value.constructor === Object;
}

export const getFilteredSubscriptionArticles = createSelector(
	[getSubscriptionArticles, getActiveSubscriptionFilter, getArticles, subLastModified],
	(aboArticles, subFilter, generalArticles, lastModified) => {
		console.log('GET FILTERED SUBS ARTICLES');
		console.log('ARTICLES: ', aboArticles);
		console.log('SUB FILTER: ', subFilter);
		console.log('General articles ', generalArticles);

		if (!subFilter || !aboArticles || aboArticles.length === 0 || isObject(aboArticles)) {
			console.info('!subfilter -> general');
			return generalArticles;
		}

		for (let subArticleGroup of aboArticles) {
			console.log(`Comparing ${subArticleGroup.id} to ${subFilter.id}`);
			if (subArticleGroup.id === subFilter.id && subArticleGroup.audio === subFilter.audio) {
				console.log('Filtered subarticleGroup.');
				console.info('subfilter match -> filtered');
				console.log('Filtered: ', subArticleGroup.articles);
				return subArticleGroup.articles;
			}
		}

		console.info('else -> general');
		return generalArticles;
	}
);

export const getDropdownArchiveIssuesOptions = createSelector(
	getArchiveIssues,
	archiveIssues => {
		const filteredIssues = archiveIssues.map(issue => issue.title);
	}
);

export const getDownloadedArticleContents = (state, articleInfo) => {
	const currentDownloads = getDownloads(state);
	console.log('Current downloads', currentDownloads);
	if (currentDownloads.length === 0) {
		return undefined;
	}

	for (const downloadedArticle of currentDownloads) {
		if (
			downloadedArticle.article_id === articleInfo.article_id &&
			downloadedArticle.audio === articleInfo.audio
		) {
			return downloadedArticle;
		}
	}

	return undefined;
};
