import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import Carouse from './Carouse'
import { FormattedMessage } from 'react-intl';

import icon from '../../assets/iconclinic.png'
import logo from '../../assets/q222.png'
import iconwaxing from '../../assets/iconwaxxing.png'
import iconweight from '../../assets/iconweight.png'
import iconrelax from '../../assets/iconrelax.png'
import iconfiller from '../../assets/iconfiller2.png'


class HomeHeader extends Component {

    render() {
        console.log('check props: ', this.props)

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
                            <div className='child-content'>
                                <div><b>Dịch vụ</b><i className="fas fa-caret-down"></i></div>
                            </div>

                            <div className='child-content'>
                                <div><b>Giới thiệu</b></div>
                            </div>

                            <div className='child-content'>
                                <div><b>Liên hệ</b></div>
                            </div>

                        </div>
                        <div className='right-content'>
                            {/* <i className="fas fa-caret-down"></i> */}
                            <div className='language'>
                                <div className='language-vi active'><b>VI</b></div>
                            </div>
                            <div className='language'>
                                <div className='language-en active'><b>EN</b></div>
                            </div>
                        </div>
                    </div>
                    {/* <Carouse /> */}

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
                                    <div className='text-child'>Dich vụ phòng khám</div>
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
                                    <div className='text-child'>Tiêm filler</div>
                                </div>

                            </div>
                        </div>

                    </div>
                    {/* <div className='home-header-line-down'></div> */}
                </div>
            </React.Fragment>);
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
