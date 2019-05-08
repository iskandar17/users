const initialState = {
	data: {},
	ready: false
};

export default function userDetails (state = initialState, action) {
	switch (action.type) {
		case 'SELECTED_USER':
			return Object.assign({}, state, action.payload);
		default:
			return state;
	}
};
