import React, { Component } from 'react'
import { Table, Tag, Space, Modal, Button } from 'antd';
import axios from 'axios'


export default class GroupList extends Component {
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
        this.setState({
            userData: [
                {
                    name: "张三",
                    school: "广西科技大学",
                    imgurl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2796144188,439704386&fm=26&gp=0.jpg",
                    introduce: "大家好，我是张三，来自广西科技大学。主要研究人工智能方向的课题。"
                },
                {
                    name: "李四",
                    school: "广西科技大学",
                    imgurl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2796144188,439704386&fm=26&gp=0.jpg",
                    introduce: "大家好，我是李四，来自广西科技大学。主要研究人工智能方向的课题。"
                },
                {
                    name: "王五",
                    school: "广西科技大学",
                    imgurl: "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2796144188,439704386&fm=26&gp=0.jpg",
                    introduce: "大家好，我是王五，来自广西科技大学。主要研究人工智能方向的课题。"
                },
            ]
        })
        // axios.get('http://localhost:5000/api/user/all')
        //     .then((e) => {
        //         console.log(e.data.data);
        //         e.data.data.forEach(item => {
        //             console.log(item);
        //             let userobj = {
        //                 key: item.name,
        //                 name: item.username,
        //                 school: item.school,

        //             }
        //             userlist.push(userobj)
        //             console.log(userlist, "userlist");

        //         });
        //         this.setState({
        //             userData: userlist
        //         })
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });



    }
    componentDidMount() {
        this.getList()
    }
    render() {
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: '学校',
                dataIndex: 'school',
                key: 'school',
                width:"100px"
            },
            {
                title: '头像地址',
                dataIndex: 'imgurl',
                key: 'imgurl',
                width:"200px"
            },
            {
                title: '个人介绍',
                dataIndex: 'introduce',
                key: 'introduce',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a onClick={this.audit.bind(this, record)}>修改 </a>
                        <a onClick={this.delete.bind(this, record)}>删除 </a>
                        {/* <a>Delete</a> */}
                    </Space>
                ),
            },
        ];

        return (
            <div>
                <h1 >-课题组成员管理-</h1>
                <Button>新增课题组成员</Button>
                <Table columns={columns} dataSource={this.state.userData} rowKey={record => record.name} />
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
