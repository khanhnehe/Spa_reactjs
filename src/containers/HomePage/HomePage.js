import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import ClinicService from './Section/ClinicService';
import HandBook from './Section/HandBook'
import About from "./Section/About"
import HomeFooter from './HomeFooter';
import PriceList from './Section/PriceList'
import './HomeHeader.scss';


class HomePage extends Component {

    render() {

        return (
            <div>
                <HomeHeader />

                <ClinicService />
                <div style={{ height: '170px' }}></div>

                {/* 
                <PriceList />
                <div style={{ height: '350px' }}></div> */}


                <HandBook />
                <div style={{ height: '380px' }}></div>

                <About />
                <div style={{ height: '200px' }}></div>

                <HomeFooter />
                <div style={{ height: '' }}></div>





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
