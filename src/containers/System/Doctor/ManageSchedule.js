import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils"
//chọn ngày
import DatePicker from '../../../components/Input/DatePicker';
// format date
import moment from 'moment';


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
                data = data.map(item => ({ ...item, isSelected: 'false' }))

            }
            this.setState({
                rangeTime: this.props.allScheduleTime
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

    render() {

        // console.log('check state:', this.state);
        // console.log('check props:', this.props);

        let rangeTime = this.state.rangeTime

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
                                        minDate={new Date()}

                                    />
                                    <i className="fa fa-calendar"></i>
                                </div>
                            </div>

                            <div className='col-12 pick-hour-container mt-5'>
                                {rangeTime && rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button className='btn btn-schedule' key={index}>
                                                {item.valueVI}</button>
                                        )
                                    })}
                            </div>
                            <div className='col-12'>
                                <button
                                    className='btn btn-schedule mt-3' type='button'>Lưu thông tin</button>
                            </div>
                        </div>

                    </div>
                </div>
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
