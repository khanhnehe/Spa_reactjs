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
import { getDetailSpecialtyById } from '../../../services/userService';
import DetailDoctor from '../Doctor/DetailDoctor';
import _ from 'lodash'
class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // đưa các doctor thuộc gói khám nào vào gói đó arrDoctorId
            arrDoctorId: [],
            dataDetailSpecialty: {}


        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            // hàm của ta truyền 2 tham số là id và location
            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });
            // console.log('check res:', res)
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []

                if (data && !_.isEmpty(res.data)) {
                    let arr = data.staffSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.staffId)

                        })
                    }

                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId
                })
            }
        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {


    }

    handleOnChangeSelect = async (event) => {
        console.log('check onchang', event.target.value)

    }

    render() {

        let { arrDoctorId, dataDetailSpecialty } = this.state;
        console.log('check res:', this.state)

        return (
            <>
                <div className='detail-specialty-container mb-5'>
                    <HomeHeader />
                    <div className='des-specialty px-5 mt-5'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                            &&

                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}>

                            </div>
                        }
                    </div>

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
                </div >


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