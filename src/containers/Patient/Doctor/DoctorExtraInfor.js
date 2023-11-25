import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils"
import { getExtraDoctorInforById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            extraInfor: {}

        }
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraDoctorInforById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraDoctorInforById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }

    }

    handleOnChangeSelect = async (event) => {

    }

    render() {
        let { extraInfor, } = this.state;
        let { language } = this.props
        console.log('check state: ', this.state)

        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <span className="text-price">Giá dịch vụ:

                        <span className='ms-1 text-price-child'>
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI
                                && <NumberFormat
                                    value={extraInfor.priceTypeData.valueVI}
                                    dispatchType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}

                                />}
                        </span>
                    </span>
                    <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
