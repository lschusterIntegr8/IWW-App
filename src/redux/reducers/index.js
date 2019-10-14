import {
	ADD_ARTICLE,
	ADD_SUBSCRIPTION_ARTICLES,
	SET_SUBSCRIPTIONS,
	SET_ARTICLES,
	SET_ARCHIVE_ISSUES,
	SET_ARCHIVE_ARTICLES,
	ADD_TO_DOWNLOADS
} from '../actions/action-types';

const initialState = {
	subscriptionServices: [],
	articles: [],
	aboArticles: [],
	archiveIssues: [],
	archiveArticles: [],
	downloadedArticles: []
};

function rootReducer(state = initialState, action) {
	console.log('PAYLOAD:\n', action.payload);
	console.log('TYPE:\n', action.type);
	switch (action.type) {
		case SET_ARCHIVE_ISSUES: {
			return {
				...state,
				archiveIssues: action.payload
			};
		}
		case SET_ARCHIVE_ARTICLES: {
			return {
				...state,
				archiveArticles: action.payload
			};
		}
		case SET_SUBSCRIPTIONS: {
			return {
				...state,
				subscriptionServices: action.payload
			};
		}
		case SET_ARTICLES: {
			return {
				...state,
				articles: action.payload
			};
		}
		case ADD_ARTICLE: {
			return {
				...state,
				articles: [...state.articles, action.payload]
			};
		}
		case ADD_SUBSCRIPTION_ARTICLES: {
			console.log('ADD_SUBSCRIPTION_ARTICLES');
			console.log(action.payload); // .
			/* Find place where to store articles */
			const receivedArticles = action.payload;
			const storedArticles = state.aboArticles;
			let aboIndex = 0;
			for (const storedAbo of storedArticles) {
				aboIndex++;
				if (
					storedAbo.id === receivedArticles.id &&
					storedAbo.audio === receivedArticles.audio
				) {
					/* If abo articles with ID already exist --> set new ones there */
					let storedAboArticles = storedAbo;
					storedAboArticles.articles = receivedArticles.articles;

					storedArticles[aboIndex] = storedAboArticles;

					console.info('TRYING TO RETURN');
					console.log({
						...state,
						aboArticles: storedArticles
					});

					return {
						...state,
						aboArticles: storedArticles
					};
				}
			}

			/* If the artilces are not yet stored --> append them to the articles abo */
			return {
				...state,
				aboArticles: [
					...state.aboArticles,
					{
						id: receivedArticles.id,
						audio: receivedArticles.audio,
						articles: receivedArticles.articles
					}
				]
			};
		}
		case ADD_TO_DOWNLOADS: {
			return {
				...state,
				downloadedArticles: [...downloadedArticles, action.payload]
			};
		}
	}

	return state;
}

export default rootReducer;
