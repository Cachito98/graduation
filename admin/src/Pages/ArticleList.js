import React, { Component } from 'react'
import { Table, Tag, Space, Modal,message, Button } from 'antd';
import axios from 'axios'


export default class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            visible1: false,
            visible2: false,
            confirmLoading: false,
            articleData: [],
            articleInfo:''
        };
    }
    audit = (e) => {
        this.showModal1()
        this.setState({
            articleInfo:e
        })
    }
    delete = (e) => {
        this.showModal2()
        this.setState({
            articleInfo:e
        })
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
    //   点击确认
    handleOk1 = () => {
        axios.get(`http://localhost:5000/api/blog/setre?id=${this.state.articleInfo.id}&reviewM=1`,)
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
        axios.get(`http://localhost:5000/api/blog/delart?id=${this.state.articleInfo.id}`,)
            .then((e) => {
                console.log(e,"返回结果");     
                this.setState({
                    ...this.state,
                    visible2: false,
                })    
                this.getList()    
                message.success('删除成功');    
            }) 
    };
    // 点击关闭
    handleCancel1 = () => {
        axios.get(`http://localhost:5000/api/blog/setre?id=${this.state.articleInfo.id}&reviewM=2`,)
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
    handleCancel2 = () => {
        this.setState({
            visible2: false
        })
    };
    // 获取用户
    getList = () => {
        const userlist = []

        axios.get('http://localhost:5000/api/blog/all')
            .then((e) => {
                console.log(e.data.data, "拿到的数据");
                e.data.data.forEach(item => {
                    let articleObj = {
                        id: item._id,
                        key: item.id,
                        name: item.username,
                        title: item.title,
                        reviewM: item.reviewM,
                        description: item.description,
                        content:item.content,
                        likes: item.likes,
                    }
                    userlist.push(articleObj)
                });
                this.setState({
                    articleData: userlist
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
                title: '成果标题',
                dataIndex: 'title',
                key: 'title',
                width:"200px"

            },
            {
                title: '成果简介',
                dataIndex: 'description',
                key: 'description',
                width:"250px"
            },
            {
                title: '浏览次数',
                dataIndex: 'likes',
                key: 'likes',
            },
            {
                title: '审核状态',
                dataIndex: 'reviewM',
                key: 'reviewM',
                render: (text, record) => (
                    <a>
                        {text == 0 && "待审核"}
                        {text == 1 && "审核通过"}
                        {text == 2 && "审核不通过"}
                    </a>
                )
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
                <h1 >-成果审核-</h1>
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
                    title="删除成果"
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
