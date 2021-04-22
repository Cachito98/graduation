import React, { Component } from 'react'
import {
    CodepenOutlined
} from '@ant-design/icons';

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            ArticleList: [],
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
    }
    render() {
        return (
            <div>
                {
                    this.state.ArticleList &&
                    this.state.ArticleList.map((item,index) => {
                        return (
                            <div className="article_box" key={index}>
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
                        )
                    })
                }
                <div className="article_box">
                    <div className="article_box_left">

                        <h2 className="list-title"><CodepenOutlined />科研成果文章</h2>
                        <p >作者：zhangsan</p>
                        <h3>简介：</h3><h4>这是活动的简介.....</h4>
                    </div>
                    <div className="article_box_right">
                        <img className="article_img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1451461064,3707825904&fm=26&gp=0.jpg"></img>
                    </div>
                </div>
            </div>
        )
    }
}
