import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutStandingDoctor.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick"
import { LANGUAGES } from "../../../utils"

import * as actions from "../../../store/actions";




class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: []
        }
    }

    componentDidUpdate(prevProps, preState, snapshot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctor: this.props.topDoctorRedux
            })
        }

    }
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

        console.log('check topDoctorRedux: ', this.props.topDoctorRedux)
        let arrDoctor = this.state.arrDoctor;
        arrDoctor = arrDoctor.concat(arrDoctor).concat(arrDoctor)
        let language = this.props.language;
        return (
            <>
                <div className='Section-OutStandingDoctor'>
                    <div className='OutStandingDoctor-container'>
                        <span className='OutStandingDoctor-title'>BÁC SĨ NỔI BẬT</span>
                        <div className='OutStandingDoctor-body'>

                            <Slider {...settings}>

                                {arrDoctor && arrDoctor.length > 0
                                    && arrDoctor.map((item, index) => {
                                        if (index === 0) {
                                            // console.log('check item', item)
                                        }
                                        let nameVi = `${item.positionData.valueVI}, ${item.lastName} ${item.firstName}`;
                                        let nameEn = `${item.positionData.valueEN},  ${item.lastName} ${item.firstName}`;
                                        return (
                                            <div className='OutStandingDoctor-custom' key={index} >
                                                <div className='outer-bg'>
                                                    <div className='bg-image2' />
                                                </div>
                                                <div className='position text-center'>
                                                    <div className='text-one'>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                    <div>da liễu</div>
                                                </div>


                                            </div>
                                        )
                                    }

                                    )
                                }



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
        topDoctorRedux: state.admin.topDoctor
    };

};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
