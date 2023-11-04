import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



class About extends Component {

    render() {


        return (
            <>
                <div className='Section-About'>
                    <div className='About-header'>Video giới thiệu về chúng tôi</div>
                    <div className='About-content'>
                        <div className='content-left'>
                            <iframe width="60%" height="400"
                                src="https://www.youtube.com/embed/XehooD6HYwI"
                                title='youtube video player'
                                frameBorder='0'
                            ></iframe>
                        </div>
                        <div className='content-right'></div>
                    </div>
                </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
