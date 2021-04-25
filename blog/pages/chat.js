

import React, { useState,useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Image } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Suggest from '../components/Suggest'
import axios from 'axios'
import servicePath from "../config/apiUrl";
// import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import { Carousel } from 'antd';
import { Calendar } from 'antd';
import Chat from '../components/Chat2'
import Cookies from 'js-cookie'


import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons';

const Home = (list) => {
  // const [mylist, setMylist] = useState(list.data)
  const [mylist, setMylist] = useState(
    [
      { title: '图神经网络（Graph Neural Networks）概述', context: '神经网络是一门重要的机器学习技术。它是目前最为火热的研究方向--深度学习的基础。学习神经网络不仅可以让你掌握一门强大的机器学习方法，同时也可以更好地帮助你理解深度学习技术。' },
      { title: '图神经网络 VS 图嵌入', context: '神经网络是一门重要的机器学习技术。它是目前最为火热的研究方向--深度学习的基础。学习神经网络不仅可以让你掌握一门强大的机器学习方法，同时也可以更好地帮助你理解深度学习技术。' },
      { title: '图神经网络的分类', context: '神经网络是一门重要的机器学习技术。它是目前最为火热的研究方向--深度学习的基础。学习神经网络不仅可以让你掌握一门强大的机器学习方法，同时也可以更好地帮助你理解深度学习技术。' },
      { title: '图卷积网络（Graph Convolutional Networks, GCN）', context: '神经网络是一门重要的机器学习技术。它是目前最为火热的研究方向--深度学习的基础。学习神经网络不仅可以让你掌握一门强大的机器学习方法，同时也可以更好地帮助你理解深度学习技术。' },
    ]
  )
  // const renderer = new marked.Renderer();
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  const [value, setValue] = useState('');
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
 
  function onPanelChange(value, mode) {
    console.log(value, mode);
  }
  return (
    <>
      <Head>
        <title>活动聊天室</title>
      </Head>
      <Header isLogin={isLoginCookie} username={usernameCookie}  />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <Chat></Chat>
          </div>
        
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />

          <Suggest />
        </Col>
      </Row>
      <Footer />
    </>
  )
}

// Home.getInitialProps = async () => {
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


export default Home