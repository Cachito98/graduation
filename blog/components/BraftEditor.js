import React from 'react'
import BraftEditor from 'braft-editor'
import Router, { withRouter } from 'next/router'
import 'braft-editor/dist/index.css'
import { Form, Input, Button, Select, message, Divider } from 'antd';
import Cookies from 'js-cookie'
import {
  HomeOutlined,
  YoutubeOutlined,
  SmileOutlined,
  DownOutlined,
  CodepenOutlined,
} from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;

const children = [
  <Option key={"人工智能"}>{"人工智能"}</Option>,
  <Option key={"神经网络"}>{"神经网络"}</Option>,
  <Option key={"PHP"}>{"PHP"}</Option>,
  <Option key={"智能学习"}>{"智能学习"}</Option>,
  <Option key={"科研成果"}>{"科研成果"}</Option>,
];
// for (let i = 10; i < 36; i++) {
//   children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
// }
const success = () => {
  message.success('发布成功');
};
export default class BasicDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: '', // 设置编辑器初始内容
      outputHTML: '<p></p>',
      articleData: {
        username: this.props.user,
        title: '',
        description: '',
        content: '',
        editorState: '',
        tags: '',
        blogimgurl: ""
      }
    };
  }


  componentDidMount() {
    const username = Cookies.get(username)
    const isLogin = Cookies.get(isLogin)
    if (username) {
      this.setState({
        ...this.state,
        usernameCookie: username.username,
        isLoginCookie: isLogin.isLogin,
        articleData: {
          ...this.state.articleData,
          username: username.username,
        }
      })
    }
    this.isLivinig = true
  }

  componentWillUnmount() {
    this.isLivinig = false
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML(),
      articleData: {
        ...this.state.articleData,
        content: editorState.toHTML(),
        editorState: editorState
      }
    })
  }

  submitC = () => {
    console.log(this.state.articleData, "要提交的内容");
    fetch('http://localhost:5000/api/blog/addart', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(//请求的参数
        this.state.articleData
      )
    }).then(res => res.json()).then(data => {
      console.log(data) //请求的结果
      success()
    })
    Router.push('./')
  }
  handleChange1 = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      ...this.state,
      articleData: {
        ...this.state.articleData,
        articalType: value
      }
    })
  }


  handleChange2 = (value) => {
    console.log(`selected ${value}`);
    
    this.setState({
      ...this.state,
      articleData: {
        ...this.state.articleData,
        tags: value
      }
    }, () => { console.log(this.state.articleData) })
  }

  render() {

    const { editorState, outputHTML } = this.state
    const inputChange = e => {
      console.log(e.target.value);
      this.setState({
        articleData: {
          ...this.state.articleData,
          title: e.target.value
        }
      })
    }
    const textareaChange = e => {
      this.setState({
        articleData: {
          ...this.state.articleData,
          description: e.target.value
        }
      })
    };
    const blogimgurlChange = e => {
      this.setState({
        articleData: {
          ...this.state.articleData,
          blogimgurl: e.target.value
        }
      })
    };

    return (
      <div >
        <div className="antd-input-body" >
          <div className="antd-input-body-left">
            <h2 >标题:</h2>
            <Input placeholder="请输入标题" onChange={inputChange} value={this.state.articleData.title} />
            <h2 >简介:</h2>
            <TextArea placeholder="" allowClear onChange={textareaChange} value={this.state.articleData.description} />
            <h2 >封面图片地址:</h2>
            <Input onChange={blogimgurlChange} value={this.state.articleData.blogimgurl} />
            <h2 >关键词:</h2>

            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              // placeholder="Please select"
              // defaultValue={['a10', 'c12']}
              onChange={this.handleChange2}
            >
              {children}
            </Select>
          </div>
          <div className="antd-input-body-right">
            <p>请依次输入标题、简介、关键词并上传封面图片</p>

          </div>
        </div>

        <Divider />
        <div className="editor_box">
          <div className="editor-wrapper">

            <BraftEditor
              value={editorState}
              onChange={this.handleChange}
            />
          </div>
        </div>

        {/* <h5>输出内容</h5>
        <div className="output-content">{outputHTML}</div>
        <div>你好</div> */}
        <div className="editor-btn">
          <Button type="primary" shape="round" onClick={this.submitC}>提交</Button>
        </div>

      </div>
    )

  }

}