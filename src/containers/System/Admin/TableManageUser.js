import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import ReactPaginate from 'react-paginate';
import './TableManageUser.scss'
class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
            currentPage: 0,
            itemsPerPage: 5,
        };
    }

    componentDidMount() {
        this.props.fetchAllUserRedux();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers,
            });
        }
    }

    handleDeleteUser = (user) => {
        this.props.fetchDeleteUser(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user);
    }

    handlePageChange = (selectedPage) => {
        this.setState({
            currentPage: selectedPage.selected,
        });
    };

    render() {
        const { userRedux, currentPage, itemsPerPage } = this.state;

        const offset = currentPage * itemsPerPage;
        const currentUsers = userRedux.slice(offset, offset + itemsPerPage);

        return (
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
                            {currentUsers && currentUsers.length > 0 &&
                                currentUsers.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phonemumber}</td>
                                            <td>{user.address}</td>
                                            <td>
                                                <button className='btn-edit '
                                                    onClick={() => this.handleEditUser(user)}
                                                ><i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete'
                                                    onClick={() => this.handleDeleteUser(user)}
                                                ><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>

                </div>
                <div className='Paginate'>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={Math.ceil(userRedux.length / itemsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageChange}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                    />
                </div>
            </div>
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
