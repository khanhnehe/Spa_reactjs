import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageStaff.scss'
import Select from 'react-select';
import { LANGUAGES } from "../../../utils"
import { getDetailInforDoctor } from '../../../services/userService';

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];

const mdParser = new MarkdownIt();

class ManageStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctor: []

        };
    }



    componentDidMount() {
        this.props.fetchAllDoctor();

    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let language = this.props.language;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVI = `${item.lastName} ${item.firstName}`;
                let labelEN = `${item.lastName} ${item.firstName}`;
                object.label = language === LANGUAGES.VI ? labelVI : labelEN;
                object.value = item.id;
                result.push(object);
            })

        }

        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                listDoctor: dataSelect
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        this.props.saveInfoDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            staffId: this.state.selectedOption.value
        })
        console.log('check state:', this.state)

    }

    handleChangeSelect = async selectedOption => {
        // console.log('check: ',  )
        this.setState({ selectedOption });

        let res = await getDetailInforDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            //set lại giá trị đã có
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
            })

        }
        console.log(`check res :`, res);
    };

    handleChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        let language = this.props.language;

        console.log('check state', this.state)
        return (
            <div className='manage-staff-container mb-5'>
                <div className='title mt-4 '>
                    Tạo thêm thông tin cho nhân viên
                </div>
                <div className='more-infor row px-5 mt-5 mb-5'>
                    <div className='content-left col-4 form-group'>
                        <label className='text-up'>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                        />

                    </div>
                    <div className='content-right col'>
                        <label className='text-up'>Thông tin giới thiệu</label>
                        <textarea className='form-control' rows='4'
                            value={this.state.description}
                            onChange={(event) => this.handleChangeDesc(event)}
                        >
                            abc
                        </textarea>
                    </div>
                </div>
                <div className='manage-staff-editor px-5 mt-3'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.description}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className='save-markdown text-light font-weight-bold' type='button'>Lưu thông tin</button>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctor: state.admin.allDoctor,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveInfoDetailDoctor: (data) => dispatch(actions.saveInfoDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageStaff);
