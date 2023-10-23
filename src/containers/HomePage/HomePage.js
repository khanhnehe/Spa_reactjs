import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import ClinicService from './Section/ClinicService';

class HomePage extends Component {

    render() {

        return (
            <div>
                <HomeHeader />

                <ClinicService />
                <div style={{ height: '300px' }}></div>
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
