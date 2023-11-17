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
            // save to Markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctor: [],
            hasOldData: false,
            //78 save to staff_infor table
            listPrice: [],
            listPayment: [],
            note: ''

        };
    }



    componentDidMount() {
        this.props.fetchAllDoctor();
        //78
        this.props.getRequiredDoctorInfor()

    }
    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let language = this.props.language;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVI = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVI;
                let labelEN = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueEN;
                object.label = language === LANGUAGES.VI ? labelVI : labelEN;
                object.value = item.id;
                result.push(object);
            })

        }

        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            //phải truyền cho nó 1 cái type ko sẽ bị undefine
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS')
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

        //78

        if (prevProps.allRequireDoctorInfor !== this.props.allRequireDoctorInfor) {
            // console.log('get data redux', this.props.allRequireDoctorInfor)
            let { resPrice, resPayment } = this.props.allRequireDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice)
            let dataSelectPayment = this.buildDataInputSelect(resPayment)
            console.log('get data new', dataSelectPrice, dataSelectPayment)

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment
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
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
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
        // console.log('check state', this.state)
        return (
            <div className='manage-staff-container mb-5'>
                <div className='title mt-4 '>
                    Tạo thêm thông tin cho nhân viên
                </div>
                <div className='more-infor row px-5 mt-5 mb-5'>
                    <div className='content-left col-4 form-group'>
                        <label className='text-up'>Chọn nhân viên</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                            placeholder={'Chọn bác sĩ'}
                        />

                    </div>
                    <div className='content-right col'>
                        <label className='text-up'>Thông tin giới thiệu</label>
                        <textarea className='form-control' rows='4'
                            value={this.state.description}
                            // onChange={(event) => this.handleChangeDesc(event)}
                            placeholder={'Nhập thông tin vào...'}
                        >
                        </textarea>
                    </div>
                </div>
                {/* thêm tạo tt */}
                <div className='row staff-infor-extra'>
                    <div className='col-3 form-group ms-5'>
                        <label>Chọn giá</label>
                        <Select
                            // value={this.state.selectedOption}
                            // onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placeholder={'Chọn giá dịch vụ'}
                        />                    </div>
                    < div className='col-4 form-group'>
                        <label>Chọn phương thức thanh toán</label>
                        <Select
                            // value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            placeholder={'Chọn phương thức thanh toán'}
                        />
                    </div>
                    < div className='col-4 form-group'>
                        <label>Note</label>
                        <input className='form-control'></input>

                    </div>

                </div>

                <div className='manage-staff-editor px-5 mt-3'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
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
        //78
        allRequireDoctorInfor: state.admin.allRequireDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveInfoDetailDoctor: (data) => dispatch(actions.saveInfoDetailDoctor(data)),
        //78
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageStaff);
