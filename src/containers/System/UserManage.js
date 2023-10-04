import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

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


    render() {
        console.log('check render: ', this.state)
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <div className="title">Manage user with khanh </div>
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
