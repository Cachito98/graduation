import React, { Component } from 'react'
import axios from 'axios'

import {
    FireOutlined,
    FileTwoTone,
    PushpinTwoTone,
    BankTwoTone,
    IdcardTwoTone,
    ContactsTwoTone,
} from '@ant-design/icons';
import { Avatar, Image, Input, Button, Modal, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { TextArea } = Input;
export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            isModalVisible2: false,
            user: 'zhangsan',
            src: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
            userInfo: {
                username: '',
                realname: '',
                educode: "",
                introduce: '',
                imgurl: '',
                email: '',
                school: '',
                edu: '',
                review: '',
            },
            user: this.props.user
        }
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/user/all').then(req => req.json())
            .then(data => {
                console.log(data.data, "这是Data") //请求到的数据
                if (data.data) {
                    let arr = data.data.filter(item => item.username === this.state.user)
                    console.log(arr, "arr")
                    this.setState({
                        ...this.state,
                        userInfo: {
                            username: arr[0].username,
                            realname: arr[0].realname,
                            introduce: arr[0].introduce,
                            imgurl: arr[0].imgurl,
                            educode: arr[0].educode,
                            email: arr[0].email,
                            school: arr[0].school,
                            edu: arr[0].edu,
                            review: arr[0].review,
                        }
                    })
                }
            })
    }
    showModal2 = () => {
        this.setState({
            isModalVisible2: true,
        })

    };
    handleOk2 = () => {

        this.setState({
            ...this.state,
            isModalVisible2: false,
            userInfo: {
                ...this.state.userInfo,
                review: 1
            }
        }, () => {
            let object = this.state.userInfo
            console.log(object, "object")
            axios.post('http://localhost:5000/api/user/chg', object).then((res) => {
                console.log(res, "返回的结果")
                this.info()
            })
        })

    };
    handleCancel2 = () => {
        this.setState({
            isModalVisible2: false,
        })
    };

    showModal = () => {
        this.setState({
            isModalVisible: true,
        })
    };
    handleOk = () => {
        this.info()
        this.setState({
            isModalVisible: false,
            isModalVisible2: false,
        })
        axios.post('http://localhost:5000/api/user/chg', this.state.userInfo).then((res) => {
            console.log(res, "返回的结果")
        })
    };
    handleCancel = () => {
        this.setState({
            isModalVisible: false,
        })
    };
    nameInput = (e) => {
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                realname: e.target.value
            }
        })
    }
    introduceInput = (e) => {
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                introduce: e.target.value
            }
        })
    }
    srcInput = (e) => {
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                imgurl: e.target.value
            }
        })
    }
    educodeInput = (e) => {
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                educode: e.target.value
            }
        })
    }
    info = () => {
        message.info('提交成功');
    };
    render() {
        return (
            <div>
                <div className="User_box">
                    <div className="User_box_left">
                        <Image
                            width={200}
                            height={200}
                            src={this.state.userInfo.imgurl}
                        />
                    </div>
                    <div className="User_box_right">
                        <h1>{this.state.userInfo.realname}</h1>
                        <p><ContactsTwoTone />
                            {
                                this.state.userInfo.review == "0" && "未进行身份认证"
                            }
                            {
                                this.state.userInfo.review == "1" && "身份认证审核中"
                            }
                            {
                                this.state.userInfo.review == "2" && "已通过身份认证"
                            }
                            {
                                this.state.userInfo.review == "3" && "未通过身份认证"
                            }
                        </p>
                        <p><BankTwoTone />学校：{this.state.userInfo.school}</p>
                        <p><IdcardTwoTone />个人介绍：{this.state.userInfo.introduce}</p>
                        <Button type="primary" onClick={() => { this.showModal() }} >编辑资料</Button>
                        <Button type="link" onClick={() => { this.showModal2() }} >身份认证</Button>
                    </div>
                </div>
                <Modal
                    title="编辑资料"
                    visible={this.state.isModalVisible}
                    onOk={() => { this.handleOk() }}
                    onCancel={() => { this.handleCancel() }}
                    cancelText="取消"
                    okText="提交"
                >
                    姓名：<Input placeholder="请输入您的真实姓名" value={this.state.userInfo.realname} onChange={this.nameInput} />
                    介绍一下自己：<TextArea value={this.state.userInfo.introduce} onChange={this.introduceInput} />
                    上传头像图片地址：<Input value={this.state.userInfo.imgurl} onChange={this.srcInput} />
                </Modal>
                <Modal
                    title="身份认证"
                    visible={this.state.isModalVisible2}
                    onOk={() => { this.handleOk2() }}
                    onCancel={() => { this.handleCancel2() }}
                    cancelText="取消"
                    okText="提交"
                >
                    真实姓名：<Input value={this.state.userInfo.realname} />
                    {/* 身份证号码：<Input placeholder="请输入您的身份证号" /> */}
                    学信网代码：<Input placeholder="请输入您的学信网代码" value={this.state.userInfo.educode} onChange={this.educodeInput} />
                </Modal>
            </div>
        )
    }
}
