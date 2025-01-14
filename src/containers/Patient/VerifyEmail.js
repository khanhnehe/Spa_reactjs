import React, { Component } from 'react';
import { connect } from "react-redux";
import './VerifyEmail.scss'
import { FormattedMessage } from 'react-intl';
import { postVerifyBookingAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';


class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusVerify: false,
            errCode: 0

        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let staffId = urlParams.get('staffId');
            let res = await postVerifyBookingAppointment({
                token: token,
                staffId: staffId
            });

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                });
            }
            else {
                this.setState({
                    statusVerify: false,
                    errCode: res && res.errCode ? res.errCode : -1,
                });
            }
        }
    }



    handleOnChangeSelect = async (event) => {

    }

    render() {
        let { statusVerify, errCode } = this.state;


        return (
            <>
                <HomeHeader />

                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div>
                            loading ...
                        </div>
                        :
                        <div>
                            {+errCode === 0 ?
                                <div className='infor-booking'> xác minh lịch hẹn thành công</div>
                                :
                                <div className='infor-booking'>Lịch hẹn khôgn tồn tại hoặc đã được xác nhận!</div>

                            }
                        </div>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
