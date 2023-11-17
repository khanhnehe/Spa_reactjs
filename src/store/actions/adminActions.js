import actionTypes from "./actionTypes";
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopDoctorHomeService,
    getAllDoctorService, saveDetailDoctor, getDetailInforDoctor

} from '../../services/userService';
import { toast } from "react-toastify";


// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })


            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                // console.log('check getState:', getState())
                dispatch(fetchGenderSuccess(res.data))
            }
            else {
                dispatch(fetchGenderFailed())
            }

        } catch (e) {
            dispatch(fetchGenderFailed())
            console.log("fetchGenderStart error", e)
        }
    }

};


export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData

})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})

//POSITION
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                // console.log('check getState:', getState())
                dispatch(fetchPositionSuccess(res.data))
            }
            else {
                dispatch(fetchPositionFailed())
            }

        } catch (e) {
            dispatch(fetchPositionFailed())
            console.log("fetchPositionFailed error", e)
        }
    }

};

//ROLE
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                // console.log('check getState:', getState())
                dispatch(fetchRoleSuccess(res.data))
            }

            else {
                dispatch(fetchRoleFailed())
            }

        } catch (e) {
            dispatch(fetchRoleFailed())
            console.log("fetchRoleFailed error", e)
        }
    }

}

//CRAETE USER
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await createNewUserService(data);
            console.log('check create user redux: ', res)
            console.log('check getState:', getState())

            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
                toast.success("Tạo mới người dùng thành công!");

            }

            else {
                dispatch(saveUserFailed())
            }

        } catch (e) {
            dispatch(saveUserFailed())
            console.log("saveUserFailed error", e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
})


//60 ALL USER, 63
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            // let resOne = await getTopDoctorHomeService(3);
            // console.log('check response getTopDoctor: ', resOne)
            if (res && res.errCode === 0) {
                // console.log('check getState:', getState())
                //res.users mở network lên vào xem nó truyền gì thì truyền đó
                //đảo mảng lại
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            }
            else {
                dispatch(fetchAllUserFailed())
            }

        } catch (e) {
            dispatch(fetchAllUserFailed())
            console.log("fetchAllUserFailed error", e)
        }
    }

};
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    //là data ta lấy từ api về 
    users: data
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})


//DELETE
//datanayf chính là cái id user mà ta cần xóa
export const fetchDeleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {

                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
                toast.success("Xóa người dùng thành công!");
            }
            else {
                dispatch(deleteUserFailed())
                toast.error("Xóa người dùng thất bại!");

            }

        } catch (e) {
            dispatch(deleteUserFailed())
            console.log("saveUserFailed error", e)
        }
    }

};
export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})


//EDIT
export const EditUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {

                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
                toast.success("Edit người dùng thành công!");
            }
            else {
                dispatch(editUserFailed())
                toast.error("Edit người dùng thất bại!");

            }

        } catch (e) {
            dispatch(editUserFailed())
            console.log("editUserFailed error", e)
        }
    }

};
export const editUserSuccess = (data) => ({
    type: actionTypes.EDIT_USER_SUCCESS,

})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})


//LOAD TOP DOCTOR
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('20');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctor: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_SUCCESS: ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED
            })

        }
    }
}

//get All doctor 67
export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataGetDoctor: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTOR_SUCCESS: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED
            })

        }
    }
}

//SAVE INFORMATION DOCTOR
export const saveInfoDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctor(data);
            if (res && res.errCode === 0) {
                toast.success("Lưu thông tin thành công!")

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS

                })
            } else {
                console.log('error res', res)
                toast.error("Lưu thông tin ko  thành công!")

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (e) {
            toast.error("Lưu thông tin không thành công!")
            console.log('SAVE_DETAIL_DOCTOR_FAILED: ', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })

        }
    }
}

//get detail doctor
export const getDetailDoctor = (inputId) => {
    return async (dispatch) => {
        try {
            let res = await getDetailInforDoctor(inputId);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS

                })
            } else {
                dispatch(getDetailDoctorFailed());
            }
        } catch (e) {
            console.log('GET_DETAIL_DOCTOR_FAILED: ', e);
            dispatch(getDetailDoctorFailed());
        }
    };
}

export const getDetailDoctorSuccess = (data) => {
    return {
        type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS,
        payload: data, // Truyền dữ liệu chi tiết bác sĩ vào payload
    };
}


export const getDetailDoctorFailed = () => {
    return {
        type: 'GET_DETAIL_DOCTOR_FAILED',
    };
};


//71 giờ đặt lịch
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_SCHEDULE_TIME_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_SCHEDULE_TIME_FAILED
            })

        }
    }
}

//78 function này sẽ get các info của doctor
export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START
            })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");

            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data
                }
                dispatch(fetchRequiredDoctorSuccess(data))
            }
            else {
                dispatch(fetchRequiredDoctorFailed())
            }

        } catch (e) {
            dispatch(fetchRequiredDoctorFailed())
            console.log("fetchRequiredDoctorFailed error", e)
        }
    }

};


export const fetchRequiredDoctorSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData

})

export const fetchRequiredDoctorFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
})