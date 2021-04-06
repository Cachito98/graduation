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
    outputHTML: '<p></p>'
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
      editorState: editorState,
      outputHTML: editorState.toHTML()
    })
  }

  setEditorContentAsync = () => {
    this.isLivinig && this.setState({
      editorState: BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>')
    })
  }
  formRef = React.createRef();
  onGenderChange = (value) => {
    switch (value) {
      case 'male':
        this.formRef.current.setFieldsValue({
          note: 'Hi, man!',
        });
        return;

      case 'female':
        this.formRef.current.setFieldsValue({
          note: 'Hi, lady!',
        });
        return;

      case 'other':
        this.formRef.current.setFieldsValue({
          note: 'Hi there!',
        });
    }
  };
  onFinish = (values) => {
    console.log(values);
  };

  render() {

    const { editorState, outputHTML } = this.state

    return (
      <div className="braft_box">
        
          <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
            <Form.Item
              name="title"
              label="文章标题"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="课题"
              label="所属课题"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder=""
                onChange={this.onGenderChange}
                allowClear
              >
                <Option value="课题一">课题一</Option>
                <Option value="课题二">课题二</Option>
                <Option value="课题三">课题三</Option>
              </Select>
            </Form.Item>


            <Form.Item
              name="outputHTML"
              label="文章内容"
              rules={[
                // {
                //   required: true,
                // },
              ]}
            >
              <div className="editor-wrapper">
              <BraftEditor
                value={editorState}
                onChange={this.handleChange}
              />
              </div>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                提交
            </Button>
            </Form.Item>
          </Form>

     
        {/* <h5>输出内容</h5>
        <div className="output-content">{outputHTML}</div> */}
      </div>
    )

  }

}