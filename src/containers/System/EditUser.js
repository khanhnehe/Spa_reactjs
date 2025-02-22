import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as actions from "../../store/actions";

import _ from 'lodash';

class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonemumber: '',
            address: '',
            genderArr: [],
            roleArr: [],
            gender: '',
            role: ''
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        // cách viết 2 let {curentUser} = this.props;
        this.props.getGenderStart();
        this.props.getRoleStart();

        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'harcode',
                firstName: user.firstName,
                lastName: user.lastName,
                phonemumber: user.phonemumber,
                address: user.address,
                gender: user.gender,
                role: user.role

            })
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({ genderArr: this.props.genderRedux });
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({ roleArr: this.props.roleRedux });
        }
    }

    toggle = () => {
        this.props.toggleModalEdit();
    }

    handleOnChangeInput = (event, id) => {
        //đầu tiên ta sẽ tạo 1 bản copy để copy state của we 
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['firstName', 'lastName', 'email', 'password', 'phonemumber', 'address',];
        //dùng vòng for để có thể break dừng lặp đc
        for (let i = 0; i < arrInput.length; i++) {
            // console.log('check inside loop: ', this.state[arrInput[i]], arrInput[i])

            //nếu we ko điền giá trị vào thì ta return = false lun
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }

        }
        return isValid;
    }

    handleSaveUser = () => {
        // mỗi lần ta nhấn save changes thì nó sẽ fire cái hàm checkValidateInput này cho we
        let isValid = this.checkValidateInput();

        //nếu dữ liệu hợp lệ ta call api edit user
        if (isValid === true) {
            this.props.editUser(this.state);
        }

    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;

        //log xem thằng con hướng đc biến currentUser hay ko
        console.log('check props from parent: ', this.props)
        return (
            //truyền isOpen={this.props.isOpen} bây giờ việc mở hay đóng modal nó phụ thuộc vào we
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'Modal-container'}
                size="lg"
                centered
            >

                <ModalHeader toggle={() => this.toggle()}>Edit a user</ModalHeader>
                <ModalBody>
                    <div className='modal-body'>
                        <div className='input-container'>
                            <label>first name: </label>
                            <input type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "firstName") }}
                                //set gía trị cho nó
                                //giá trị ở đây ta sẽ lấy theo state
                                value={this.state.firstName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Last name: </label>
                            <input type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "lastName") }}
                                value={this.state.lastName}
                            ></input>
                        </div>
                        <div className='input-container '>
                            <label>Email: </label>
                            <input type='email'
                                onChange={(event) => { this.handleOnChangeInput(event, "email") }}
                                value={this.state.email}
                                disabled
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Password: </label>
                            <input type='password'
                                onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                value={this.state.password}
                                disabled
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Phone number: </label>
                            <input type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "phonemumber") }}
                                value={this.state.phonemumber}
                            ></input>
                        </div><div className='input-container max-input'>
                            <label>Address: </label>
                            <input type='text'
                                onChange={(event) => { this.handleOnChangeInput(event, "address") }}
                                value={this.state.address}
                            ></input>
                        </div>
                        <div className="input-container">
                            <label className="">Vị trí</label>
                            <select className="form-select "
                                onChange={(event) => { this.handleOnChangeInput(event, "role") }}
                                value={this.state.role}

                            >
                                {roles && roles.length > 0 &&
                                    roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{item.label}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="input-container">
                            <label className="form-label">Giới tính</label>
                            <select
                                className="form-select"
                                onChange={(event) => { this.handleOnChangeInput(event, "gender") }}
                                value={this.state.gender} // Đảm bảo giá trị của select khớp với giá trị trong state
                            >
                                {genders && genders.length > 0 &&
                                    genders.map((item, index) => {
                                        const optionStyle = { color: 'red' }; // Đặt màu chữ ở đây
                                        return (
                                            <option key={index} value={item.key} style={optionStyle}>
                                                {item.label}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-3' color="primary" onClick={() => this.handleSaveUser()}>Save changes</Button>
                    <Button className='px-3' color="secondary" onClick={() => this.toggle()}>Close</Button>
                </ModalFooter>
            </Modal>

        )
    }

}

const mapStateToProps = state => {
    return {
        roleRedux: state.admin.roles,
        genderRedux: state.admin.genders,


    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);







