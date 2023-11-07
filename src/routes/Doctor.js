import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from "../containers/Header/Header"
import ManageSchedule from '../containers/System/Doctor/ManageSchedule';
class Doctor extends Component {
    render() {

        const { isLoggedIn } = this.props;
        return (
            <>
                {/* {this.props.isLoggedIn && <Header />} ko cần  dùng this.props vì ta đã khai ở trên nhìn để ý xíu */}

                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/doctor/manage-schedule" component={ManageSchedule} />

                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
