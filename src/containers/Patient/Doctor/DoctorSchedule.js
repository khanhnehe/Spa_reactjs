import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import localization from "moment/locale/vi"
import { LANGUAGES } from "../../../utils"
import { getScheduleByDate } from '../../../services/userService';
import BookingModal from '../Modal/BookingModal'
class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailableTime: [],
            //81
            isOpenModalBooking: false,
            //ta lưu time chọn trong state
            //truyền cục data này sang bên trong modal của we
            dataScheduleTimeModal: {}
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        this.setState({
            allDays: allDays
        })

        // moment.locale('vi', localization); // Đặt locale cho tiếng Việt

        // let allDays = []
        // for (let i = 0; i < 7; i++) {
        //     let object = {};
        //     object.label = moment(new Date()).add(i, 'days').format("dddd - DD/MM");
        //     object.value = moment(new Date()).add(i, 'days').startOf("day").valueOf();

        //     allDays.push(object)
        // }

        // this.setState({
        //     allDays: allDays
        // })
    }

    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay -${ddMM}`;
                    object.label = today;

                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd- DD/MM');
                    object.label = labelVi;
                }

            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today -${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd- DD/MM');

                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays
            })
        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }

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

    //thời gian mà ta click 81
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time

        })
    }

    //đóng modal
    closeModelBooking = () => {
        this.setState({
            isOpenModalBooking: false,
        })

    }

    render() {
        let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleTimeModal } = this.state;
        let { language } = this.props;

        return (
            <>
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
                        <div className='time-content-up'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className='time-content'>
                                        {allAvailableTime.map((item, index) => {
                                            let timeDisplay = language === LANGUAGES.VI ?
                                                item.timeTypeData.valueVI : item.timeTypeData.valueEN;

                                            return (
                                                <button key={index}
                                                    onClick={() => this.handleClickScheduleTime(item)}

                                                >{timeDisplay}</button>
                                            );
                                        })}
                                    </div>
                                </>

                                :
                                <div className='text-down'>Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác. </div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isOpenModalBooking}
                    closeModelBooking={this.closeModelBooking}
                    dataTime={dataScheduleTimeModal}

                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
