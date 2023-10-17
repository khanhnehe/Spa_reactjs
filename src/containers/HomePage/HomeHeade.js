import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/bia.png'

class HomeHeader extends Component {

    render() {

        return (
            <>
                <div className='home-header-container'>
                    {/* <img src={logo} /> */}

                    <div className='home-header-line'></div>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='header-logo'></div>
                        </div>

                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b>Trang chủ</b></div>
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
                            <div><b>VN</b><i className="fas fa-caret-down"></i></div>
                        </div>
                    </div>
                    <div className='home-header-banner'>

                        <div className='search'>
                            <i className='fas fa-search'></i>
                            <input type='text' placeholder='tìm kiếm'></input>
                        </div>
                        <div className='options'></div>

                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
