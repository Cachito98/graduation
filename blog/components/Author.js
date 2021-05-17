
import { Avatar, Divider } from 'antd'
import Link from 'next/link'
import Cookies from 'js-cookie'
import React, { Component } from 'react'

export default class Author extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            ArticleList: [],
            user: this.props.user,
            isLogin: this.props.isLogin,
            power: this.props.power,
            userInfo: ''
        };
    }
    componentDidMount() {
        const username = Cookies.get(username)
        console.log(username, "username")
        fetch('http://localhost:5000/api/user/all').then(req => req.json())
            .then(data => {
                console.log(data.data);
                data.data.filter(e => {
                    if (e.username == username.username) {
                        this.setState({
                            userInfo: e
                        }, () => { console.log(this.state.userInfo, "userInfo") })
                    }
                })

            })
        // console.log(userdata,"userdata")
        console.log(this.state, "这是state")
    }
    render() {
        console.log(this.state.userInfo.username, "111")
        return (
            <div>
                <div className="author-div comm-box">
                    {/* <Link href={{ pathname: '/userIfo', query: { id: item.id } }}> */}
                    <Link href={{ pathname: '/userIfo', query: { user: this.state.userInfo.username, power: this.state.userInfo.review, isLogin: this.props.isLogin } }}>
                        <div> <Avatar src={this.state.userInfo.imgurl} size={150} /></div>

                    </Link>
                    {
                        this.state.userInfo.username == undefined &&

                        <div className="author-introduction">
                            <div>请登录</div>
                            <Divider>社交账号</Divider>
                            <Avatar size={28} className="account" />
                            <Avatar size={28} className="account" />
                            <Avatar size={28} className="account" />
                        </div>

                    }
                    {
                        this.state.userInfo.username !== undefined &&
                        <div className="author-introduction">
                            用户名：{this.state.userInfo.username}<br></br>
                个人简介:{this.state.userInfo.introduce}
                            <Divider>社交账号</Divider>
                            <Avatar size={28} className="account" />
                            <Avatar size={28} className="account" />
                            <Avatar size={28} className="account" />
                        </div>
                    }

                </div>
            </div>
        )
    }
}

