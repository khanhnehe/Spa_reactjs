import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { createNewUserService } from '../../services/userService';
import './Register.scss';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: ''
        };
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['firstName', 'lastName', 'email', 'password', 'phoneNumber', 'address'];

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                this.setState({ errorMessage: response.errMessage });
            } else {
                alert('Registration successful!');
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);
        }
    }

    handleBackHome = () => {
        this.props.history.push(`/home`);
    }

    render() {
        return (
            <div className="container">
                <div className=" mt-5 register-container">
                    <div className="row justify-content-center p-3 ">
                        <div className="col">
                            <h2 className="text-center register-title">Đăng ký</h2>
                            <form>
                                <div className="form-group mb-3">
                                    <label>Họ:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(event) => this.handleOnChangeInput(event, "lastName")}
                                        value={this.state.lastName}
                                        placeholder="Nhập tên của bạn"

                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Tên:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(event) => this.handleOnChangeInput(event, "firstName")}
                                        value={this.state.firstName}
                                        placeholder="Nhập họ của bạn"

                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        className="form-control mb-3"
                                        onChange={(event) => this.handleOnChangeInput(event, "email")}
                                        value={this.state.email}
                                        placeholder="Nhập địa email của bạn"

                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Mật khẩu:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        onChange={(event) => this.handleOnChangeInput(event, "password")}
                                        value={this.state.password}
                                        placeholder="Nhập mật khẩu"

                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Số điện thoại:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(event) => this.handleOnChangeInput(event, "phoneNumber")}
                                        value={this.state.phoneNumber}
                                        placeholder="Nhập số điện thoại của bạn"

                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Địa chỉ:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(event) => this.handleOnChangeInput(event, "address")}
                                        value={this.state.address}
                                        placeholder="Nhập địa chỉ của bạn"

                                    />
                                </div>
                                <form className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-dark  mt-2 register-btn"
                                        onClick={this.handleAddNewUser}
                                    > Đăng ký</button>
                                </form>
                            </form>
                        </div>
                    </div>
                    <div className="mt-3 text-center text-primary  back-home" onClick={this.handleBackHome}>
                        Quay lại trang chủ
                    </div>

                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        userRegistrationStatus: state.user.registrationStatus,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        createNewUser: (data) => dispatch(actions.createNewUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
