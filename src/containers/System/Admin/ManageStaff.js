import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageStaff.scss'
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils"
import { getDetailInforDoctor } from '../../../services/userService';
import { toast } from "react-toastify"

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
            selectedPrice: '',
            selectedPayment: '',
            //92
            specialtyId: '',
            listSpecialty: [],
            selectedSpecialty: ''

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
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVI = `${item.lastName} ${item.firstName}`;
                    let labelEN = `${item.lastName} ${item.firstName}`;
                    object.label = language === LANGUAGES.VI ? labelVI : labelEN;
                    object.value = item.id;
                    result.push(object);
                })

            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVI = `${item.valueVI}`;
                    let labelEN = `${item.valueEN}`;
                    object.label = language === LANGUAGES.VI ? labelVI : labelEN;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'PAYMENT') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVI = `${item.valueVI}`;
                    let labelEN = `${item.valueEN}`;
                    object.label = language === LANGUAGES.VI ? labelVI : labelEN;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};
                    //.name bên specialty
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object);
                })
            }

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


        //78

        if (prevProps.allRequireDoctorInfor !== this.props.allRequireDoctorInfor) {
            // console.log('get data redux', this.props.allRequireDoctorInfor)
            let { resPrice, resPayment, resSpecialty } = this.props.allRequireDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY');

            // console.log('get data new', dataSelectPrice, dataSelectPayment)

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listSpecialty: dataSelectSpecialty
            })

        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor, 'USERS')
            let { resPrice, resPayment } = this.props.allRequireDoctorInfor;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            this.setState({
                listDoctor: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
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
        let { hasOldData } = this.state;

        // console.log('check state eContentMarkdown', this.state)
        // return;
        this.props.saveInfoDetailDoctor({

            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            staffId: this.state.selectedOption.value,
            //
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            specialtyId: this.state.selectedSpecialty.value
        })
        // console.log('check state:', this.state)

    }


    //ad 79
    handleChangeSelect = async (selectedOption) => {
        // console.log('check: ',  )
        this.setState({ selectedOption });
        //80 lấy ra payment và price fill vào infor
        let { listPayment, listPrice, listSpecialty } = this.state;


        let res = await getDetailInforDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            //80 nếu có Staff_infor thì mới trả ra vì 1 số user có staff_infor = null
            let priceId = '', paymentId = '', selectedPayment = '', selectedPrice = ''
                , specialtyId = '', selectedSpecialty = '';


            if (res.data.Staff_infor) {

                paymentId = res.data.Staff_infor.paymentId;
                priceId = res.data.Staff_infor.priceId;
                //94
                specialtyId = res.data.Staff_infor.specialtyId;

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })

            }

            //set lại giá trị đã có
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                //80 gán lại tt
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedSpecialty: selectedSpecialty

            })
        }
        else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })

        }
        // console.log(`check res :`, res);
    };

    //79
    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        //name.name lấy tên của react select
        let stateName = name.name;
        let stateCopy = { ...this.state }
        stateCopy[stateName] = selectedOption;

        this.setState({
            ...stateCopy
        })
        // console.log('check name: ', selectedOption, stateName)


    }

    handleChangeText = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;

        this.setState({
            ...stateCopy
        })
    }

    render() {
        //
        let { hasOldData, listSpecialty } = this.state
        console.log('check state', this.state)
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
                            //79
                            name={'selectedOption'}

                        />

                    </div>
                    <div className='content-right col'>
                        <label className='text-up'>Thông tin giới thiệu</label>
                        <textarea className='form-control' rows='4'
                            value={this.state.description}
                            onChange={(event) => this.handleChangeText(event, 'description')}
                            placeholder={'Nhập thông tin vào...'}
                        >
                        </textarea>
                    </div>
                </div>
                {/* thêm tạo tt */}


                <div className='row staff-infor-extra px-5'>
                    <div className='col-4 form-group '>
                        <label className='text-up' >Chọn Tên dịch vụ:</label>
                        <Select
                            //79
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listSpecialty}
                            placeholder={'Chọn tên dịch vụ'}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className='col-3 form-group '>
                        <label className='text-up'>Chọn giá</label>
                        <Select
                            //79
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPrice}
                            placeholder={'Chọn giá dịch vụ'}
                            name="selectedPrice"

                        />
                    </div>
                    < div className='col-3 form-group'>
                        <label className='text-up'>Chọn phương thức thanh toán</label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfo}
                            options={this.state.listPayment}
                            placeholder={'Chọn phương thức thanh toán'}
                            name={'selectedPayment'}
                        />
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
                    className={hasOldData === true ? 'save-markdown text-light font-weight-bold' : 'save-markdown text-light font-weight-bold'}
                    type='button'>
                    {hasOldData === true ?
                        <span>Cập nhật thông tin</span>
                        :
                        <span>Lưu thông tin</span>

                    }
                </button>
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
