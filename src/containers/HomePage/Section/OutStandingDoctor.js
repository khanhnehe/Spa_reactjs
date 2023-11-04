import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutStandingDoctor.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick"

import * as actions from "../../../store/actions";




class ClinicOutStandingDoctor extends Component {
    componentDidMount() {
        this.props.loadTopDoctor();

    }


    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // netArrow: <SampleNextArrow/>,
            // prevArrow: <SamplePervArrow/>
        };


        return (
            <>
                <div className='Section-OutStandingDoctor'>
                    <div className='OutStandingDoctor-container'>
                        <span className='OutStandingDoctor-title'>BÁC SĨ NỔI BẬT</span>
                        <div className='OutStandingDoctor-body'>

                            <Slider {...settings}>
                                <div className='OutStandingDoctor-custom'>
                                    <div className='outer-bg'>
                                        <div className='bg-image2' />
                                    </div>                                    <div className='position text-center'>
                                        <div className='text-one'>Bác sĩ 1</div>
                                        <div>da liễu</div>
                                    </div>


                                </div>
                                <div className='OutStandingDoctor-custom'>
                                    <div className='outer-bg'>
                                        <div className='bg-image2' />
                                    </div>                                    <div className='position text-center'>
                                        <div className='text-one'>Bác sĩ 1</div>
                                        <div>da liễu</div>
                                    </div>


                                </div>
                                <div className='OutStandingDoctor-custom'>
                                    <div className='outer-bg'>
                                        <div className='bg-image2' />
                                    </div>
                                    <div className='position text-center'>
                                        <div className='text-one'>Bác sĩ 1</div>
                                        <div>da liễu</div>
                                    </div>

                                </div>
                                <div className='OutStandingDoctor-custom'>
                                    <div className='outer-bg'>
                                        <div className='bg-image2' />
                                    </div>                                    <div className='position text-center'>
                                        <div className='text-one'>Bác sĩ 1</div>
                                        <div>da liễu</div>
                                    </div>


                                </div>
                                <div className='OutStandingDoctor-custom'>
                                    <div className='outer-bg'>
                                        <div className='bg-image2' />
                                    </div>                                    <div className='position text-center'>
                                        <div className='text-one'>Bác sĩ 1</div>
                                        <div>da liễu</div>
                                    </div>


                                </div>
                                <div className='OutStandingDoctor-custom'>
                                    <div className='outer-bg'>
                                        <div className='bg-image2' />
                                    </div>                                    <div className='position text-center'>
                                        <div className='text-one'>Bác sĩ 1</div>
                                        <div>da liễu</div>
                                    </div>
                                </div>


                            </Slider>
                        </div>
                    </div >

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
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicOutStandingDoctor);
