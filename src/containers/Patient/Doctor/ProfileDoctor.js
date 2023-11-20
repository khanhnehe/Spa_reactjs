import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils"
import { getProfileDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataProfile: {}

        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.staffId);
        this.setState({
            dataProfile: data
        });
        console.log('check data', data);
    }


    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            console.log('check res', res)
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.staff !== prevProps.staffId) {
            // this.props.getInforDoctor(this.props.staffId)
        }
    }


    render() {

        let { dataProfile } = this.state;
        let { language } = this.props;
        let nameVI = ''
        if (dataProfile && dataProfile.positionData) {
            nameVI = `${dataProfile.positionData.valueVI}, ${dataProfile.lastName} ${dataProfile.firstName}`;
        }

        return (
            <>
                <div className='profile-doctor-container'>
                    <div className='intro-doctor'>
                        <span className='text-custom'>
                            {nameVI}
                        </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
