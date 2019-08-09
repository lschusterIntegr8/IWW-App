import { ADD_ARTICLE } from '../actions/action-types';

const initialState = {
	articles: ['this is a test article', 'test2']
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