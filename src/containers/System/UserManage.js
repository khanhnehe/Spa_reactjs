import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import ModalUser from './ModalUser';
import './UserManage.scss';

//kiểu import 1 function
import { getAllUsers, createNewUserService, deleteUserService } from '../../services/userService';
import { assignWith, reject } from 'lodash';
import { emitter } from '../../utils/emitter';


class UserManage extends Component {
    //constructor là hàm tạo và we khởi tạo 1 cái state 
    //nói cách khác là những cái biến  mà ta muốn dùng vs thằng class này thì we dùng từ khóa 'this, this ở đây là class này đấy(UserManage ) 
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            //mặc định cái modal này sẽ đóng, chỉ khi click vào add user thì nó mới mở == true
            isOpenModalUser: false,
        }
    }
    // lifecycle
    async componentDidMount() {
        await this.getAllUserFromReact()

    }
    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }
    //bản chất thằng toggel sẽ là show và hidde 
    //ta truyền function này qua thằng con
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                //fire event 
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUse = async (user) => {
        console.log('check user delete: ', user)
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode !== 0) {
                alert(res.errMessage)
            }
            else {
                await this.getAllUserFromReact();
            }
        } catch (e) {
            console.log(e)

        }

    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    //ở đây ta truyền props và function vào thằng con ModalUser
                    //props của thằng con là state của thằng cha
                    isOpen={this.state.isOpenModalUser}
                    toggleModal={this.toggleUserModal}
                    createNewUser={this.createNewUser}

                />
                <div className="title">Manage user with khanh </div>
                <div className='ms-3'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    ><i className="fas fa-plus"></i>  Add new user</button>
                </div>
                <div className='users-table mt-4 mx-3 ms-3'>
                    <table id="customers">
                        <tbody>

                            <tr>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Email</th>
                                <th>Phone number</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {/* ta chỉ dùng vòng lặp khi và chỉ ta có biến arrUsers */}
                            {arrUsers && arrUsers.map((item, index) => {
                                // để map() chạy đc cần có return
                                return (
                                    <tr className=''>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phonemumber}</td>
                                        <td>{item.address}</td>

                                        <td>
                                            <button className='btn-edit '> <i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUse(item)}><i className="fas fa-trash"></i></button>

                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
