import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from './DoctorSchedule';

//dùng để điều hướng

class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {}

        }


    }

    async componentDidMount() {
        //check trong biến match phải có thằng params và trong params phaỉ có id
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data

                })
            }
            console.log('check doctor infor: ', res);
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        //69
        console.log('check state detail: ', this.state)
        let language = this.props.language;
        let detailDoctor = this.state.detailDoctor
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVI}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEN},  ${detailDoctor.lastName} ${detailDoctor.firstName}`;
        }


        return (
            <>
                <HomeHeader
                    isShowBanner={false}
                />
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'>
                            <div className='img-custom'>
                                <div className='bg-image' />
                            </div>
                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                                {detailDoctor.Markdown && detailDoctor.Markdown.description
                                    && <span>
                                        {detailDoctor.Markdown.description}
                                    </span>}
                            </div>
                        </div>

                    </div>
                    {/* 75 schedule-doctor */}
                    <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                                doctorIdFromParent={detailDoctor
                                    && detailDoctor.id ? detailDoctor.id : -1} />
                        </div>
                        <div className='content-right'></div>
                    </div>
                    <div className='detail-intor-doctor'>
                        {detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }} />
                        )}
                    </div>

                    <div className='comment-doctor'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
