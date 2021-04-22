import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Image, Tabs, Divider } from 'antd'
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
const { TabPane } = Tabs;
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons';

const Home = (list) => {
  // const [mylist, setMylist] = useState(list.data)
  const [value, setValue] = useState('');
  const [mylist, setMylist] = useState([])
  const [usernameCookie, setUsernameCookie] = useState('')
  const [isLoginCookie, setIsLoginCookie] = useState('')


  useEffect(() => {

    console.log("0000000000000000000000000000000");
    const username = Cookies.get(username)
    const isLogin = Cookies.get(isLogin)

    if (username) {
      console.log("获取cookie，有值", username.username);
      setUsernameCookie(username.username)
      setIsLoginCookie(isLogin.isLogin)
    } else {
      console.log("获取cookie，没有值");

    }
    


  }, [value])

  // const username = Cookies.get(username)
  // console.log(username.username, "Cookies.get(username)");
  // const userPower = Cookies.get(userPower)
  // console.log(userPower.userPower, "Cookies.get(userPower)");
  // const isLogin = Cookies.get(isLogin)
  // console.log(isLogin.isLogin, "Cookies.get(isLogin)");
  // Cookies.set("isLogin", "yes", { path: '/' });
  function callback(key) {
    console.log(key);
  }
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header isLogin={isLoginCookie} username={usernameCookie} />
      <Row className="comm-main" type="flex" justify="center">
        
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>          
            <Tabs className="tabs_box"  defaultActiveKey="1" onChange={callback}>
              <TabPane tab="活动" key="1">
                {/* 活动组件 */}
                <Activity></Activity>                
              </TabPane>
              <TabPane tab="论文" key="2">
                {/* 论文组件 */}
                <Article></Article>
              </TabPane>
              <TabPane tab="课题组成员" key="3">
                {/* 课题组成员组件 */}
                <User></User>
            </TabPane>
            </Tabs>
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author username={usernameCookie} />
          <Suggest />

        </Col>
      </Row>
      <Footer />
    </>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios("http://localhost:5000/api/blog/all").then(
      (res) => {
        console.log('远程获取数据结果:', res)
        resolve(res.data)
      }
    )
  })

  return await promise
}


export default Home