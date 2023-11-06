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

import { changeLanguageApp } from '../../store/actions/'


class HomeHeader extends Component {

    changeLanguage = (language) => {
        //fire redux event: actions
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        //biến language này lấy từ trong redux lấy ở dưới ra á nhe chứ ko truyền từ cha sang con
        let language = this.props.language;

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-line'></div>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <img src={logo} className="header-logo" />
                        </div>

                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.homepage" /></b></div>
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
                                <div><b>Bảng giá</b></div>
                            </div>

                            <div className='child-content'>
                                <div><b>Liên hệ</b></div>
                            </div>

                        </div>
                        <div className='right-content'>
                            {/* check nếu nn của app là tiếng việt thì nó chạy cái class language-vi action, ko là tiếng việt chạy class language-vi thui */}
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI</span></div>

                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {

        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
