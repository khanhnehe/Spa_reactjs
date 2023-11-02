import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";

class TableManageUser extends Component {
    //constructor là hàm tạo và we khởi tạo 1 cái state 
    //nói cách khác là những cái biến  mà ta muốn dùng vs thằng class này thì we dùng từ khóa 'this, this ở đây là class này đấy(TableManageUser ) 
    constructor(props) {
        super(props);
        this.state = {
            //arr luư trữ các giá trị của thằng user của we lấy từ trong con Redux về
            userRedux: [],
        }
    }

    async componentDidMount() {
        //fire redux để cho nó lấy dữ liệu =>đi định nghĩa action đi
        this.props.fetchAllUserRedux()

        //để hứng thằng này ta xuốnng hàm máptateToProps làm
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // check nếu có sự thay đổi củ cái biến listUsers ta nhận đc từ props
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.fetchDeleteUser(user.id)
    }
    
    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user)

    }
    render() {
        let arrUser = this.state.userRedux

        return (


            <>
                <div className="users-container">
                    <div className='users-table mt-4 mx-3 ms-3'>
                        <div className='text-table'>DANH SÁCH NGƯỜI DÙNG</div>
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
                                {arrUser && arrUser.length > 0 &&
                                    arrUser.map((item, index) => {
                                        return (
                                            <tr key={index} >
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phonemumber}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <button className='btn-edit '
                                                        onClick={() => this.handleEditUser(item)}
                                                    ><i className="fas fa-pencil-alt"></i></button>
                                                    <button className='btn-delete'
                                                        onClick={() => this.handleDeleteUser(item)}
                                                    ><i className="fas fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        )
                                    })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </>


        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {

        fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
        fetchDeleteUser: (id) => dispatch(actions.fetchDeleteUser(id))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
