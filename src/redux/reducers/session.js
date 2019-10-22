import {
	SET_HOME_SCREEN_REFRESHING,
	TOGGLE_ACTIVE_SUB_FILTER,
	SET_ACTIVE_DROPDOWN_ITEM
} from '../actions/action-types';

const initialState = {
	homeScreenRefreshing: false, // reset
	activeSubscriptionFilter: undefined, // reset
	activeDropdownItem: undefined
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
		case SET_ACTIVE_DROPDOWN_ITEM: {
			return {
				...state,
				activeDropdownItem: action.payload
			};
		}
	}

	return state;
}

export default sessionReducer;
