import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils"
import { Modal } from 'reactstrap';
//83
import ProfileDoctor from '../Doctor/ProfileDoctor';
import _ from 'lodash'
//85

import * as actions from '../../../store/actions';
import { postPatientBookingAppointment } from '../../../services/userService';
import { toast } from 'react-toastify'
import DatePicker from '../../../components/Input/DatePicker';
import { selectFilter } from 'react-bootstrap-table2-filter';
import NumberFormat from 'react-number-format';
import moment from 'moment';


class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            email: '',
            phoneNumber: '',
            address: '',
            staffId: '',
            timeType: '',



        }
    }

    async componentDidMount() {

    }

    buildDateBirth = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = item.valueVI;
                object.value = item.keyMap;
                result.push(object)

            })
        }
        return result;
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.dataTime !== prevProps.dataTime) {
            //hiện tại ss quá khứ => lấy hiện tại 
            //ở đây nó chạy sau render khi nó thấy render khác thì nó bắt render lại
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                console.log('chẹck dataTime', this.props.dataTime)
                let staffId = this.props.dataTime.staffId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    staffId: staffId,
                    timeType: timeType,
                })
            }

        }

    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    //87 buil truyền cho nodejs => để có thể lưu
    buildTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = dataTime.timeTypeData.valueVI;

            //cover từ kiểu string sang kiểu date của js
            let date = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY');
            return `${time}  |  ${date}`
        }
        return ''
    }

    buildDoctorName = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let name = `${dataTime.staffData.lastName} ${dataTime.staffData.firstName} `;
            return name
        }
        return ''

    }


    handleConfirmBooking = async () => {
        //validate Input trước 
        //data.email || data.staffId || data.timeType || data.date
        //87
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let staffName = this.buildDoctorName(this.props.dataTime)
        console.log('check staffName:', timeString, staffName)

        let res = await postPatientBookingAppointment({
            fullName: this.state.fullName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            staffId: this.state.staffId,
            timeType: this.state.timeType,
            timeString: timeString,
            staffName: staffName
        })


        if (res && res.errCode === 0) {
            toast.success("Đặt lịch hẹn thành công!")
            this.props.closeModelBooking();
        } else {
            toast.error('Đặt lịch không thành công, vui lòng đặt lại.');
        }

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


        // console.log("data props", this.props)
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
                                    <input className='form-control'
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                    ></input>
                                </div>
                                <div className='col-6 form-group mb-3'>
                                    <label>Email: </label>
                                    <input className='form-control'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    ></input>
                                </div>
                                <div className='col-6 form-group mb-3'>
                                    <label>Số điện thoại: </label>
                                    <input className='form-control'
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                    ></input>
                                </div>
                                <div className='col-12 form-group'>
                                    <label>Địa chỉ: </label>
                                    <input className='form-control'
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                    ></input>
                                </div>

                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking-confirm'
                                onClick={() => this.handleConfirmBooking()}
                            >Xác nhận</button>

                            <button className='btn-booking-cancel'
                                onClick={closeModelBooking}
                            >Hủy</button>

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
