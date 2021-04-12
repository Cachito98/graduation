import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;
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

export default class BasicDemo extends React.Component {

  state = {
    editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
    outputHTML: '<p></p>',
    articleData: {
      username: '',
      title: '',
      articalType: '',
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
  }
   handleChange1=(value)=> {
  console.log(`selected ${value}`);
  this.setState({
    ...this.state,
    articleData: {
      ...this.state.articleData,
      articalType: value
    }
  })
}


render() {

  const { editorState, outputHTML } = this.state

  return (
    <div >


      <div className="editor-wrapper">
        标题：<Input placeholder="Basic usage"  />
        简介：<Input placeholder="Basic usage" />
        课题类型：<Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange1}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>
            Disabled
            </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
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