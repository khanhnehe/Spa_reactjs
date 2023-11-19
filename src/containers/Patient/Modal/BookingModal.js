import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils"
import { Modal } from 'reactstrap';

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
        let { isOpenModal, closeModelBooking, dataTime } = this.props;
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
                            <div className='doctor-infor'></div>
                            <div className='price'> 500.000 VND</div>
                            <div className='row'>
                                <div className='col-6 form-group mb-3'>
                                    <label>Họ tên: </label>
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
