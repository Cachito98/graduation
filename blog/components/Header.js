import React, { useEffect, useState } from 'react'

import { Row, Col, Menu, Button, Dropdown } from 'antd'
import {
    HomeOutlined,
    YoutubeOutlined,
    SmileOutlined,
    DownOutlined,
} from '@ant-design/icons';
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import servicePath from "../config/apiUrl";
import Cookies from 'js-cookie'



const Header = (props) => {

    const [navArray, setNavArray] = useState([])
    const [isLoginCookie, setIsLoginCookie] = useState('')
    useEffect(() => {
        setIsLoginCookie(props.isLogin)
        console.log(isLoginCookie);
    })

    console.log(props, "props");
    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_self" rel="noopener noreferrer" href="./userIfo">
                    个人资料
            </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_self" rel="noopener noreferrer" href="./addArtical">
                    编辑文章
            </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_self" rel="noopener noreferrer" href="./">
                    留言
            </a>
            </Menu.Item>

        </Menu>
    );
    return (

        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                    <span className="header-logo">科研成果展示平台</span>
                </Col>

                <Col className="memu-div" xs={0} sm={0} md={14} lg={10} xl={6}>
                    <Menu mode="horizontal" >
                        <Menu.Item key="0" onClick={() => { Router.push('./') }}>
                            {/* <HomeOutlined /> */}
                                首页
                        </Menu.Item>


                        <Menu.Item key="chat" onClick={() => { Router.push('./groupMemb') }}>
                            {/* <Icon type="smile" /> */}
                            课题组成员
                        </Menu.Item>
                        {
                            isLoginCookie !== "yes" &&
                            <Menu.Item key="loginbtn" onClick={() => { Router.push('./Login') }}>
                                {/* <HomeOutlined /> */}
                                <Button type="primary">登录/注册</Button>
                            </Menu.Item>
                        }
                        {
                            isLoginCookie == "yes" &&
                            <Menu.Item key="life2">

                                <Dropdown overlay={menu}>
                                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                        我的 <DownOutlined />
                                    </a>
                                </Dropdown>,
                        </Menu.Item>
                        }
                        {/* <Menu.Item key="life1">
                            <Button type="primary" >
                                登录
                        </Button>
                        </Menu.Item> */}
                    </Menu>

                </Col>
            </Row>
        </div>
    )
}





export default Header