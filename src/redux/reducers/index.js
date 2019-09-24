import {
	ADD_ARTICLE,
	// SET_TOKENS,
	SET_SUBSCRIPTIONS,
	SET_ACTIVE_SUB_FILTER,
	SET_ARTICLES
} from '../actions/action-types';

const initialState = {
	activeSubscriptionFilter: undefined,
	subscriptionServices: [],
	articles: [],
	aboArticles: [
		{
			id: 51,
			audio: true,
			articles: []
		}
	],
	archive: [
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
		// case SET_TOKENS: {
		// 	return {
		// 		...state,
		// 		accessToken: action.payload.accessToken,
		// 		refreshToken: action.payload.refreshToken
		// 	};
		// }
		case SET_ACTIVE_SUB_FILTER: {
			return {
				...state,
				activeSubscriptionFilter: action.payload
			};
		}
	}

	return state;
}

export default rootReducer;
