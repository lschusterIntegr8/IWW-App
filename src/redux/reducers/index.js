import { ADD_ARTICLE } from '../actions/action-types';

const initialState = {
	articles: ['this is a test article', 'test2']
};

function rootReducer(state = initialState, action) {
	alert(`Received ${action.type} --> ${action.payload}`);
	if (action.type === ADD_ARTICLE) {
		return Object.assign({}, state, {
			articles: state.articles.concat(action.payload)
		});
	}

	return state;
}

export default rootReducer;
