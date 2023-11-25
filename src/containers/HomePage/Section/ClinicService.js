import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ClinicService.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router';
import DetailSpecialty from '../../Patient/Specialty/DetailSpecialty';

class ClinicService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        };
    }

    // Danh sách đường dẫn cố định và tên lớp CSS của ảnh
    fixedPaths = [
        { path: "/detail-specialty/1", image: "bg-image1" },
        { path: "/detail-specialty/2", image: "bg-image2" },
        { path: "/detail-specialty/3", image: "bg-image3" },
        { path: "/detail-specialty/4", image: "bg-image4" },
        { path: "/detail-specialty/5", image: "bg-image5" },
        { path: "/detail-specialty/6", image: "bg-image6" },
        // Thêm các đường dẫn và ảnh khác nếu cần
    ];

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : [],
            });
        }
    }

    handleViewDetailSpecialty = (item, path) => {
        if (this.props.history) {
            this.props.history.push(`${path}`);
        }
    };

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
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
                                        const { path, image } = this.fixedPaths[index] || {};
                                        return (
                                            <div className='Service-custom' key={index}
                                                onClick={() => this.handleViewDetailSpecialty(item, path)}
                                            >
                                                <div className={image} />
                                                <div className='Service-custom-down'>
                                                    <div className='text-one'>{item.name}</div>
                                                    <div className='gia'>Giá: {item.price} VND</div>
                                                    <div className='time'>
                                                        <i className="fa fa-stethoscope"></i> 1 lần | 60 phút
                                                    </div>
                                                    <button onClick={() => this.handleViewDetailSpecialty(item, path)}>
                                                        Đặt ngay
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ClinicService));
