import { createSelector } from 'reselect';

export const getArticles = state => state.rootReducer.articles;
export const getSubscriptions = state => state.rootReducer.subscriptionServices;
export const getActiveSubscriptionFilter = state => state.sessionReducer.activeSubscriptionFilter;
export const getSubscriptionArticles = state => state.rootReducer.aboArticles;
export const getArchiveIssues = state => state.rootReducer.archiveIssues;
export const getArchiveArticles = state => state.rootReducer.archiveArticles;

export const mapSubscriptionIdToShortcut = (state, subId) => {
	for (const sub of state.subscriptionServices) {
		if (sub.id === subId) {
			return sub.shortcut;
		}
	}

	return undefined;
};

export const mapSubscriptionIdToTileColor = (state, subId) => {
	for (const sub of state.subscriptionServices) {
		if (sub.id === subId) {
			return sub.color.split(';')[0];
		}
	}

	return undefined;
};

export const test = createSelector(
	getArticles,
	test => {
		return test;
	}
);

function isObject(value) {
	return value && typeof value === 'object' && value.constructor === Object;
}

export const getFilteredSubscriptionArticles = createSelector(
	getSubscriptionArticles,
	getActiveSubscriptionFilter,
	getArticles,
	(aboArticles, subFilter, generalArticles) => {
		console.log('GET FILTERED SUBS ARTICLES');
		console.log('ARTICLES: ', aboArticles);
		console.log('SUB FILTER: ', subFilter);
		console.log('General articles ', generalArticles);

		if (!subFilter || !aboArticles || aboArticles.length === 0 || isObject(aboArticles)) {
			console.info('!subfilter -> general');
			return generalArticles;
		}

		for (const subArticleGroup of aboArticles) {
			console.log(`Comparing ${subArticleGroup.id} to ${subFilter.id}`);
			if (subArticleGroup.id === subFilter.id && subArticleGroup.audio === subFilter.audio) {
				console.info('subfilter match -> filtered');
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
