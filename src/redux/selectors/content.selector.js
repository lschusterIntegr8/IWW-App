import { createSelector } from 'reselect';

export const getArticles = state => state.articles;
export const getSubscriptions = state => state.subscriptionServices;
export const getActiveSubscriptionFilter = state => state.activeSubscriptionFilter;

export const getFilteredSubscriptionArticles = createSelector(
	getArticles,
	getActiveSubscriptionFilter,
	(articles, subFilter) =>
		articles.filter(article => {
			article._embedded.contents[0].application_id === subFilter ? true : false;
		})
);
