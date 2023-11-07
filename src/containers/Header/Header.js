import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
//71
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
//language
import { LANGUAGES, USER_ROLE } from "../../utils/constant"
import { FormattedMessage } from 'react-intl';
import _ from 'lodash'


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // là cai menu render khi we chạy app 
            menuApp: []
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    //71 phân quyền ngdung
    componentDidMount() {
        let userInfo = this.props.userInfo;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;

            }
            if (role === USER_ROLE.STAFF) {
                menu = doctorMenu;

            }
        }

        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        // console.log('check userInfo: ', userInfo)

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className='languages'>
                    <span className='welcome'>
                        <FormattedMessage id="homeheader.welcome" />
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''} !
                    </span>
                    <span className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VN</span>

                    <span className={language === LANGUAGES.EN ? "language-en active" : "language-en"}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,


    };
};


const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
