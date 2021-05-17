import React, { useState, useEffect } from 'react'
import Head from 'next/head'
// import Link from 'next/link'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Row, Col, List, Breadcrumb, Card, Tabs, Descriptions, Divider, Button, Statistic, Image } from 'antd'
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
    LikeTwoTone,
    BankTwoTone,
    IdcardTwoTone
} from '@ant-design/icons';
import axios from "axios";
import servicePath from "../config/apiUrl";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import User from '../components/User'
import UserArticle from '../components/userArticle';


const userIfo = () => {
    const router = useRouter();
    const { user, power, isLogin } = router.query;
    const [value, setValue] = useState('');
    const [usernameCookie, setUsernameCookie] = useState('')
    const [isLoginCookie, setIsLoginCookie] = useState('')
    const [powerCookie, setPowerCookie] = useState('')
    const [userinfo, setUserinfo] = useState([])
    const [mylist, setMylist] = useState([])
    function callback(key) {
        console.log(key);
    }
    useEffect(() => {
        setIsLoginCookie(isLogin)
        setPowerCookie(power)
        setUsernameCookie(user)
        

        const articalArr = []
        fetch(`http://localhost:5000/api/blog/blogs?username=${user}`).then(req => req.json())
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
    console.log(userinfo,"userinfo")
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header isLogin={isLoginCookie} username={usernameCookie} />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={30} xl={14}  >
                <h2 className="biaoti">个人主页</h2>
                    {/* <Divider /> */}
                    <div className="userinfo_box_content">
                        <Tabs defaultActiveKey="1" onChange={callback}>
                            <TabPane tab="主页" key="1">
                                <User user={user}></User>
                            </TabPane>
                            <TabPane tab="论文" key="2">
                                <UserArticle user={user} isLogin={isLogin} power={power}></UserArticle>
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
