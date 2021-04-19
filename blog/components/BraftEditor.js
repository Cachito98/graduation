import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
export default class BasicDemo extends React.Component {

  state = {
    editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
    outputHTML: '<p></p>',
    articleData: {
      username: 'zhangsan',
      title: '',
      description: '',
      content: ''
    }
  }


  componentDidMount() {
    this.isLivinig = true
    // 3秒后更改编辑器内容
    setTimeout(this.setEditorContentAsync, 3000)
  }

  componentWillUnmount() {
    this.isLivinig = false
  }

  handleChange = (editorState) => {
    this.setState({
      // ...this.state,
      editorState: editorState,
      outputHTML: editorState.toHTML(),
      articleData: {
        ...this.state.articleData,
        content: editorState.toHTML(),
      }
    })
  }

  setEditorContentAsync = () => {
    this.isLivinig && this.setState({
      editorState: BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>')
    })
  }
  submitC = () => {
    console.log(this.state.articleData);
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
            // Router.push('/')
        })
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
  }

  render() {

    const { editorState, outputHTML } = this.state
    const inputChange = e => {
      console.log( e.target.value);
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
          description:e.target.value
        }
      })
    };
    return (
      <div >
        <div className="antd-input-body">
          <h2 >标题:</h2>
          <Input placeholder="请输入标题" onChange={inputChange} />
          <h2 >简介:</h2>

          <TextArea placeholder="" allowClear onChange={textareaChange} />
          <h2 >关键词:</h2>

          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={['a10', 'c12']}
            onChange={this.handleChange2}
          >
            {children}
          </Select>
        </div>

        <div className="editor-wrapper">

          <BraftEditor
            value={editorState}
            onChange={this.handleChange}
          />
        </div>
        <h5>输出内容</h5>
        <div className="output-content">{outputHTML}</div>
        <div>你好</div>
        <Button onClick={this.submitC}>提交</Button>
      </div>
    )

  }

}