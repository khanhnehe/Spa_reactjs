import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from "../../../utils"
import './Userredux.scss'

import * as actions from "../../../store/actions";
import TableManageUser from '../Admin/TableManageUser'
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            //59 luư user
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            role: '',
            position: '',
            gender: '',


        }
    }
    //kiểu get API -- firre actions


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
    // firre actions
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

    }
    //prevProps dùng so sánh props hiện tại và props sắp tới 
    componentDidUpdate(prevProps, preState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArr: arrGender,
                //check nếu có arrGender và arrGender > 0 thì lấy phần tử đầy tiên tức key đầu tiên
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : ''
            })


        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : ''
            })
        }

        //set rỗng 
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                role: '',
                position: '',
                gender: '',
            })
        }

    }
    //v59 lưu user

    onChangeInput = async (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = await event.target.value;

        this.setState({
            ...copyState
        }, () => {
            console.log("check state: ", this.state)
        })
    }


    //validate
    checkValiDateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'address',
            'phoneNumber']


        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert(arrCheck[i] + ' là bắt buộc');
                break;
            }
        }
        return isValid;
    }



    handleSaveUser = () => {
        let isValid = this.checkValiDateInput();
        //nếu = false thoát khỏi hàm này
        if (isValid === false) return;

        //== true => thì ta fire redux action

        this.props.createNewUser({
            //trong đây ta cần truyền biến data
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonemumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
        })
        this.props.fetchAllUserRedux()

    }

    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;

        let isLoadingGender = this.props.isLoadingGender;
        // console.log('check props genderRedux: ', this.state)

        let { email, password, firstName, lastName, address,
            phoneNumber, role, position, gender } = this.state;

        return (
            <>
                <div className='redux-container'>
                    <div className='title'>
                        <FormattedMessage id='manage-user.user' />
                    </div>
                    {/* check isLoadingGender */}
                    <div className="user-body" >
                        <div className='container col-6'>
                            <div className='row mt-4 '>
                                <div className="p-0 border-big rounded-2">
                                    <div className="border-user p-2 mb-2 rounded-top-2">
                                        {/* <div>{isLoadingGender === true ? 'Loading genders' : ''}</div> */}
                                        <div className='text-user col-12 text-light'><FormattedMessage id='manage-user.add' />
                                        </div>
                                    </div>

                                    <div className='row px-3 p-2'>
                                        <div className="col-md-6 ">
                                            <label ><FormattedMessage id='manage-user.email' /></label>
                                            <input type="email" className="form-control"
                                                value={email}
                                                onChange={(event) => { this.onChangeInput(event, "email") }} />
                                        </div>
                                        <div className="col-md-6">
                                            <label ><FormattedMessage id='manage-user.pass' /></label>
                                            <input type="password" className="form-control"
                                                value={password}
                                                onChange={(event) => { this.onChangeInput(event, "password") }} />
                                        </div>
                                    </div>

                                    <div className='row px-3 p-2'>
                                        <div className="col-md-6">
                                            <label ><FormattedMessage id='manage-user.first' /></label>
                                            <input type="text" className="form-control"
                                                value={firstName}
                                                onChange={(event) => { this.onChangeInput(event, "firstName") }} />
                                        </div>

                                        <div className="col-md-6">
                                            <label ><FormattedMessage id='manage-user.last' /></label>
                                            <input type="text" className="form-control" id="inputPassword4"
                                                value={lastName}
                                                onChange={(event) => { this.onChangeInput(event, "lastName") }} />
                                        </div>
                                    </div>

                                    <div className="group px-3 p-2">
                                        <label ><FormattedMessage id='manage-user.address' /></label>
                                        <input type="text" className="form-control"
                                            value={address}
                                            onChange={(event) => { this.onChangeInput(event, "address") }} />
                                    </div>

                                    <div className="col-md-6 px-3">
                                        <label className="form-label"><FormattedMessage id='manage-user.phone' /></label>
                                        <input type="text" className="form-control"
                                            value={phoneNumber}
                                            onChange={(event) => { this.onChangeInput(event, "phoneNumber") }} />
                                    </div>

                                    <div className='row px-3 p-2'>
                                        <div className="col-md-3 pt-2">
                                            <label className="form-label"><FormattedMessage id='manage-user.role' /></label>
                                            <select className="form-select "
                                                onChange={(event) => { this.onChangeInput(event, "role") }}>
                                                {roles && roles.length > 0 &&
                                                    roles.map((item, index) => {
                                                        return (
                                                            // <option key={index}>{item.valueVI}</option>
                                                            <option key={index} value={item.key}>
                                                                {language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        {/* <div className="col-md-3">
                                    <label className="form-label"><FormattedMessage id='manage-user.position' /></label>
                                    <select className="form-select "
                                        onChange={(event) => { this.onChangeInput(event, "position") }}>
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    // <option key={index}>{item.valueVI}</option>
                                                    <option key={index} value={item.key}>
                                                        {language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div> */}
                                        <div className="col-md-3 pt-2">
                                            <label className="form-label"><FormattedMessage id='manage-user.gender' /></label>
                                            <select className="form-select"
                                                onChange={(event) => { this.onChangeInput(event, "gender") }}>
                                                {genders && genders.length > 0 &&
                                                    genders.map((item, index) => {
                                                        return (
                                                            // <option key={index}>{item.valueVI}</option>
                                                            <option key={index} value={item.key}>
                                                                {language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                                        )
                                                    })
                                                }

                                            </select>
                                        </div>
                                    </div>

                                    <button type="button" className="b-user text-light btn px-3 ms-3 mt-3 mb-3"
                                        onClick={() => this.handleSaveUser()}
                                    ><FormattedMessage id='manage-user.btn' /></button>


                                </div>

                            </div>
                        </div>

                    </div>

                    <div className=' row mt-4 mb-5'>
                        <div className='row col-1 me-3'></div>

                        <div className='row col-10'><TableManageUser /></div>
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
        listUsers: state.admin.users

    };
};

//bắt buộc dùng dispatch
const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
