import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { createNewUserService } from '../../services/userService';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: ''
        };
    }

    handleOnChangeInputUserName = (event) => {
        this.setState({
            username: event.target.value,
        });
    };

    handleOnChangeInputPassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    handleRegister = async () => {
        // Before calling the createNewUserService function, clear any previous error messages.
        this.setState({
            errMessage: ''
        });

        try {
            // Dispatch the createNewUser action
            await this.props.createNewUser({
                username: this.state.username,
                password: this.state.password
            });

            // Check the user registration status
            const { userRegistrationStatus } = this.props;
            if (userRegistrationStatus === 'success') {
                // If successful registration, navigate or handle as needed
                console.log('Registration successful');
            } else {
                // If there's an error, set the error message in the state.
                this.setState({
                    errMessage: 'Registration failed. Please try again.'
                });
            }
        } catch (error) {
            // Handle errors from the API or network.
            console.error('Error during registration:', error);
            this.setState({
                errMessage: 'An error occurred during registration. Please try again.'
            });
        }
    };

    render() {
        return (
            <>
                <div className="Register-background">
                    <div className="Register-container">
                        <div className="Register-content row p-4 p3">
                            <div className="col-md-12  Register-title text-center ">Register</div>

                            <div className="col-md-12 Register-input form-group">
                                <label className="">Username:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    value={this.state.username}
                                    onChange={(event) => this.handleOnChangeInputUserName(event)}
                                ></input>
                            </div>

                            <div className="col-md-12 Register-input form-group mt-4">
                                <label className="">Password:</label>
                                <div className="custom-input-pas">
                                    <input
                                        type={this.state.isShowPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={(event) => this.handleOnChangeInputPassword(event)}
                                    >
                                    </input>
                                    <span onClick={() => { this.handleShowHidePass(); }}>
                                        <i className={this.state.isShowPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                    </span>

                                </div>
                            </div>

                            <div className="col-md-12" style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                            <div>
                                <button type="button" className="col-md-12 Register-btn mt-4 ms-5 text-light"
                                    onClick={() => {
                                        this.handleRegister();
                                    }}>
                                    Register
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        userRegistrationStatus: state.user.registrationStatus,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        createNewUser: (data) => dispatch(actions.createNewUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
