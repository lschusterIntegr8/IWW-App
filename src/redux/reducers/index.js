import {
	ADD_SUBSCRIPTION_ARTICLES,
	SET_SUBSCRIPTIONS,
	SET_ARTICLES,
	SET_ARCHIVE_ISSUES,
	SET_ARCHIVE_ARTICLES,
	SET_CATEGORY_ISSUES,
	SET_CATEGORY_ARTICLES,
	ADD_TO_DOWNLOADS,
	OPEN_AUDIO_PLAYER_MODAL,
	SET_FAVOURITES,
	APPEND_ARTICLES,
	APPEND_SUBSCRIPTION_ARTICLES
} from '../actions/action-types';

const initialState = {
	subscriptionServices: [],
	articles: [],
	aboArticles: { entries: [], lastModified: '' },
	archiveIssues: [],
	archiveArticles: [],
	categoryIssues: [],
	categoryArticles: [],
	downloadedArticles: [],
	audioPlayerModal: [],
	favouriteArticles: []
};

const addSubscriptionArticles = (state, action) => {
	console.log('ADD_SUBSCRIPTION_ARTICLES');
	console.log(action.payload); // .
	/* Find place where to store articles */
	const receivedArticles = action.payload;
	const storedArticles = state.aboArticles.entries;
	let aboIndex = 0;
	for (const storedAbo of storedArticles) {
		aboIndex++;
		if (storedAbo.id === receivedArticles.id && storedAbo.audio === receivedArticles.audio) {
			/* If abo articles with ID already exist --> set new ones there */
			let storedAboArticles = storedAbo;
			storedAboArticles.articles = receivedArticles.articles;

			storedArticles[aboIndex] = storedAboArticles;

			console.info('TRYING TO RETURN');
			console.log({
				...state,
				aboArticles: { entries: storedArticles, lastModified: Date.now() }
			});

			return {
				...state,
				aboArticles: { entries: storedArticles, lastModified: Date.now() }
			};
		}
	}

	/* If the artilces are not yet stored --> append them to the articles abo */
	return {
		...state,
		aboArticles: {
			...state.aboArticles,
			lastModified: Date.now(),
			entries: [
				...state.aboArticles.entries,
				{
					id: receivedArticles.id,
					audio: receivedArticles.audio,
					articles: receivedArticles.articles
				}
			]
		}
	};
};

const appendSubscriptionArticles = (state, action) => {
	console.log('APPEND_SUBSCRIPTION_ARTICLES');
	console.log(action.payload); // .
	/* Find place where to store articles */
	const receivedArticles = action.payload;
	const storedArticles = state.aboArticles.entries;
	let aboIndex = 0;
	for (const storedAbo of storedArticles) {
		if (storedAbo.id === receivedArticles.id && storedAbo.audio === receivedArticles.audio) {
			/* If abo articles with ID already exist --> set new ones there */
			let storedAboArticles = storedAbo;
			let newStoredAboArticles = [
				...storedAboArticles.articles,
				...receivedArticles.articles
			];

			console.log('NEW ABO ARTICLES: ', newStoredAboArticles);
			storedAboArticles.articles = newStoredAboArticles;
			console.log(storedArticles[aboIndex], ' is becoming: ', storedAboArticles);
			storedArticles[aboIndex] = storedAboArticles;

			console.info('TRYING TO RETURN');
			console.log({
				...state,
				aboArticles: { entries: storedArticles, lastModified: Date.now() }
			});

			return {
				...state,
				aboArticles: { entries: storedArticles, lastModified: Date.now() }
			};
		}
		aboIndex++;
	}

	/* If the artilces are not yet stored --> append them to the articles abo */
	return {
		...state,
		aboArticles: {
			...state.aboArticles,
			lastModified: Date.now(),
			entries: [
				...state.aboArticles.entries,
				{
					id: receivedArticles.id,
					audio: receivedArticles.audio,
					articles: receivedArticles.articles
				}
			]
		}
	};
};

function rootReducer(state = initialState, action) {
	console.log('PAYLOAD:\n', action.payload);
	console.log('TYPE:\n', action.type);
	switch (action.type) {
		case SET_CATEGORY_ISSUES: {
			return {
				...state,
				categoryIssues: action.payload
			};
		}
		case SET_CATEGORY_ARTICLES: {
			return {
				...state,
				categoryArticles: action.payload
			};
		}
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
		case APPEND_ARTICLES: {
			if (action.payload.articleType === 'general') {
				return {
					...state,
					articles: [...state.articles, ...action.payload.articles]
				};
			} else if (action.payload.articleType === 'subscription') {
				return appendSubscriptionArticles(state, action);
			} else if (action.payload.articleType === 'category') {
				return {
					...state,
					categoryArticles: [...state.categoryArticles, ...action.payload.articles]
				};
			} else {
				console.log('Missing flag articleType inside reducer ...');
				return {
					...state
				};
			}
		}
		case ADD_SUBSCRIPTION_ARTICLES: {
			return addSubscriptionArticles(state, action);
		}
		case APPEND_SUBSCRIPTION_ARTICLES: {
			return appendSubscriptionArticles(state, action);
		}
		case ADD_TO_DOWNLOADS: {
			for (const dlArticle of state.downloadedArticles) {
				if (
					dlArticle.article_id === action.payload.article_id &&
					dlArticle.audio === action.payload.audio
				) {
					console.info('Article is already stored inside downloads');
					return state;
				}
			}

			return {
				...state,
				downloadedArticles: [action.payload, ...state.downloadedArticles]
			};
		}
		case OPEN_AUDIO_PLAYER_MODAL: {
			return {
				...state,
				audioPlayerModal: action.payload
			};
		}
		case SET_FAVOURITES: {
			return {
				...state,
				favouriteArticles: action.payload
			};
		}
	}

	return state;
}

export default rootReducer;
