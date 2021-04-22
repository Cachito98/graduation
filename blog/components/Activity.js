import React, { Component } from 'react'
import {
    FireOutlined,
    FileTwoTone,
    PushpinTwoTone
} from '@ant-design/icons';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default class Activity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
      }
    render() {
        return (
            <div>
                <div className="activity_box">
                    <div className="activity_box_left">

                        <h1 className="list-title"><FireOutlined />神经网络活动</h1>
                        <img className="activity_img" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1012394251,872838470&fm=26&gp=0.jpg"></img>

                    </div>
                    <div className="activity_box_right">
                        <h2> <Avatar src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3324287611,3832720410&fm=26&gp=0.jpg" size={60} icon={<UserOutlined  />} />       zhangsan</h2>
                        <h2>活动简介：</h2><p>这是简介的内容这是简介的内容这是简介的内容这是简介的内容这是简介的内容这是简介的内容这是简介的内容</p>
                        <span><FileTwoTone /><a>资料下载</a></span><span><PushpinTwoTone /><a>相关链接</a></span>
                    </div>
                </div>
            </div>
        )
    }
}
