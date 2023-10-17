import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';

class HomeHeader extends Component {

    render() {

        return (
            <div className='home-header-container'>
                <div className='home-header-child'></div>

                <div className='home-header-content'>
                    <div className='left-content'>
                        <i className="fas fa-bars"></i>
                        <div className='header-logo'></div>
                    </div>


                    <div className='center-content'>
                        <div className='child-content'>
                            <div><b>Trang chủ</b></div>
                        </div>
                        <div className='child-content'>
                            <div><b>Dịch vụ</b></div>
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
            </div>
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
