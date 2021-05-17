import React, { Component } from 'react'
import {
    CodepenOutlined
} from '@ant-design/icons';
import { Row, Col, List, Image, Divider, Empty, Button, Pagination } from 'antd'

import Link from 'next/link'

const articleArr = []
export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            ArticleList: [],
            user: this.props.user,
            isLogin: this.props.isLogin,
            power: this.props.power,
            current: 1,
            total:'',
            // articleArr:[]
        };
    }
    componentDidMount() {
        fetch('http://localhost:5000/api/blog/all').then(req => req.json())
            .then(data => {
                console.log(data.data);
                this.setState({
                    ArticleList: data.data
                }, () => {
                    this.state.ArticleList.map((item, index) => {
                        if (item.reviewM == "1" && item.isBad == "0") {
                            // console.log(item,"item")
                            articleArr.push(item)
                            this.setState({
                                total:articleArr.length
                            })
                        }
                    })
                })

            })


    }
    
    onChange = (page) => {
        console.log(page,"page")
        this.setState({
            current: page,
        });
    }
    render() {
        console.log("渲染一次")
        console.log(Number(this.state.current,"Number(this.state.page)"))
        console.log(this.state.current,"cuurent")
        return (
            <div>
                
                {
                    articleArr &&
                    articleArr.map((item, index) => {
                        if (this.state.current*3-3 <= index && index< this.state.current*3) {
                            return (
                                <Link key={index} href={{ pathname: '/detailed', query: { id: item._id, user: this.props.user, power: this.props.power } }}>
                                    <div className="article_box">
                                        <div className="article_box_left">

                                            <h2 className="list-title"><CodepenOutlined />{item.title}</h2>
                                            <p >作者：{item.username}</p>
                                            {/* <p >发布时间：{item.updated}</p> */}
                                            <p>简介：{item.description}</p>
                                            <p>关键词：{item.tags.map(e => { return e + ";" })}</p>
                                            <p>点赞数：{item.likes}</p>

                                        </div>
                                        <div className="article_box_right">
                                            <img className="article_img" src={item.blogimgurl}></img>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                    })

                }
                <div className="fenye_box">
                <Pagination defaultCurrent={1} defaultPageSize={3} current={this.state.current} onChange={this.onChange} total={this.state.total} />
                </div>

            </div>
        )
    }
}
