import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils"
import { Modal } from 'reactstrap';
//83
import ProfileDoctor from '../Doctor/ProfileDoctor';
import _ from 'lodash'
    ;

class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentDidMount() {

    }



    async componentDidUpdate(prevProps, prevState, snapshot) {


    }

    handleOnChangeSelect = async (event) => {

    }

    render() {

        // toggle={}
        //dataTime lấy tuè bên doctorSchedule
        let { isOpenModal, closeModelBooking, dataTime } = this.props;
        //83

        let staffId = '';

        if (dataTime && !_.isEmpty(dataTime)) {
            staffId = dataTime.staffId
        }
        //cach 2 let staffId = dataTime && !_.isEmpty(dataTime) ? dataTime.staffId : '';


        console.log("data props", this.props)
        return (
            <>
                <Modal isOpen={isOpenModal}
                    className={'booking-modal-container'}
                    size='lg'
                    centered
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>ĐẶT LỊCH HẸN</span>
                            <span className='right'
                                //đóng modal
                                onClick={closeModelBooking}
                            ><i className='fas fa-times'></i></span>
                        </div>
                        <div className='booking-modal-body'>
                            {/* {JSON.stringify(dataTime)} */}
                            <div className='doctor-infor'>
                                <ProfileDoctor
                                    staffId={staffId}
                                    //truyền qua bên profileDoctor
                                    dataTime={dataTime}
                                />
                            </div>
                            {/* <div className='price'> 500.000 VND</div> */}
                            <div className='row mt-3'>
                                <div className='col-6 form-group mb-3'>
                                    <label>Họ tên: </label>
                                    <input className='form-control'></input>
                                </div>
                                <div className='col-6 form-group mb-3'>
                                    <label>Email: </label>
                                    <input className='form-control'></input>
                                </div>
                                <div className='col-6 form-group mb-3'>
                                    <label>Số điện thoại: </label>
                                    <input className='form-control'></input>
                                </div>
                                <div className='col-6 form-group mb-3'>
                                    <label>Năm sinh: </label>
                                    <input className='form-control'></input>
                                </div>
                                <div className='col-12 form-group'>
                                    <label>Địa chỉ: </label>
                                    <input className='form-control'></input>
                                </div>

                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking-confirm'>Xác nhận</button>

                            <button className='btn-booking-cancel'>Hủy</button>

                        </div>

                    </div>

                </Modal>
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
