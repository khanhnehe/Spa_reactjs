import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ClinicService.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick"
//import css files'
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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
                <div className='Section-Service'>
                    <div className='Service-container'>
                        <span className='Service-title'>Dịch vụ nổi bật</span>
                        <div className='Service-body'>

                            <Slider {...settings}>
                                <div className='Service-custom'>
                                    <div className='bg-image1' />
                                    <div>Nặn mụn chuẩn y khoa</div>
                                    <div>Đặt lịch ngay</div>

                                </div>
                                <div className='Service-custom'>
                                    <div className='bg-image2' />
                                    <div>Combo Meso Mụn & Lấy Mụn 3in1</div>
                                    <div>Đặt lịch ngay</div>

                                </div>
                                <div className='Service-custom'>
                                    <div className='bg-image3' />
                                    <div>Triệt Lông 1/2 Chân (Bảo Hành 5 Năm)</div>
                                    <div>Đặt lịch ngay</div>

                                </div>
                                <div className='Service-custom'>
                                    <div className='bg-image4' />
                                    <div>Trẻ Hóa Da Bằng IPL</div>
                                    <div>Đặt lịch ngay</div>

                                </div>
                                <div className='Service-custom'>
                                    <div className='bg-image5' />
                                    <div>Meso trẻ hóa vùng cổ Fusion F XFC</div>
                                    <div>Đặt lịch ngay</div>

                                </div>
                                <div className='Service-custom'>
                                    <div className='bg-image6' />
                                    <div>Thư Giãn Toàn Thân Với Đá Nóng</div>
                                    <div>Đặt lịch ngay</div>

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
