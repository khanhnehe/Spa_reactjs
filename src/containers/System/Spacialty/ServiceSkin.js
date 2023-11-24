import React, { Component } from 'react';
import { connect } from "react-redux";
import './ServiceSkin.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils"

class ServiceSkin extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentDidMount() {

    }



    async componentDidUpdate(prevProps, prevState, snapshot) {


    }

    handleOnChangeSelect = async (event) => {

    }

    render() {


        return (
            <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ServiceSkin);
