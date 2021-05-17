import React, { Component } from 'react'
import {
    FireOutlined,
    FileTwoTone,
    PushpinTwoTone,
    BankTwoTone,
    IdcardTwoTone,
} from '@ant-design/icons';
import { Avatar, Image,Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default class GroupMemb extends Component {
    render() {
        return (
            <div>
                <div className="User_box">
                    <div className="User_box_left">
                        <Image
                            width={180}
                            height={180}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </div>
                    <div className="User_box_right">
                        <h1>张三</h1>
                        <p><BankTwoTone />学校：广西科技大学</p>
                        <p><IdcardTwoTone />个人简介：大家好，我是张三，来自广西科技大学。主要研究人工智能方向的课题。</p>
                    </div>
                </div>
                <div className="User_box">
                    <div className="User_box_left">
                        <Image
                            width={180}
                            height={180}
                            src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1607431162,3291057968&fm=26&gp=0.jpg"
                        />
                    </div>
                    <div className="User_box_right">
                        <h1>李四</h1>
                        <p><BankTwoTone />学校：广西科技大学</p>
                        <p><IdcardTwoTone />个人简介：大家好，我是李四，来自广西科技大学。主要研究人工智能方向的课题。</p>
                    </div>
                </div>
                <div className="User_box">
                    <div className="User_box_left">
                        <Image
                            width={180}
                            height={180}
                            src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4166359683,2733224544&fm=26&gp=0.jpg"
                        />
                    </div>
                    <div className="User_box_right">
                        <h1>王五</h1>
                        <p><BankTwoTone />学校：广西科技大学</p>
                        <p><IdcardTwoTone />个人简介：大家好，我是王五，来自广西科技大学。主要研究人工智能方向的课题。</p>
                    </div>
                </div>
            </div>
        )
    }
}
