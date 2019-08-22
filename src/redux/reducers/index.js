import { ADD_ARTICLE } from '../actions/action-types';

const initialState = {
	aboInfoServices: [
		{
			aboId: 'abo3',
			title: 'Alle',
			subtitle: 'Meine Informationsdienste',
			thumbnail: require('../../assets/images/infodienst3.png')
		},
		{
			aboId: 'abo1',
			title: 'MR',
			subtitle: 'MedizinReport',
			thumbnail: require('../../assets/images/infodienst2.png')
		},
		{
			aboId: 'abo2',
			title: 'CB',
			subtitle: 'ChefärzteBrief',
			thumbnail: require('../../assets/images/infodienst1.png')
		}
	],
	articles: [
		{
			articleId: '1234',
			title: 'Qualität des Operateurs hängt von der Methode ab?',
			category: 'TeamManagement',
			published_on: 'Wednesday, 21 Jul 2019',
			author: 'CB',
			thumbnail: require('../../assets/images/test-article-1.png'),
			content:
				'blablablablalbsdjflskdjfljlksjdglsjdflksjdflksjdflksjdflksjdflksjdflksdjflksdjflskdjflskdjflskdjflsdkjflsdkfjsldkfjlsdkjflskdjflskjdf'
		},
		{
			articleId: '12345',
			title: 'Was tun bei Burnout und innerer Kündigung?',
			category: 'TeamManagement',
			published_on: 'Monday, 02 Mar 2018',
			author: 'MR',
			thumbnail: require('../../assets/images/test-article-2.png'),
			content:
				'blablablablalbsdjflskdjfljlksjdglsjdflksjdflksjdflksjdflksjdflksjdflksdjflksdjflskdjflskdjflskdjflsdkjflsdkfjsldkfjlsdkjflskdjflskjdf'
		}
	]
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_ARTICLE: {
			return {
				...state,
				articles: [...state.articles, action.payload]
			};
		}
	}

	return state;
}

export default rootReducer;
