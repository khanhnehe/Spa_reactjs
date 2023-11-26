import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { createNewUserService } from '../../services/userService';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonemumber: '',
            address: ''
        };
    }

    handleOnChangeInput = (event, id) => {
        //đầu tiên ta sẽ tạo 1 bản copy để copy state của we 
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }


    checkValidateInput = () => {
        //
        let isValid = true
        let arrInput = ['firstName', 'lastName', 'email', 'password', 'phonemumber', 'address'];
        //dùng vòng for để có thể break dừng lặp đc
        for (let i = 0; i < arrInput.length; i++) {
            console.log('check inside loop: ', this.state[arrInput[i]], arrInput[i])

            //nếu we ko điền giá trị vào thì ta return = false lun
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
                alert('thành công');

            }
        } catch (e) {
            console.log(e)

        }
    }


    handleAddNewUser = () => {
        // mỗi lần ta nhấn Add new thì nó sẽ fire cái hàm checkValidateInput này cho we
        let isValid = this.checkValidateInput();

        //nếu dữ liệu hợp lệ ta call api create modal
        if (isValid === true) {
            this.props.createNewUser(this.state);
        }

    }

    handleBackHome = () => {
        this.props.history.push(`/home`);

    }
    render() {

        return (
            <>
                <div className="Register-background">
                    <div className="Register-container">
                        <div className="Register-content row p-4 p3">
                            <div className="col-md-12  Register-title text-center ">Register</div>

                            <div className='modal-body'>
                                <div className='input-container'>
                                    <label>first name: </label>
                                    <input type='text'
                                        onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                        //set gía trị cho nó
                                        //giá trị ở đây ta sẽ lấy theo state
                                        value={this.state.firstName}
                                    />
                                </div>
                                <div className='input-container'>
                                    <label>Last name: </label>
                                    <input type='text'
                                        onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                        value={this.state.lastName}
                                    ></input>
                                </div>
                                <div className='input-container '>
                                    <label>Email: </label>
                                    <input type='email'
                                        onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                        value={this.state.email}
                                    ></input>
                                </div>
                                <div className='input-container'>
                                    <label>Password: </label>
                                    <input type='password'
                                        onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                        value={this.state.password}
                                    ></input>
                                </div>
                                <div className='input-container'>
                                    <label>Phone number: </label>
                                    <input type='text'
                                        onChange={(event) => { this.handleOnChangeInput(event, "phonemumber") }}
                                        value={this.state.phonemumber}
                                    ></input>
                                </div><div className='input-container max-input'>
                                    <label>Address: </label>
                                    <input type='text'
                                        onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                        value={this.state.address}
                                    ></input>
                                </div>
                            </div>
                            <button type="button" className="col-md-12 Register-btn mt-4 ms-5 text-light"
                                onClick={() => {
                                    this.handleAddNewUser();
                                }}>
                                Register
                            </button>
                        </div>

                    </div>
                    <div className="col-md-12 mt-3 text-center text-danger"
                        onClick={() => this.handleBackHome()}
                    >
                        quay lại trang đăng nhập
                    </div>

                </div>
                {this.state.errorMessage && (
                    <div className="error-message">
                        {this.state.errorMessage}
                    </div>
                )}
            </>
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
