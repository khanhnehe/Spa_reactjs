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
            genderArr: [],
            roleArr: [],
            positionArr: [],

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
        this.props.getPositionStart();
        this.props.getRoleStart();

    }

    //prevProps dùng so sánh props hiện tại và props sắp tới 
    componentDidUpdate(prevProps, preState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,

            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,

            })

        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,

            })
        }
    }
    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;

        let isLoadingGender = this.props.isLoadingGender;
        console.log('check props genderRedux: ', this.state)

        return (
            <>
                <div className='redux-container'>
                    <div className='title'>
                        <FormattedMessage id='manage-user.user' />
                    </div>

                    {/* check isLoadingGender */}


                    <div className="user-body" >
                        <div className='container col-8'>
                            <div className='row mt-4 p-2'>
                                <div>{isLoadingGender === true ? 'Loading genders' : ''}</div>

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
                            <div className="col-md-6 p-2">
                                <label className="form-label"><FormattedMessage id='manage-user.phone' /></label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className='row p-2'>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id='manage-user.role' /></label>
                                    <select className="form-select " name="roleId">
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    // <option key={index}>{item.valueVI}</option>
                                                    <option key={index}>
                                                        {language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id='manage-user.position' /></label>
                                    <select className="form-select " name="">
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    // <option key={index}>{item.valueVI}</option>
                                                    <option key={index}>
                                                        {language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                                )
                                            })
                                        }
                                    </select>
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

                            <button type="submit" className="btn btn-primary ms-2 mt-2"><FormattedMessage id='manage-user.btn' /></button>
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
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
    };
};

//bắt buộc dùng dispatch
const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
