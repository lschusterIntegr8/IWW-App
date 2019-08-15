import { ADD_ARTICLE } from '../actions/action-types';

const initialState = {
	articles: [
		{
			articleId: '1234',
			title: 'Qualität des Operateurs hängt von der Methode ab?',
			category: 'TeamManagement',
			published_on: 'Wednesday, 21 Jul 2019',
			author: 'CB',
			thumbnail: require('../../assets/images/test-article-1.png')
		},
		{
			articleId: '12345',
			title: 'Was tun bei Burnout und innerer Kündigung?',
			category: 'TeamManagement',
			published_on: 'Monday, 02 Mar 2018',
			author: 'MR',
			thumbnail: require('../../assets/images/test-article-2.png')
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
