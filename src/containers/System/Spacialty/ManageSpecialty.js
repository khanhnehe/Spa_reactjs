import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss'
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils"
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
//90
import { createNewSpecialty } from '../../../services/userService';
import { toast } from "react-toastify"

const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            price: ''

        }
    }

    async componentDidMount() {

    }



    async componentDidUpdate(prevProps, prevState, snapshot) {


    }

    handleOnChangeSelect = async (event) => {

    }

    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;

        this.setState({
            ...stateCopy
        })

    }

    //hmaf nyaf của thư viện
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }

    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty(this.state)
        if (res && res.errCode === 0) {
            toast.success("Thêm dịch vụ thành công!")
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                price: ''

            })

        } else {
            toast.error("Thêm dịch vụ thất bại!")

        }
    }

    render() {


        return (
            <>
                <div className='Manage-specialty-container'>
                    <div className='title'>QUẢN LÝ DỊCH VỤ</div>
                    <div className='btn-add-new-specialty'>
                        add
                    </div>
                    <div className='row specialty-group px-5 '>

                        <div className='col-6 form-group'>
                            <label className='text-custom'>Tên dịch vụ</label>
                            <input className='form-control' type='text'
                                value={this.state.name}
                                onChange={(event) => this.handleOnchangeInput(event, 'name')}
                            ></input>
                        </div><div className='col-2 form-group'>
                            <label className='text-custom'>Giá</label>
                            <input className='form-control' type='text'
                                value={this.state.price}
                                onChange={(event) => this.handleOnchangeInput(event, 'price')}
                            ></input>
                        </div>
                        <div className='col-2 form-group'>
                            <label className='text-custom'>Ảnh dụch vụ</label>
                            <input className='form-control-file' type='file'></input>
                        </div>

                        <div className='Markdown-specialty mt-3'>
                            <MdEditor style={{ height: '350px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className='col-12 mt-3 mb-5'>
                            <button className='btn btn-primary'
                                onClick={() => this.handleSaveNewSpecialty()}
                            >Lưu thông tin</button>

                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
