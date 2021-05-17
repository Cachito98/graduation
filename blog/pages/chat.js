

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Image, Divider, Empty } from 'antd'
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
import { useRouter } from 'next/router';


import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined
} from '@ant-design/icons';

const Home = () => {
  const router = useRouter();

  const { title, introduce, user, power } = router.query;
  console.log(user, "user")
  console.log(power, "power")
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

  return (
    <>
      <Head>
        <title>活动聊天室</title>
      </Head>
      <Header isLogin={isLoginCookie} username={usernameCookie} />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <h1>标题：{title}</h1>
            <h3>活动介绍：{introduce}</h3>
            <Image
              width={700}
              height={350}
              src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1013746476,2096643252&fm=26&gp=0.jpg"
            />
            <p>1、人工智能<br></br>

            人工智能（Artificial intelligence）简称AI。人工智能是计算机科学的一个分支，它企图了解智能的本质，并生产出一种新的能以人类智能相似的方式做出反应的智能机器，是研究、开发用于模拟、延伸和扩展人的智能的理论、方法、技术及应用系统的一门新的技术科学。

            人工智能目前分为弱人工智能和强人工智能和超人工智能。

           <br></br> 1）弱人工智能：弱人工智能（ArtificialNarrow Intelligence /ANI),只专注于完成某个特定的任务，例如语音识别、图象识别和翻译等，是擅长于单个方面的人工智能。它们只是用于解决特定的具体类的任务问题而存在，大都是统计数据，以此从中归纳出模型。由于弱人工智能智能处理较为单一的问题，且发展程度并没有达到模拟人脑思维的程度，所以弱人工智能仍然属于“工具”的范畴，与传统的“产品”在本质上并无区别。

           <br></br>2)  强人工智能：强人工智能（Artificial Generallnteligence /AGI),属于人类级别的人工智能，在各方面都能和人类比肩，它能够进行思考、计划、解决问题、抽象思维、理解复杂理念、快速学习和从经验中学习等操作，并且和人类一样得心应手。

           <br></br> 3）超人工智能：超人工智能（Artificial Superintelligence/ASI），在几乎所有领域都比最聪明的人类大脑都聪明许多，包括科学创新、通识和社交技能。在超人工智能阶段，人工智能已经跨过“奇点”，其计算和思维能力已经远超人脑。此时的人工智能已经不是人类可以理解和想象。人工智能将打破人脑受到的维度限制，其所观察和思考的内容，人脑已经无法理解，人工智能将形成一个新的社会。

            目前我们仍处于弱人工智能阶段。

           </p>
            <Divider >交流区</Divider>
            {
              power !== "2" &&
              <div >

                <Empty description={"登录且已通过身份认证的用户方可使用聊天室功能"} />
              </div>
            }
            {
              power == "2" && <Chat user={user}></Chat>
            }

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