import React, { Component } from "react";
import { handleLoginApi } from "../../services/userService";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            isShowPassword: false,
        };
    }

    handleOnChangeInputUserName = (event) => {
        //hàm cập nhật lại biến state
        //bên trong là cái biến bạn muốn setState
        this.setState({
            userName: event.target.value,
        });
    };

    handleOnChangeInputPassword = (event) => {
        this.setState({
            password: event.target.value,
        });
    };

    handleLogin = async () => {
        console.log(
            "userName: ",
            this.state.userName,
            "password: ",
            this.state.password
        );
        console.log("all state: ", this.state);
        try {
            await handleLoginApi(this.state.username, this.state.password);

        } catch (e) {
            console.log(e);
        }
    };

    handleShowHidePass = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };

    render() {
        //JSX
        return (
            <>
                <div className="login-background">
                    <div className="login-container">
                        <div className="login-content row p-4 p3">
                            <div className="col-md-12  login-title text-center ">Login</div>

                            <div className="col-md-12 login-input form-group">
                                <label className="">Username:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    value={this.state.userName}
                                    onChange={(event) => this.handleOnChangeInputUserName(event)}
                                ></input>
                            </div>

                            <div className="col-md-12 login-input form-group mt-4">
                                <label className="">Password:</label>
                                <div className="custom-input-pas">
                                    <input
                                        type={this.state.isShowPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={(event) => this.handleOnChangeInputPassword(event)}
                                    ></input>
                                    <span
                                        onClick={() => {
                                            this.handleShowHidePass();
                                        }}>
                                        <i class={this.state.isShowPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="col-md-12 login-btn mt-4 ms-5 text-light"
                                    onClick={() => {
                                        this.handleLogin();
                                    }}>
                                    login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
