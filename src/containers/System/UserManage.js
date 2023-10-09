import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import ModalUser from './ModalUser';
import './UserManage.scss';

//kiểu import 1 function
import { getAllUsers } from '../../services/userService';
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

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    //ở đây ta truyền props và function vào thằng con ModalUser
                    //props của thằng con là state của thằng cha
                    isOpen={this.state.isOpenModalUser}
                    toggleModal={this.toggleUserModal}
                />
                <div className="title">Manage user with khanh </div>
                <div className='ms-3'>
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}
                    ><i className="fas fa-plus"></i>  Add new user</button>
                </div>
                <div className='users-table mt-4 mx-3 ms-3'>
                    <table id="customers">
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
                                        <button className='btn-delete'><i className="fas fa-trash"></i></button>

                                    </td>
                                </tr>
                            )
                        })
                        }
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
