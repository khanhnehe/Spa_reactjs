import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageCustomer.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils"
import DatePicker from '../../../components/Input/DatePicker';

class ManageCustomer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: new Date()

        }
    }

    async componentDidMount() {

    }



    async componentDidUpdate(prevProps, prevState, snapshot) {


    }

    handleOnChangeSelect = async (event) => {

    }
    handOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    render() {


        return (
            <>
                <div className='manage-customer-container px-5'>
                    <div className='title mb-5'>Quản lý lịch hẹn của khách hàng</div>
                    <div className='manage-customer-content'>
                        {/* ngày */}
                        <div className='col-2 form-group mb-4'>
                            <label className='text-up'>Chọn ngày</label>
                            <div className="date-picker-container">
                                <DatePicker
                                    className='form-control'
                                    onChange={this.handOnchangeDatePicker}
                                    value={this.state.currentDate}

                                />
                                <i className="fa fa-calendar"></i>
                            </div>
                        </div>
                        <table className="table table-bordered table-hover table-custom">
                            <thead>
                                <tr class="table-primary">
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>John</td>
                                    <td>Doe</td>
                                    <td>john@example.com</td>
                                </tr>
                                <tr>
                                    <td>Mary</td>
                                    <td>Moe</td>
                                    <td>mary@example.com</td>
                                </tr>
                                <tr>
                                    <td>July</td>
                                    <td>Dooley</td>
                                    <td>july@example.com</td>
                                </tr>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCustomer);
