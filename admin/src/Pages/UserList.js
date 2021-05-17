import React, { Component } from 'react'
import { Table, Tag, Space,message, Modal, Button,Input } from 'antd';
import axios from 'axios'


export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            visible1: false,
            visible2: false,
            confirmLoading: false,
            userData: [],
            userInfo:'',
            emaildata:{
                emailaddress:'',
                username:'',
                text:'',
            }
        };
    }
    audit = (e) => {
        this.showModal1()
        this.setState({
            userInfo:e
        })
    }
    delete = (e) => {
        this.showModal2()
        
    }
    // 显示模态框
    showModal1 = () => {
        this.setState({
            visible1: true
        }, () => { console.log(this.state) })
    };
    showModal2 = () => {
        this.setState({
            visible2: true
        }, () => { console.log(this.state) })
    };
    //   点击确认
    handleOk1 = () => {
        this.setState({
            userInfo:{
                ...this.state.userInfo,
                review:"2"
            }
        },()=>{
            axios.post('http://localhost:5000/api/user/chg',this.state.userInfo)
            .then((e) => {
                console.log(e,"返回结果");     
                this.setState({
                    ...this.state,
                    visible1: false,
                })    
                this.getList()       
            })
        })            
        
    };
    handleOk2 = () => {
        axios.post('http://localhost:5000/api/email/send',this.state.emaildata)
            .then((e) => {
                console.log(e,"返回结果");     
                this.setState({
                    ...this.state,
                    visible2: false,
                })    
                this.getList()   
                message.success('邮件发送成功');    
            })
    };
    // 点击关闭
    handleCancel1 = () => {
        this.setState({
            userInfo:{
                ...this.state.userInfo,
                review:"3"
            }
        },()=>{
            axios.post('http://localhost:5000/api/user/chg',this.state.userInfo)
            .then((e) => {
                console.log(e,"返回结果");     
                this.setState({
                    ...this.state,
                    visible1: false,
                })    
                this.getList()     
                message.success('审核成功');   
            })
        })      
    };
    handleCancel2 = () => {
        this.setState({
            visible2: false
        }, () => { console.log(this.state) })
    };
    addemailinput=(e)=>{
        this.setState({
            emaildata:{
                ...this.state.emaildata,
                emailaddress:e.target.value
            }
        })
    }
    usernameinput=(e)=>{
        this.setState({
            emaildata:{
                ...this.state.emaildata,
                username:e.target.value
            }
        })
    }
    textinput=(e)=>{
        this.setState({
            emaildata:{
                ...this.state.emaildata,
                text:e.target.value
            }
        })
    }
    // 获取用户
    getList = () => {
        const userlist = []

        axios.get('http://localhost:5000/api/user/all')
            .then((e) => {
                console.log(e.data.data);
                e.data.data.forEach(item => {
                    // console.log(item);
                    if(item.username){
                        let userobj = {
                            key: item._id,
                            username: item.username,
                            school: item.school,
                            edu:item.edu,
                            review:item.review,
                            email:item.email,
                            educode:item.educode ,
                            realname:item.realname,
                            imgurl:item.imgurl,
                            introduce:item.introduce
                        }
                        // this.setState({
                        //     userInfo:userobj
                        // },()=>{console.log(this.state.userInfo,"userInfo")})
                        userlist.push(userobj)
                        // console.log(userlist, "userlist");
                    }                    
                });
                this.setState({
                    userData: userlist
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    componentDidMount() {
        this.getList()
    }
    render() {
        const columns = [
            {
                title: '账号',
                dataIndex: 'username',
                key: 'username',
                render: text => <a>{text}</a>,
            },
            {
                title: '真实姓名',
                dataIndex: 'realname',
                key: 'realname',
                render: text => <a>{text}</a>,
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '学校',
                dataIndex: 'school',
                key: 'school',
            },
            {
                title: '学历',
                dataIndex: 'edu',
                key: 'edu',
            },
            {
                title: '学信网代码',
                dataIndex: 'educode',
                key: 'eduno',
            },
            {
                title: '审核状态',
                dataIndex: 'review',
                key: 'review',
                render:(text,record)=>(
                    <a>
                        {text==0&&"未上传身份信息"}
                        {text==1&&"待审核"}
                        {text==2&&"审核通过"}
                        {text==3&&"审核不通过"}
                    </a>
                )
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a onClick={this.audit.bind(this, record)}>审核 </a>
                        {/* <a onClick={this.delete.bind(this, record)}>删除 </a> */}
                        <a onClick={this.delete.bind(this, record)}>邮件通知 </a>
                        {/* <a>Delete</a> */}
                    </Space>
                ),
            },
        ];
        
        return (
            <div>
                <h1 >-用户审核-</h1>
                <Table columns={columns} dataSource={this.state.userData} rowKey={record=>record.name} />
                {/* 修改模态框 */}
                <Modal
                    title="用户审核"
                    visible={this.state.visible1}
                    onOk={this.handleOk1}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel1}
                    cancelText={"审核不通过"}
                    okText={"审核通过"}
                >
                    <p>审核</p>
                </Modal>
                {/* 删除警告框 */}
                <Modal
                    title="发送邮件"
                    visible={this.state.visible2}
                    onOk={this.handleOk2}
                    onCancel={this.handleCancel2}
                    okText="发送"
                    cancelText="取消"
                >
                   邮箱地址：<Input onChange={this.addemailinput} />
                   用户名：<Input onChange={this.usernameinput}  />
                   内容：<Input  onChange={this.textinput} />
                </Modal>
            </div>
        )
    }
}
