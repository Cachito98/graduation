import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Image, Tabs, Divider, Carousel,Empty } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Suggest from '../components/Suggest'
import axios from 'axios'

import 'highlight.js/styles/monokai-sublime.css';

import Cookies from 'js-cookie'
import Article from '../components/Article'
import Activity from '../components/Activity'
import User from '../components/User'
import GroupMemb from '../components/GroupMemb'
import SuggestArt from "../components/SuggestArt"
import Calendar from '../components/Calendar'
const { TabPane } = Tabs;
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
  CodepenOutlined
} from '@ant-design/icons';

const Home = (list) => {
  // const [mylist, setMylist] = useState(list.data)
  const [value, setValue] = useState('');
  const [mylist, setMylist] = useState([])
  const [usernameCookie, setUsernameCookie] = useState('')
  const [isLoginCookie, setIsLoginCookie] = useState('')
  const [powerCookie, setPowerCookie] = useState('')
  const [user, setUser] = useState('')
  const [isLogin, setIsLogin] = useState('')
  const [alldata, setalldata] = useState('')


  useEffect(() => {

    const username = Cookies.get(username)
    const isLogin = Cookies.get(isLogin)
    const power = Cookies.get(power)
    const newarr = Cookies.get(newarr)
    fetch(`http://localhost:5000/api/blog/all`).then(req => req.json())
            .then(data => {
                console.log(data, "这是所有文章Data") //请求到的数据
                if (data.data) {
                    setalldata(data.data)
                }
            })
    if (newarr) {
      setalldata(newarr.newarr)
    }
    if (username) {
      console.log("获取cookie，有值", username.username);
      setUsernameCookie(username.username)
      setIsLoginCookie(isLogin.isLogin)
      setPowerCookie(power.power)
    } else {
      console.log("获取cookie，没有值");
    }
  }, [value])


  function callback(key) {
    console.log(key);
  }
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header isLogin={isLoginCookie} username={usernameCookie} user={usernameCookie} power={powerCookie} />
      <Row className="comm-main" type="flex" justify="center">

        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            {/* <h2 className="biaoti">为您推荐</h2>
            <div className="Carousel_box">
             
                <SuggestArt></SuggestArt>
              
            </div> */}
            <h2 className="biaoti">最新论文</h2>
            <SuggestArt></SuggestArt>
            
            {/* <Article></Article> */}
            <Tabs className="tabs_box" defaultActiveKey="1" onChange={callback}>
              <TabPane tab="活动" key="1">
                {/* 活动组件 */}
                <Activity user={usernameCookie} isLogin={isLoginCookie} power={powerCookie}></Activity>
              </TabPane>
              <TabPane tab="论文" key="2">
                {/* 论文组件 */}
                <Article user={usernameCookie} isLogin={isLoginCookie} power={powerCookie}></Article>
              </TabPane>
              <TabPane tab="课题组成员" key="3">
                {/* 课题组成员组件 */}
                <GroupMemb></GroupMemb>
              </TabPane>
            </Tabs>
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author user={usernameCookie} power={powerCookie} isLogin={isLoginCookie} />
          <Calendar></Calendar>
          <Suggest />

        </Col>
      </Row>
      <Footer />
    </>
  )
}

// Home.getInitialProps = async () => {
//   const promise = new Promise((resolve) => {
//     axios("http://localhost:5000/api/blog/all").then(
//       (res) => {
//         console.log('远程获取数据结果:', res)
//         resolve(res.data)
//       }
//     )
//   })

//   return await promise
// }


export default Home