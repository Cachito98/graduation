import React, { useState, useEffect } from 'react'
import Head from 'next/head'
// import Link from 'next/link'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Row, Col, List, Breadcrumb, Card,Tabs, Descriptions, Divider, Button, Statistic } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Cookies from 'js-cookie'
const { TabPane } = Tabs;
import {
    CalendarOutlined,
    FolderOutlined,
    FireOutlined,
    LikeOutlined,
    LikeTwoTone
} from '@ant-design/icons';
import axios from "axios";
import servicePath from "../config/apiUrl";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import User from '../components/User'
import Article from '../components/Article';


const userIfo = () => {
    const router = useRouter();
    const { username, isLogin } = router.query;
    const [value, setValue] = useState('');
    const [usernameCookie, setUsernameCookie] = useState('')
    const [isLoginCookie, setIsLoginCookie] = useState('')
    console.log(username, isLogin, "router");
    const [mylist, setMylist] = useState([])
    function callback(key) {
        console.log(key);
      }
    useEffect(() => {
        setIsLoginCookie(isLogin)
        setUsernameCookie(username)

        const articalArr = []
        fetch(`http://localhost:5000/api/blog/blogs?username=${username}`).then(req => req.json())
            .then(data => {
                console.log(data, "这是Data") //请求到的数据
                if (data.data) {
                    data.data.forEach(item => {
                        const articalList = {
                            title: item.title,
                            description: item.description,
                            id: item._id
                        }
                        articalArr.push(articalList)
                    })
                    setMylist(articalArr)
                }
            })


    }, [value])

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header isLogin={isLoginCookie} username={usernameCookie} />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={30} xl={14}  >
                    <div className="userinfo_box">
                        <div className="userinfo_box_left">
                            <Avatar src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3324287611,3832720410&fm=26&gp=0.jpg" size={120} icon={<UserOutlined />} />
                        </div>
                        <div className="userinfo_box_middle">
                            <h1>zhangsan</h1>
                            <h3>个人简介：香港中文大学新闻与传播学院研究员，研究领域为计算社会科学、科学传播、健康传播</h3>
                        </div>
                        <div className="userinfo_box_right">
                            <Statistic value={1128} prefix={<LikeTwoTone />} />
                        </div>
                    </div>
                    <Divider />
                    <div className="userinfo_box_content">
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="主页" key="1">
                                <User></User>
                            </TabPane>
                            <TabPane tab="论文" key="2">
                                <Article></Article>
                            </TabPane>
                        </Tabs>
                    </div>
                </Col>

            </Row>
            <Footer />

        </>
    )




}
// MyList.getInitialProps = async () => {
//   const promise = new Promise((resolve) => {
//     axios(servicePath.getArticleList).then(
//       (res) => {
//         console.log('远程获取数据结果:', res.data.data)
//         resolve(res.data)
//       }
//     )
//   })

//   return await promise
// }

export default userIfo
