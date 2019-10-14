import { SET_HOME_SCREEN_REFRESHING, TOGGLE_ACTIVE_SUB_FILTER } from '../actions/action-types';

const initialState = {
	homeScreenRefreshing: false, // reset
	activeSubscriptionFilter: undefined // reset
};

/* These values should not be persisted (session) */
function sessionReducer(state = initialState, action) {
	console.log('PAYLOAD:\n', action.payload);
	console.log('TYPE:\n', action.type);
	switch (action.type) {
		case SET_HOME_SCREEN_REFRESHING: {
			return {
				...state,
				homeScreenRefreshing: action.payload
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

export default sessionReducer;
