import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import ClinicService from './Section/ClinicService';
import HandBook from './Section/HandBook'


class HomePage extends Component {

    render() {

        return (
            <div>
                <HomeHeader />

                <ClinicService />
                <div style={{ height: '120px' }}></div>

                <HandBook />
                <div style={{ height: '150px' }}></div>



            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
