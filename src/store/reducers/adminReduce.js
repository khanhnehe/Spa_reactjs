import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: []

}


const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('fire FETCH_GENDER_START: ', action)
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state }

            copyState.genders = action.data;
            console.log('fire FETCH_GENDER_SUCCESS: ', copyState)
            return {
                ...copyState,
            }

        case actionTypes.FETCH_GENDER_FAILED:
            console.log('fire FETCH_GENDER_FAILED: ', action)

            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;