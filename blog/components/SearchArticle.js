import React, { Component } from 'react'
import { Row, Col, List, Image, Divider, Empty,Button } from 'antd'
import {
    CodepenOutlined
} from '@ant-design/icons';
import Link from 'next/link'


export default class SearchArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            ArticleList: [],
            user: this.props.user,
            isLogin: this.props.isLogin,
            power: this.props.power,
            hasArt: false
        };
    }
    componentDidMount() {
        fetch(`http://localhost:5000/api/blog/blogs?username=${this.state.user}`).then(req => req.json())
            .then(data => {
                console.log(data.data, "这是返回的数据")
                if (data.data) {
                    console.log(data.data);
                    this.setState({
                        hasArt: true,
                        ArticleList: data.data
                    })
                } else {
                    console.log("该用户未发表成果")
                    this.setState({
                        hasArt: false
                    })
                }
            })
        console.log(this.state, "这是state")
    }
    render() {
        return (
            <div>
                {
                    this.state.hasArt == false &&
                    <div>
                        <Empty description={"该用户暂时未发表任何成果"} />
                        
                    </div>

                }
                {
                    this.state.ArticleList &&
                    this.state.ArticleList.map((item, index) => {
                        return (
                            <Link key={index} href={{ pathname: '/detailed', query: { id: item._id, user: this.props.user, power: this.props.power } }}>
                                <div className="article_box">
                                    <div className="article_box_left">

                                        <h2 className="list-title"><CodepenOutlined />{item.title}</h2>
                                        <p >作者：{item.username}</p>
                                        {/* <p >发布时间：{item.updated}</p> */}
                                        <h3>简介：</h3><h4>{item.description}</h4>
                                    </div>
                                    <div className="article_box_right">
                                        <img className="article_img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1451461064,3707825904&fm=26&gp=0.jpg"></img>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
                {/* <div className="article_box">
                    <div className="article_box_left">

                        <h2 className="list-title"><CodepenOutlined />科研成果文章</h2>
                        <p >作者：zhangsan</p>
                        <h3>简介：</h3><h4>这是活动的简介.....</h4>
                    </div>
                    <div className="article_box_right">
                        <img className="article_img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1451461064,3707825904&fm=26&gp=0.jpg"></img>
                    </div>
                </div> */}
            </div>
        )
    }
}
