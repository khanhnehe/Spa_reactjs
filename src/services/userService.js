import axios from "../axios"
//cần tạo from data cho nó thì nó mới truyền đc email, password
const handleLoginApi = (userEmail, userPassword) => {
    // trong function này ta cần gọi đến cái server nodejs của we
    // để gọi đc ta cần dùng 1 cái pakage bên phía client để gửi 1 cái request lên phía server
    //pakage tên là axios

    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUsers = (inputId) => {
    //template string
    return axios.get(`api/get-all-users?id=${inputId}`);

}

const createNewUserService = (data) => {
    console.log('check data from service: ', data);
    return axios.post(`/api/post-create-new-user`, data);
}

const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user`, {
        data: {
            id: userId
        }
    })
}

const editUserService = (inputData) => {
    return axios.put(`/api/put-edit-user`, inputData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctor`)
}

const saveDetailDoctor = (data) => {
    return axios.post(`/api/save-info-doctor`, data);

}

const getDetailInforDoctor = (inputId) => {
    // console.log('check data detail doctor from service: ', inputId);
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}


const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);

}
//75
const getScheduleByDate = (staffId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?staffId=${staffId}&date=${date}`);

}
//81
const getExtraDoctorInforById = (staffId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?staffId=${staffId}`);
}
const getProfileDoctorById = (staffId) => {
    return axios.get(`/api/get-profile-doctor-by-id?staffId=${staffId}`);
}

const postPatientBookingAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
}
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorService,
    saveDetailDoctor,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleByDate,
    getExtraDoctorInforById,
    getProfileDoctorById,
    postPatientBookingAppointment
}