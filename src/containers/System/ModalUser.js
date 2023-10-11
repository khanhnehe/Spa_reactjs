import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonemumber: '',
            address: ''

        }

    }
    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleModal();
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
        //
        let isValid = true
        let arrInput = ['firstName', 'lastName', 'email', 'password', 'phonemumber', 'address'];
        //dùng vòng for để có thể break dừng lặp đc
        for (let i = 0; i < arrInput.length; i++) {
            console.log('check inside loop: ', this.state[arrInput[i]], arrInput[i])

            //nếu we ko điền giá trị vào thì ta return = false lun
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;

            }

        }
        return isValid;
    }

    handleAddNewUser = () => {
        // mỗi lần ta nhấn Add new thì nó sẽ fire cái hàm checkValidateInput này cho we
        let isValid = this.checkValidateInput();

        //nếu dữ liệu hợp lệ ta call api create modal
        if (isValid === true) {
            this.props.createNewUser(this.state);
        }

    }

    render() {

        return (
            //truyền isOpen={this.props.isOpen} bây giờ việc mở hay đóng modal nó phụ thuộc vào we
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'Modal-container'}
                size="lg"
                centered
            >

                <ModalHeader toggle={() => this.toggle()}>Create a new user</ModalHeader>
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
                            ></input>
                        </div>
                        <div className='input-container'>
                            <label>Password: </label>
                            <input type='password'
                                onChange={(event) => { this.handleOnChangeInput(event, "password") }}
                                value={this.state.password}
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
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-3' color="primary" onClick={() => this.handleAddNewUser()}>Add new</Button>
                    <Button className='px-3' color="secondary" onClick={() => this.toggle()}>Close</Button>
                </ModalFooter>
            </Modal>

        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);







