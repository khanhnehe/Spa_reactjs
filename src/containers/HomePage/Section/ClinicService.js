import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ClinicService.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick"
//import css files'
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getAllSpecialty } from '../../../services/userService';

class ClinicService extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }


    //91
    async componentDidMount() {
        let res = await getAllSpecialty();
        console.log('check specialty', res)
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }

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

        let { dataSpecialty } = this.state;
        return (
            <>
                <div className='Section-Service'>
                    <div className='Service-container'>
                        <span className='Service-title'>DICH VỤ NỔI BẬT</span>
                        <div className='Service-body'>

                            <Slider {...settings}>
                                {dataSpecialty && dataSpecialty.length > 0 &&
                                    dataSpecialty.map((item, index) => {
                                        return (
                                            <div className='Service-custom' key={index}>
                                                {/* <div className='bg-image1' /> */}
                                                <div className='Service-custom-down'>
                                                    <div className='text-one'>{item.name}</div>
                                                    <div className='gia'>Giá: {item.price} VND</div>
                                                    <div className='time'><i className="fa fa-stethoscope"></i>
                                                        1 lần | 60 phút</div>
                                                    <button>Đặt ngay</button>
                                                </div>
                                            </div>
                                        )
                                    })}



                                {/* <div className='Service-custom'>
                                    <div className='bg-image5' />
                                    <div className='Service-custom-down'>
                                        <div className='text-one'>Meso trẻ hóa vùng cổ Fusion F XFC</div>
                                        <div className='gia'>Giá: 500.000 VND</div>
                                        <div className='time'><i className="fa fa-stethoscope"></i>
                                            1 lần | 60 phút</div>
                                        <button className='btn-custom'>Đặt ngay</button>
                                    </div>
                                </div> */}


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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicService);
