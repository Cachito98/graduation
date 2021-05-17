import React, { Component } from 'react'
import { Table, Tag, Space, Modal, message,Button } from 'antd';
import axios from 'axios'


export default class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            visible1: false,
            visible2: false,
            visible3: false,
            confirmLoading: false,
            articleData: [],
            reviewInfo: '',
        };
    }
    audit = (e) => {
        this.showModal1()
        console.log(e,"e")
        this.setState({
            reviewInfo: e
        })
    }
    delete = (e) => {
        this.showModal2()
    }
    sendemail = (e) => {
        this.showModal3()
    }
    // 显示模态框
    showModal1 = () => {
        this.setState({
            visible1: true
        })
    };
    showModal2 = () => {
        this.setState({
            visible2: true
        })
    };
    showModal3 = () => {
        this.setState({
            visible3: true
        })
    };
    //   点击确认
    handleOk1 = () => {
        // this.setState({
        //     confirmLoading: true
        // })
        // setTimeout(() => {
        //     this.setState({
        //         visible1: false,
        //         confirmLoading: false
        //     })
        // }, 2000);
        axios.get(`http://localhost:5000/api/blog/bad?id=${this.state.reviewInfo.id}&isBad=0`)
            .then((e) => {
                console.log(e,"返回结果");     
                this.setState({
                    ...this.state,
                    visible1: false,
                })    
                this.getList()
                message.success('审核成功');    

            })
    };
    handleOk2 = () => {
        setTimeout(() => {
            this.setState({
                visible2: false,
            })
        }, 2000);
    };
    // 点击关闭
    handleCancel1 = () => {
        this.setState({
            visible1: false
        })
    };
    handleCancel2 = () => {
        this.setState({
            visible2: false
        })
    };
    handleCancel3 = () => {
        this.setState({
            visible3: false
        })
    };
    // 获取用户
    getList = () => {
        const userlist = []

        axios.get('http://localhost:5000/api/blog/all')
            .then((e) => {
                console.log(e.data.data);
                e.data.data.forEach(item => {
                    console.log(item.isBad, "item")
                    if (item.isBad == "1") {
                        let articleObj = {
                            id: item._id,
                            key: item.id,
                            name: item.username,
                            title: item.title,
                            isBad: item.isBad,
                            description: item.description,
                            // content:item.content,
                            likes: item.likes,
                        }
                        userlist.push(articleObj)
                        this.setState({
                            articleData: userlist
                        })
                    }
                });
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
                title: '成果标题',
                dataIndex: 'title',
                key: 'title',
            },
            {
                title: '成果简介',
                dataIndex: 'description',
                key: 'description',
            },

            {
                title: '举报状态',
                dataIndex: 'isBad',
                key: 'isBad',
                render: (text, record) => (
                    <a>{text == 0 ? "正常" : "被举报"}</a>
                )
            },
            // {
            //     title: '举报状态',
            //     dataIndex: 'likes',
            //     key: 'likes',
            // },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a onClick={this.audit.bind(this, record)}>审核 </a>
                        {/* <a onClick={this.delete.bind(this, record)}>删除 </a> */}
                        {/* <a>Delete</a> */}
                    </Space>
                ),
            },
        ];

        return (
            <div>
                <h1 >-举报审核-</h1>
                <Table columns={columns} dataSource={this.state.articleData} rowKey={record => record.id} />
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
                {/* fa送邮件 */}
                <Modal
                    title="发送邮件"
                    visible={this.state.visible3}
                    onOk={this.handleOk3}
                    onCancel={this.handleCancel3}
                    okText="发送"
                    cancelText="取消"
                >

                </Modal>
            </div>
        )
    }
}
