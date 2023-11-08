import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from 'moment';
//impoer tiếng việt vào để thằng moment biết mà lần
import localization from "moment/locale/vi"
import { LANGUAGES } from "../../../utils"
import { getScheduleByDate } from '../../../services/userService';


//dùng để điều hướng

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],

        }


    }

    async componentDidMount() {
        let { language } = this.props;

        console.log('moment vi: ', moment(new Date()).format('dddd - DD/MM'));
        console.log('moment en: ', moment(new Date()).locale('en').format("ddd - DD/MM"));

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



    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let staffId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleByDate(staffId, date)
            console.log('check res: ', res)

        }

    }

    render() {

        let allDays = this.state.allDays;
        return (
            <>
                <div className='Doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        //item là giá trị hiển thị
                                        //value giá trị nó là time send
                                        <option value={item.value} key={index}>{item.label}</option>

                                    )
                                })}

                        </select>

                    </div>
                    <div className='all-available-time'></div>
                </div>
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
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
