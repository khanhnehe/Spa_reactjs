import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";

import { handleLoginApi } from "../../services/userService";

class Login extends Component {
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
    //hàm cập nhật lại biến state
    //bên trong là cái biến bạn muốn setState
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangeInputPassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    //trước khi gọi cái hàm handleLoginApi ấy thì ta cần setState tức ta sẽ clear những mã lỗi mà ta có trước đó
    this.setState({
      errMessage: ''

    })
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message
        })
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user)
        console.log('login successful')
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message

          })
        }
      }
      console.log('test thu', error.response)
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
                  value={this.state.username}
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
                    onChange={(event) =>
                      this.handleOnChangeInputPassword(event)
                    }
                  >
                  </input>
                  <span onClick={() => { this.handleShowHidePass(); }}>
                    <i class={this.state.isShowPassword ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                  </span>

                </div>
              </div>

              <div className="col-md-12" style={{ color: 'red' }}>
                {this.state.errMessage}
              </div>
              <div>
                <button type="button" className="col-md-12 login-btn mt-4 ms-5 text-light"
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

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),

    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
