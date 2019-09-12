import { ADD_ARTICLE, SET_TOKENS, SET_SUBSCRIPTIONS } from '../actions/action-types';

const initialState = {
	accessToken: undefined,
	refreshToken: undefined,
	subscriptionServices: [
		// {
		// 	aboId: 'abo3',
		// 	title: 'Alle',
		// 	subtitle: 'Meine Informationsdienste',
		// 	thumbnail: require('../../assets/images/infodienst3.png')
		// },
		// {
		// 	aboId: 'abo1',
		// 	title: 'MR',
		// 	subtitle: 'MedizinReport',
		// 	thumbnail: require('../../assets/images/infodienst2.png')
		// },
		// {
		// 	aboId: 'abo2',
		// 	title: 'CB',
		// 	subtitle: 'ChefärzteBrief',
		// 	thumbnail: require('../../assets/images/infodienst1.png')
		// }
	],
	articles: [
		{
			articleId: '1234',
			title: 'Qualität des Operateurs hängt von der Methode ab?',
			category: 'TeamManagement',
			published_on: 'Wednesday, 21 Jul 2019',
			author: 'CB',
			thumbnail: require('../../assets/images/test-article-1.png'),
			html:
				'<h1>This HTML snippet is now rendered with native components !</h1><h2>Enjoy a webview-free and blazing fast application</h2><img src="https://dummyimage.com/600x400/e6e6e6/000000&text=placeholder" /><em style="textAlign: center;">This is an Image.</em>',
			audio: 'test.wav'
		},
		{
			articleId: '12345',
			title: 'Was tun bei Burnout und innerer Kündigung?',
			category: 'TeamManagement',
			published_on: 'Monday, 02 Mar 2018',
			author: 'MR',
			thumbnail: require('../../assets/images/test-article-2.png'),
			html:
				'<h1>This HTML snippet is now rendered with native components !</h1><h2>Enjoy a webview-free and blazing fast application</h2><img src="https://dummyimage.com/600x400/e6e6e6/000000&text=placeholder" /><em style="textAlign: center;">This is an Image.</em>',
			audio: 'test2.wav'
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
	switch (action.type) {
		case SET_SUBSCRIPTIONS: {
			return {
				...state,
				subscriptionServices: [...state.subscriptionServices, ...action.payload]
			};
		}
		case ADD_ARTICLE: {
			return {
				...state,
				articles: [...state.articles, action.payload]
			};
		}
		case SET_TOKENS: {
			return {
				...state,
				accessToken: action.payload.accessToken,
				refreshToken: action.payload.refreshToken
			};
		}
	}

	return state;
}

export default rootReducer;
