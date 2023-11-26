import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import Carouse from './Carouse'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'

import icon from '../../assets/images/iconclinic.png'
import logo from '../../assets/images/q222.png'
import iconwaxing from '../../assets/images/iconwaxxing.png'
import iconweight from '../../assets/images/iconweight.png'
import iconrelax from '../../assets/images/iconrelax.png'
import iconfiller from '../../assets/images/iconfiller2.png'
import { withRouter } from 'react-router';

import { changeLanguageApp } from '../../store/actions/'

import _ from 'lodash'

import * as actions from "../../store/actions";
import { USER_ROLE } from "../../utils/constant"
import { adminMenu, doctorMenu } from '../../containers/Header/menuApp';
class HomeHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // là cai menu render khi we chạy app 
            menuApp: [],
            isDropdownOpen: false,

        }
    }

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

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    };

    toggleDropdown = () => {
        this.setState((prevState) => ({
            isDropdownOpen: !prevState.isDropdownOpen,
        }));
    };

    handleLogin = () => {
        this.props.history.push('/login');

    }

    render() {
        //biến language này lấy từ trong redux lấy ở dưới ra á nhe chứ ko truyền từ cha sang con
        const { language, userInfo } = this.props;
        const { isDropdownOpen } = this.state;

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-line'></div>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <img src={logo} className="header-logo"
                                onClick={() => this.returnToHome()} />
                        </div>

                        <div className='center-content'>
                            <div className='child-content'>
                                <div onClick={() => this.returnToHome()}><b><FormattedMessage id="homeheader.homepage" /></b></div>
                            </div>
                            <div className='child-content dropdown'>
                                <div className="service-label"><b>Dịch vụ</b><i className="fas fa-caret-down"></i></div>
                                <ul className="service-options">
                                    <li>Dịch vụ da liễu</li>
                                    <li>Triệt lông Diode Laser</li>
                                    <li>Giảm béo body</li>
                                    <li>Thư giãn & chăm sóc</li>
                                    <li>Dịch vụ thẩm mỹ</li>
                                </ul>
                            </div>

                            <div className='child-content'>
                                <div><b>Giới thiệu</b></div>
                            </div>

                            <div className='child-content'>
                                <div><b>Liên hệ</b></div>
                            </div>

                        </div>
                        <div className='right-content'>
                            {/* check nếu nn của app là tiếng việt thì nó chạy cái class language-vi action, ko là tiếng việt chạy class language-vi thui */}
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI</span></div>

                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>

                            <div className="dropdown" onClick={this.toggleDropdown}>
                                <div className="btn btn-login" title="Login">
                                    <i class="fa fa-user" aria-hidden="true"></i>                                </div>
                                {isDropdownOpen && (
                                    <div className="dropdown-content">
                                        <div className="dropdown-item">Hello  {userInfo && userInfo.firstName ? userInfo.firstName : ''} !

                                        </div>
                                        <div className="dropdown-item" onClick={this.handleLogin}>
                                            <i className="fas fa-sign-out-alt"></i>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
                {/* <Carouse /> */}
                {/* 69 */}
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title'><FormattedMessage id="banner.title" /></div>

                            <div className='search'>
                                <i className='fas fa-search'></i>
                                <input type='text' placeholder='tìm kiếm'></input>
                            </div>
                        </div>

                        <div className='content-down'>
                            <div className='options'>
                                <div className='options-child'>
                                    <img src={icon} className="icon-child"></img>
                                    <div className='text-child'>Dich vụ da liễu</div>
                                </div>
                                <div className='options-child'>
                                    <img src={iconwaxing} className="icon-child"></img>
                                    <div className='text-child'>Triệt lông Diode Laser</div>
                                </div>
                                <div className='options-child'>
                                    <img src={iconweight} className="icon-child"></img>
                                    <div className='text-child'>Giảm béo body</div>
                                </div>
                                <div className='options-child'>
                                    <img src={iconrelax} className="icon-child"></img>
                                    <div className='text-child'>Thư giãn & chăm sóc</div>
                                </div>
                                <div className='options-child'>
                                    <img src={iconfiller} className="icon-child"></img>
                                    <div className='text-child'>Dịch vụ thẩm mỹ</div>
                                </div>

                            </div>
                        </div>

                    </div>
                }
                {/* <div className='home-header-line-down'></div> */}
            </React.Fragment >);
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

        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));