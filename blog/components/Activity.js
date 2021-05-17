import React, { Component } from 'react'
import {
    FireOutlined,
    FileTwoTone,
    PushpinTwoTone
} from '@ant-design/icons';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link'


export default class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            user: this.props.user,
            isLogin: this.props.isLogin,
            power: this.props.power
        };
    }
    render() {
        return (
            <div>
                <Link href={{
                    pathname: '/chat', query: {
                        title: "人工神经网络交流活动",
                        introduce: "本此活动主要对人工神经网络基础进行了交流，主要包括人工神经网络的概念、发展、特点、结构、模型。",
                        user:this.props.user,
                        power:this.props.power
                    } 
                }}>
                    <div className="activity_box">
                        <div className="activity_box_left">

                            <h1 className="list-title"><FireOutlined />人工神经网络交流活动</h1>
                            <img className="activity_img" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1012394251,872838470&fm=26&gp=0.jpg"></img>

                        </div>
                        <div className="activity_box_right">
                            <h2> <Avatar src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3324287611,3832720410&fm=26&gp=0.jpg" size={60} icon={<UserOutlined />} />       zhangsan</h2>
                            <h2>活动简介：</h2><p>本此活动主要对人工神经网络基础进行了交流，主要包括人工神经网络的概念、发展、特点、结构、模型。</p>
                            <span><FileTwoTone /><a>资料下载</a></span><span><PushpinTwoTone /><a>相关链接</a></span>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}
