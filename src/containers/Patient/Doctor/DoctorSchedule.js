import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from 'moment';
import localization from "moment/locale/vi"
import { LANGUAGES } from "../../../utils"
import { getScheduleByDate } from '../../../services/userService';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailableTime: []
        }
    }

    async componentDidMount() {
        let { language } = this.props;

        moment.locale('vi', localization); // Đặt locale cho tiếng Việt

        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            object.label = moment(new Date()).add(i, 'days').format("dddd - DD/MM");
            object.value = moment(new Date()).add(i, 'days').startOf("day").valueOf();

            allDays.push(object)
        }

        this.setState({
            allDays: allDays
        })
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let staffId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleByDate(staffId, date)

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
    }

    render() {
        let { allDays, allAvailableTime } = this.state;
        let { language } = this.props;

        return (
            <div className='Doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {allDays && allDays.length > 0 &&
                            allDays.map((item, index) => (
                                <option value={item.value} key={index}>{item.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calendar my-3'>
                        <span><i className="fa fa-calendar"> ĐẶT LỊCH HẸN</i></span>
                    </div>
                    <div className='time-content'>
                        {allAvailableTime && allAvailableTime.length > 0 ?
                            allAvailableTime.map((item, index) => {
                                let timeDisplay = item.timeTypeData.valueVI;

                                return (
                                    <button key={index}>{timeDisplay}</button>
                                );
                            })
                            :
                            <div className='text-down'>Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác. </div>
                        }
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
