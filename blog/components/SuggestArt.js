import React, { Component } from 'react'
import {
    CodepenOutlined
} from '@ant-design/icons';
import { Row, Col, List, Image, Divider, Empty,Carousel , Button } from 'antd'

import Link from 'next/link'


export default class SuggestArt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            ArticleList: [],
            user: this.props.user,
            isLogin: this.props.isLogin,
            power: this.props.power
        };
    }
    componentDidMount() {
        fetch('http://localhost:5000/api/blog/all').then(req => req.json())
            .then(data => {
                console.log(data.data);
                this.setState({
                    ArticleList: data.data
                })

            })
        console.log(this.state, "这是state")
    }
    render() {
        return (
            <div>
                <Carousel autoplay>
                {
                    this.state.ArticleList &&
                    this.state.ArticleList.map((item, index) => {
                        // console.log(item, "item")
                        if (item.reviewM == "1" && item.isBad == "0" &&index<4) {
                            return (
                                <div>
                                    <Link key={index} href={{ pathname: '/detailed', query: { id: item._id, user: this.props.user, power: this.props.power } }}>
                                        <div className="article_box1">
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
                                </div>
                            )
                        } else {
                            <Empty />
                        }

                    })
                }
                </Carousel>
            </div>
        )
    }
}
