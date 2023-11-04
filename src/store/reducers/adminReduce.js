import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    // thêm cái trường này để phân biêt khi nào API của ta đc gọi xong
    //xem như 1 trường dùng để đánh dấu
    isLoadingGender: false,
    users: [],
    topDoctor: []

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            // console.log('fire FETCH GENDER START: ', action)
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            // console.log('fire FETCH_GENDER_SUCCESS: ', state)
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_FAILED:
            // console.log('fire FETCH_GENDER_FAILED: ', action)
            state.isLoadingGender = false;
            state.genders = [];

            return {
                ...state,
            }

        //postion
        // case actionTypes.FETCH_POSITION_START:
        //     console.log('fire FETCH POSITION START: ', action)
        //     return {
        //         ...state,
        //     }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            // console.log('fire FETCH_POSITION_SUCCESS: ', state)
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_FAILED:
            // console.log('fire FETCH_POSITION_FAILED: ', action)
            state.positions = [];

            return {
                ...state,
            }

        //role
        // case actionTypes.FETCH_ROLE_START:
        //     console.log('fire FETCH ROLE START: ', action)
        //     return {
        //         ...state,
        //     }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            // console.log('fire FETCH_ROLE_SUCCESS: ', state)
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_FAILED:
            // console.log('fire FETCH_ROLE_FAILED: ', action)
            state.roles = [];

            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            console.log('FETCH_ALL_USER_SUCCESS', action)
            state.users = action.users;

            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = [];

            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            //action này là biến của thằng redux kéo lên trên coi
            //action này giúp ta truy cập vào giá trị  
            state.topDoctor = action.dataDoctor;

            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctor = [];

            return {
                ...state,
            }



        default:
            return state;
    }
}

export default adminReducer;