import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from '../../assets/q222.png'


class HomeFooter extends Component {

    render() {


        return (
            <>
                <div className='Section-HomeFooter'>
                    <div className='HomeFooter-up'></div>
                    <div className='HomeFooter'>
                        <div className='footer-content'>
                            <div className='footer-section'>
                                <h3>Liên hệ</h3>
                                <p>Email: example@example.com</p>
                                <p>Điện thoại: 123-456-7890</p>
                            </div>
                            <div className='footer-section'>
                                <ul>
                                    <li> <img src={logo} className="header-logo" />
                                    </li>

                                </ul>
                            </div>
                            <div className='footer-section'>
                                <h3>Follow Us</h3>
                                <i className="icon-twitter-sign"></i>
                            </div>
                        </div>
                        <div className='copyright'>
                            &copy; 2023 Your Company. All Rights Reserved.
                        </div>
                    </div >
                </div>
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
