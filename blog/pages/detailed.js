
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Row, Col, Affix, Breadcrumb, Divider, Button, Statistic, Modal, Popconfirm, message } from 'antd'
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
import { Comment, Tooltip, List, Empty } from 'antd';
import moment from 'moment';
import CommentCom from '../components/Comment'
import ReactMarkdown from 'react-markdown'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
  LikeTwoTone,
  LikeOutlined,
  HeartTwoTone,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import CheckableTag from 'antd/lib/tag/CheckableTag'
const BraftEditor = dynamic(
  import('../components/BraftEditor'),
  {
    ssr: false   //这个要加上,禁止使用 SSR
  }
)

const Detailed = (props) => {
  const router = useRouter();

  const { id, user, power } = router.query;
  console.log(id, user, power, "这是拿到的值");

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
      })
  }, [value])

  const username = Cookies.get(username)
  console.log(username.username, "Cookies.get(username)");
  const userPower = Cookies.get(userPower)
  console.log(userPower.userPower, "Cookies.get(userPower)");
  const onSubmit = () => {
    showModal()
    // Router.push('./addArtical' ,{query:{artid:id}})
    console.log("跳转笔记页面");
  }
  const tobad = () => {
    fetch(`http://localhost:5000/api/blog/bad?id=${id}&isBad=1`).then(req => req.json())
      .then(data => {
        console.log(data, "--------------");

      })
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
  const confirm = () => {
    fetch(`http://localhost:5000/api/blog/bad?id=${id}&isBad=1`).then(req => req.json())
      .then(data => {
        console.log(data, "--------------");
      })
    message.success('举报成功');
  }
  const cancel = () => {
    // message.error('Click on No');
  }
  const dolike = ()=>{
    
  }
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

                作者：{articaldetail.username}<br />
                简介：{articaldetail.description}
                <ReactMarkdown
                  source={articaldetail.content}
                  escapeHtml={false}
                />
              </div>
            </div>
          </div>
          <div className="action_btnbox">
            {
              articaldetail.username == usernameCookie &&
              <div className="editArticle"><Button onClick={onSubmit} >
                修改成果
            </Button></div>
            }
            <div className="editArticle"><Button icon={<LikeTwoTone />} onClick={dolike} type="primary">
              点赞
            </Button></div>
            <div className="editArticle">
              <Popconfirm
                title="您确定要举报该成果么"
                onConfirm={confirm}
                onCancel={cancel}
                okText="确定"
                cancelText="取消"
              >
                <Button href="#" type="dashed" danger  >举报</Button>
                {/* <a >Delete</a> */}
              </Popconfirm>,</div>

          </div>

          {/* <Divider ><Statistic value={1128} prefix={<LikeOutlined />} /> </Divider> */}
          <Divider >评论区</Divider>
          {
            power !== "2" && <div><Empty description={"登录且已通过身份认证的用户方可使用评论功能"} /></div>
          }
          {
            power == "2" && <CommentCom id={id} />
          }

        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author username={username.username} />
          <Suggest />
          <Affix offsetTop={5}>

          </Affix>
        </Col>
      </Row>
      <Modal title="编辑文章" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000} footer={null}>
        <BraftEditor id={id} ></BraftEditor>
      </Modal>
      <Footer />

    </>
  )
}
export default Detailed