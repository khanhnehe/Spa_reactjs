import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils"
//chọn ngày
import DatePicker from '../../../components/Input/DatePicker';
// format date
import moment from 'moment';
import { toast } from "react-toastify";
import _ from 'lodash'
//74
import { saveBulkScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listDoctor: [],
            //ob này là label, value
            selectedDoctor: {},
            //new date mặc định nó lấy cái ngày hiện tại cho mk
            currentDate: '',
            rangeTime: []

        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTime();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                //cách 1
                // data.map(item => {
                //     item.isSelected = false;
                //     return item;
                // })

                //cách 2 
                data = data.map(item => ({ ...item, isSelected: false }))

            }
            this.setState({
                rangeTime: data
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let language = this.props.language;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVI = `${item.lastName} ${item.firstName}`;
                let labelEN = `${item.lastName} ${item.firstName}`;
                object.label = language === LANGUAGES.VI ? labelVI : labelEN;
                object.value = item.id;
                result.push(object);
            })

        }

        return result;
    }


    handleChangeSelect = async selectedOption => {
        // console.log('check: ',  )
        this.setState({ selectedDoctor: selectedOption });
    };
    handOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }


    handleClickBtnTime = (time) => {
        let rangeTime = this.state.rangeTime;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Chọn ngày cho lịch hẹn!")
            return;
        }

        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Chọn nhân viên!")
            return;


        }
        //hàm này giúp cover time send
        // let formateDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        // let formateDate = moment(currentDate).unix()

        let formateDate = new Date(currentDate).getTime()
        if (rangeTime && rangeTime.length > 0) {
            // lọc những trường có isSelected === true
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            // console.log('check time', selectedTime)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule, index) => {
                    let object = {};
                    object.staffId = selectedDoctor.value;// value , label
                    object.date = formateDate;
                    object.timeType = schedule.keyMap;
                    result.push(object)

                })


            } else {
                toast.error("Chọn khung giờ cho lịch hẹn!");
                return;

            }
        }
        let res = await saveBulkScheduleDoctor({
            //truyền 3 tham số này cho nodejs
            arrSchedule: result,
            staffId: selectedDoctor.value,
            formateDate: formateDate
        })

        if (res && res.errCode === 0) {
            toast.success("Lưu lịch hẹn thành công")
        }
        else {
            toast.error("Lỗi lưu lịch hẹn!");
            console.log('error saveBulkScheduleDoctor: ', res)
        }


    }
    render() {

        // console.log('check state:', this.state);
        // console.log('check props:', this.props);

        let rangeTime = this.state.rangeTime
        // console.log('check state:', rangeTime);
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))


        return (
            <>
                <div className='manage-schedule-container'>
                    <div className='manage-schedule-title title'>
                        Quản lý lịch hẹn
                    </div>
                    <div className='container'>
                        <div className='row mt-4'>
                            <div className='col-3 form-group'>
                                <label className='text-up'>Chọn nhân viên</label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctor}
                                />
                            </div>
                            <div className='col-2 form-group'>
                                <label className='text-up'>Chọn ngày</label>
                                <div className="date-picker-container">
                                    <DatePicker
                                        className='form-control'
                                        onChange={this.handOnchangeDatePicker}
                                        value={this.state.currentDate}
                                        minDate={yesterday}

                                    />
                                    <i className="fa fa-calendar"></i>
                                </div>
                            </div>

                            <div className='col-12 pick-hour-container mt-5'>
                                {rangeTime && rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button
                                                className={item.isSelected === true ? 'btn btn-schedule active' : "btn-schedule"}
                                                key={index}
                                                onClick={() => this.handleClickBtnTime(item)}
                                            >
                                                {item.valueVI}</button>
                                        )
                                    })}
                            </div>
                            <div className='col-12'>
                                <button
                                    className='btn btn-save-schedule mt-3' type='button'
                                    onClick={() => this.handleSaveSchedule()}
                                >Lưu thông tin</button>
                            </div>
                        </div>

                    </div>
                </div >
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctor: state.admin.allDoctor,
        allScheduleTime: state.admin.allScheduleTime


    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
