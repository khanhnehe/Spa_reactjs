import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
  }

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
                ></input>
              </div>

              <div className="col-md-12 login-input form-group mt-4">
                <label className="">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                ></input>
              </div>

              <div>
                <button
                  type="button"
                  className="col-md-12 login-btn mt-4 ms-5 text-light"
                >
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
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
