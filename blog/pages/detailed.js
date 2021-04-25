
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Row, Col, Affix, Breadcrumb, Divider, Button, Statistic,Modal } from 'antd'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MarkNav from 'markdown-navbar';
import Suggest from '../components/Suggest'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import 'markdown-navbar/dist/navbar.css';
import axios from 'axios'
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'
import servicePath from "../config/apiUrl";
import { Comment, Tooltip, List } from 'antd';
import moment from 'moment';
import CommentCom from '../components/Comment'
import ReactMarkdown from 'react-markdown'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
  LikeOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
const BraftEditor = dynamic(
  import('../components/BraftEditor'),
  {
    ssr: false   //这个要加上,禁止使用 SSR
  }
)

const Detailed = (props) => {
  const router = useRouter();

  const { id } = router.query;
  console.log(id);

  const [value, setValue] = useState('');
  const [usernameCookie, setUsernameCookie] = useState('')
  const [isLoginCookie, setIsLoginCookie] = useState('')
  const [articaldetail, setArticaldetail] = useState([])
  const [articalAuthor, setArticalAuthor] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    const username = Cookies.get(username)
    const isLogin = Cookies.get(isLogin)
    if (username) {
      console.log("获取cookie，有值", username.username);
      setUsernameCookie(username.username)
      setIsLoginCookie(isLogin.isLogin)
    } else {
      console.log("获取cookie，没有值");

    }
    console.log(id, "id");

    fetch(`http://localhost:5000/api/blog/art?_id=${id}`).then(req => req.json())
      .then(data => {
        console.log(data.data[0], "--------------");
        setArticaldetail(data.data[0])

        console.log(articaldetail, "articaldetail");
      })
  }, [value])
  
  const username = Cookies.get(username)
  console.log(username.username, "Cookies.get(username)");
  const userPower = Cookies.get(userPower)
  console.log(userPower.userPower, "Cookies.get(userPower)");
  const onSubmit=()=>{
    showModal()
    // Router.push('./addArtical' ,{query:{artid:id}})
    console.log("跳转笔记页面");
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Head>
        <title>详细页</title>
      </Head>
      <Header isLogin={isLoginCookie} username={usernameCookie} />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              {/* <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>课题研究</Breadcrumb.Item>
                <Breadcrumb.Item>神经网络课题研究</Breadcrumb.Item>
              </Breadcrumb> */}
            </div>
            <div>
              <div className="detailed-title">
                {articaldetail.title}
              </div>
              <div className="detailed-content" >
                
                作者：{articaldetail.username}<br/>
                简介：{articaldetail.description}
                <ReactMarkdown
                  source={articaldetail.content}
                  escapeHtml={false}
                />
                
              </div>
            </div>
          </div>
          {
              articaldetail.username == usernameCookie&&
              <div className="editArticle"><Button htmlType="submit"  onClick={onSubmit} type="primary">
              修改成果
            </Button></div>
          }
          <Divider ><Statistic value={1128} prefix={<LikeOutlined />} /> </Divider>
          <Divider >评论区</Divider>
          <CommentCom id={id} />
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author username={username.username} />
          <Suggest />
          <Affix offsetTop={5}>

          </Affix>
        </Col>
      </Row>
      <Modal title="编辑文章" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
      <BraftEditor  ></BraftEditor>
      </Modal>
      <Footer />

    </>
  )
}

Detailed.getInitialProps = async (context) => {

  console.log(context.query.id, "`111")
  const promise = new Promise((resolve) => {

    axios.get(`http://localhost:5000/api/blog/art?_id=${context.query.id}`,).then(
      (res) => {
        console.log('远程获取数据结果:', res.data.data[0])

        // setMylist(res.data.data[0])
        // console.log(object);
        resolve(res.data, "res.data.data[0]")
      }
    )
  })

  return await promise
}

export default Detailed