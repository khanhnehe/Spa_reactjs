import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from "../../../utils"

import * as actions from "../../../store/actions";


class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: []

        }
    }

    //kiểu get API
    // async componentDidMount() {
    //     try {
    //         let res = await getAllCodeService('gender')
    //         if (res && res.errCode === 0) {
    //             this.setState({
    //                 // . data vì ta trả ra data
    //                 genderArr: res.data
    //             })
    //         }
    //         console.log('check res gender', res)
    //     } catch (e) {
    //     }
    // }


    //kiểu Redux
    async componentDidMount() {
        this.props.getGenderStart();

    }

    //prevProps dùng so sánh props hiện tại và props sắp tới 
    componentDidUpdate(prevProps, preState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
    }
    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        console.log('check props genderRedux: ', this.props.genderRedux)

        return (
            <>
                <div className='redux-container'>
                    <div className='title'>
                        <FormattedMessage id='manage-user.user' />
                    </div>
                    <div className="user-body" >
                        <div className='container col-8'>
                            <div className='row mt-4 p-2'>
                                <div className='col-md-12 p-2'><FormattedMessage id='manage-user.add' /></div>
                                <div className="col-md-6">
                                    <label ><FormattedMessage id='manage-user.email' /></label>
                                    <input type="email" className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label ><FormattedMessage id='manage-user.pass' /></label>
                                    <input type="password" className="form-control" />
                                </div>
                            </div>
                            <div className='row p-2'>
                                <div className="col-md-6">
                                    <label ><FormattedMessage id='manage-user.first' /></label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-6">
                                    <label ><FormattedMessage id='manage-user.last' /></label>
                                    <input type="text" className="form-control" id="inputPassword4" />
                                </div>
                            </div>
                            <div className="group p-2">
                                <label ><FormattedMessage id='manage-user.address' /></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className='row p-2'>
                                <div className="col-md-6">
                                    <label className="form-label"><FormattedMessage id='manage-user.role' /></label>
                                    <select className="form-select " name="roleId">
                                        <option value="1">Admin</option>
                                        <option value="2">Bác sĩ</option>
                                        <option value="3">Bệnh nhân</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label"><FormattedMessage id='manage-user.position' /></label>
                                    <select className="form-select " name="">
                                        <option value="1">Admin</option>
                                        <option value="2">Bác sĩ</option>
                                        <option value="3">Bệnh nhân</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row p-2'>
                                <div className="col-md-6">
                                    <label className="form-label"><FormattedMessage id='manage-user.phone' /></label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id='manage-user.gender' /></label>
                                    <select className="form-select" name="gender">
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    // <option key={index}>{item.valueVI}</option>
                                                    <option key={index}>
                                                        {language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary ms-2 "><FormattedMessage id='manage-user.btn' /></button>
                        </div>
                    </div>

                </div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

//bắt buộc dùng dispatch
const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
