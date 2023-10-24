import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ClinicService.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick"
//import css files'
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Carouse from '../Carouse'


class ClinicService extends Component {

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
                {/* <Carouse /> */}

                <div className='Section-Service'>
                    <div className='Service-container'>
                        <span className='Service-title'>DICH VỤ NỔI BẬT</span>
                        <div className='Service-body'>

                            <Slider {...settings}>
                                <div className='Service-custom'>
                                    <div className='bg-image1' />
                                    <div className='Service-custom-down'>
                                        <div className='text-one'>Giảm cân bằng </div>
                                        <div className='gia'>Giá: 500.000 VND</div>
                                        <div className='time'><i className="fa fa-stethoscope"></i>
                                            1 lần | 60 phút</div>
                                        <button>Đặt ngay</button>
                                    </div>


                                </div>
                                <div className='Service-custom'>
                                    <div className='bg-image2' />
                                    <div className='Service-custom-down'>
                                        <div className='text-one'>Combo Meso Mụn & Lấy Mụn 3in1</div>
                                        <div className='gia'>Giá: 500.000 VND</div>
                                        <div className='time'><i className="fa fa-stethoscope"></i>
                                            1 lần | 60 phút</div>
                                        <button>Đặt ngay</button>
                                    </div>

                                </div>
                                <div className='Service-custom'>
                                    <div className='bg-image3' />
                                    <div className='Service-custom-down'>
                                        <div className='text-one'>Triệt Lông 1/2 Chân (Bảo Hành 5 Năm)</div>
                                        <div className='gia'>Giá: 500.000 VND</div>
                                        <div className='time'><i className="fa fa-stethoscope"></i>
                                            1 lần | 60 phút</div>
                                        <button>Đặt ngay</button>
                                    </div>


                                </div>
                                <div className='Service-custom'>
                                    <div className='bg-image4' />
                                    <div className='Service-custom-down'>
                                        <div className='text-one'>Trẻ Hóa Da Bằng IPL</div>
                                        <div className='gia'>Giá: 500.000 VND</div>
                                        <div className='time'><i className="fa fa-stethoscope"></i>
                                            1 lần | 60 phút</div>
                                        <button>Đặt ngay</button>
                                    </div>


                                </div>
                                <div className='Service-custom'>
                                    <div className='bg-image5' />
                                    <div className='Service-custom-down'>
                                        <div className='text-one'>Meso trẻ hóa vùng cổ Fusion F XFC</div>
                                        <div className='gia'>Giá: 500.000 VND</div>
                                        <div className='time'><i className="fa fa-stethoscope"></i>
                                            1 lần | 60 phút</div>
                                        <button className='btn-custom'>Đặt ngay</button>
                                    </div>


                                </div>
                                <div className='Service-custom'>
                                    <div className='bg-image6' />
                                    <div className='Service-custom-down'>
                                        <div className='text-one'>Thư Giãn Toàn Thân Với Đá Nóng</div>
                                        <div className='gia'>Giá: 500.000 VND</div>
                                        <div className='time'><i className="fa fa-stethoscope"></i>
                                            1 lần | 60 phút</div>
                                        <button>Đặt ngay</button>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicService);
