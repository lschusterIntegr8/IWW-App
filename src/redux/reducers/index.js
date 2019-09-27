import {
	SET_HOME_SCREEN_REFRESHING,
	ADD_ARTICLE,
	ADD_SUBSCRIPTION_ARTICLES,
	SET_SUBSCRIPTIONS,
	TOGGLE_ACTIVE_SUB_FILTER,
	SET_ARTICLES,
	SET_ARCHIVE_ISSUES,
	SET_ARCHIVE_ARTICLES
} from '../actions/action-types';

const initialState = {
	homeScreenRefreshing: false,
	activeSubscriptionFilter: undefined,
	subscriptionServices: [],
	articles: [],
	aboArticles: [],
	archiveIssues: [],
	archiveArticles: [
		{
			archiveId: '1234',
			title:
				'ARCHIV: Qualität des Operateurs hängt von der Methode ab? Bla bla Bla bla Bla bla Bla bla Bla bla Bla bla Bla bla Bla bla ',
			category: 'TeamManagement',
			published_on: 'Wednesday, 21 Jul 2019',
			author: 'CB',
			content:
				'blablablablalbsdjsdfsdfssdfflskdjfljlksjdglsjdflksjdflksjdflksjdflksjdflksjdflksdjflksdjflskdjflskdjflskdjflsdkjflsdkfjsldkfjlsdkjflskdjflskjdf',
			audio: 'test.wav'
		},
		{
			archiveId: '12345',
			title: 'ARCHIV: Was tun bei Burnout und innerer Kündigung?',
			category: 'TeamManagement',
			published_on: 'Monday, 02 Mar 2018',
			author: 'MR',
			content:
				'blablablablalbsdjflskdjfljlksjdglsjdflksjdflksjdflksjdflksjdflksjdflksdjflksdjflskdjflskdjflskdjflsdkjflsdkfjsldkfjlsdkjflskdjflskjdf',
			audio: 'test2.wav'
		}
	]
};

function rootReducer(state = initialState, action) {
	console.log('PAYLOAD:\n', action.payload);
	console.log('TYPE:\n', action.type);
	switch (action.type) {
		case SET_HOME_SCREEN_REFRESHING: {
			return {
				...state,
				homeScreenRefreshing: action.payload
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
				archiveIssues: action.payload
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
		case TOGGLE_ACTIVE_SUB_FILTER: {
			return {
				...state,
				activeSubscriptionFilter:
					state.activeSubscriptionFilter &&
					state.activeSubscriptionFilter.id &&
					state.activeSubscriptionFilter.id === action.payload.id &&
					state.activeSubscriptionFilter.audio === action.payload.audio
						? undefined
						: action.payload
			};
		}
	}

	return state;
}

export default rootReducer;
