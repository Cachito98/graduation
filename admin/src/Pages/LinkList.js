import React, { Component } from 'react'
import { Table, Tag, Space, Modal, Button } from 'antd';
import axios from 'axios'


export default class LinkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            visible1: false,
            visible2: false,
            confirmLoading: false,
            userData: []
        };
    }
    audit = (e) => {
        console.log(e, "11111111111111");
        this.showModal1()
    }
    delete = (e) => {
        console.log(e, "删除操作");
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
            confirmLoading: true
        })
        setTimeout(() => {
            this.setState({
                visible1: false,
                confirmLoading: false
            }, () => { console.log(this.state); })
        }, 2000);
    };
    handleOk2 = () => {
        setTimeout(() => {
            this.setState({
                visible2: false,
            }, () => { console.log(this.state); })
        }, 2000);
    };
    // 点击关闭
    handleCancel1 = () => {
        this.setState({
            visible1: false
        }, () => { console.log(this.state) })
    };
    handleCancel2 = () => {
        this.setState({
            visible2: false
        }, () => { console.log(this.state) })
    };
    // 获取用户
    getList = () => {
        const userlist = []

        axios.get('http://localhost:5000/api/user/all')
            .then((e) => {
                console.log(e.data.data);
                e.data.data.forEach(item => {
                    console.log(item);
                    let userobj = {
                        key: item.name,
                        name: item.username,
                        school: item.school,

                    }
                    userlist.push(userobj)
                    console.log(userlist, "userlist");
                    
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
                title: '用户名',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
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
                title: '学籍号',
                dataIndex: 'eduno',
                key: 'eduno',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a onClick={this.audit.bind(this, record)}>审核 </a>
                        <a onClick={this.delete.bind(this, record)}>删除 </a>
                        {/* <a>Delete</a> */}
                    </Space>
                ),
            },
        ];
        
        return (
            <div>
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
                    title="删除用户"
                    visible={this.state.visible2}
                    onOk={this.handleOk2}
                    onCancel={this.handleCancel2}
                    okText="删除"
                    cancelText="取消"
                >
                    <p>确认删除？</p>
                </Modal>
            </div>
        )
    }
}
