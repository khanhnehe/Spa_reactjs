import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils"
import HomeHeader from '../../HomePage/HomeHeader';
import { withRouter } from 'react-router';

//93
import NumberFormat from 'react-number-format';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {

            arrDoctorId: [8, 10, 11]


        }
    }

    async componentDidMount() {

    }



    async componentDidUpdate(prevProps, prevState, snapshot) {


    }

    handleOnChangeSelect = async (event) => {

    }

    render() {

        let { arrDoctorId } = this.state;
        return (
            <>
                <div className='detail-specialty-container mb-5'>
                    <HomeHeader />
                    <div className='des-specialty'></div>
                    <div className='specialty-content px-5'>
                        {arrDoctorId && arrDoctorId.length > 0 &&
                            arrDoctorId.map((item, index) => {
                                return (
                                    <div className='each-doctor' key={index}
                                    >
                                        <div className='content-left'>
                                            <ProfileDoctor
                                                staffId={item}
                                            // dataTime={dataTime}
                                            />

                                        </div>
                                        <div className='content-right'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}

                                            />

                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                            />

                                        </div>
                                    </div>

                                )
                            })}
                    </div>
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
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty));
