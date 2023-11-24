import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import Header from "../containers/Header/Header"
import ManageStaff from '../containers/System/Admin/ManageStaff'
//90
import ManageSpecialty from '../containers/System/Spacialty/ManageSpecialty';
class System extends Component {
    render() {

        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <>
                {/* {this.props.isLoggedIn && <Header />} ko cần  dùng this.props vì ta đã khai ở trên nhìn để ý xíu */}

                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            {/* .lấy link bên menu app  */}
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            {/* 66 */}
                            {/* 71 */}
                            <Route path="/system/manage-staff" component={ManageStaff} />
                            {/* 90 */}
                            <Route path="/system/manage-specialty" component={ManageSpecialty} />

                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
