import React from 'react'
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? '条评论' : '条评论'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        评论
      </Button>
    </Form.Item>
  </>
);

class CommentCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      submitting: false,
      value: '',
    };;
  }
  

  componentDidMount(){
    const pinglun = []
    let {id} = this.props

    fetch(`http://localhost:5000/api/meg/get?artid=${id}`).then(req => req.json())
      .then(data => {
        console.log(data,"--------------");
        if(data.data ){
          data.data.forEach(item => {
            console.log(item.megs,"id");
            const pinglunlist = {
              author: item.megs.username,
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: <p>{item.megs.text}</p>,
              datetime: moment().fromNow(),
            }
            pinglun.push(pinglunlist)
            console.log(pinglun);
            this.setState({
              comments:pinglun
            })
          })
        }
      })
      .catch(
        ()=>{console.log("当前没有评论");}
      )
  }
 
  handleSubmit = () => {
    let {id} = this.props
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });
    fetch('http://localhost:5000/api/meg/add', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({//请求的参数
        username:'zhangsan',
        artid:id,
        text:this.state.value
      })
    }).then(res => res.json()).then(data => {
      console.log(data) //请求的结果
      this.setState({
        submitting: false,
        value: '',
        comments: [
          ...this.state.comments,
          {
            author: 'zhangsan',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
        ],
      });
    })

  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="热心市民"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </>
    );
  }
}

export default CommentCom