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
    return axios.get(`api/get-all-users?id=${inputId}`)

}

export {
    handleLoginApi,
    getAllUsers
}