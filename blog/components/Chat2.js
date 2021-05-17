import React, { Component } from 'react'

import { createRef } from "react";
import { ChatList, MessageList } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown'
// import BraftEditor from 'braft-editor'

import { Button, Row, Col, Divider, Input, List, Avatar } from "antd";

const { TextArea } = Input;
const BraftEditor = dynamic(
    import('braft-editor'),
    // import('../components/BraftEditor'),
    {
        ssr: false   //这个要加上,禁止使用 SSR
    }
)

export default class Chat2 extends Component {
    ws = null;
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            msgDataList: [],
            // editorState: BraftEditor.createEditorState(''), // 设置编辑器初始内容
            editorState: '', // 设置编辑器初始内容
            sendMsg: "",
            MSG: [],
            userList: [],
            clickUser: null,
            username: this.props.user
        }

    }
    componentDidMount() {
        let list = [];
        for (let i = 0; i < 14; ++i)
            list.push({
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                alt: 'Reactjs',
                title: '用户' + i,
                subtitle: 'What are you doing?',
                date: new Date(),
                unread: Math.floor(Math.random() * 10),
            });
        this.setState({ userList: list });
        this.setState({ clickUser: list[0] })
    }

    doMessage(msg) {
        const { MSG } = this.state;
        if (!msg) return
        const { name, data } = msg
        console.log("doMessage:", MSG)
        let arr = {
            title: msg.name,
            content: msg.data
        }
        MSG.push(arr)
        this.setState({
            MSG: MSG
        })


    }



    sendmessage() {
        console.log("点击按钮");
        const ws = this.ws
        if (ws.readyState === 1) {
            ws.send("你好");
        } else {
            //do something
            console.log();
        }
    }

    render() {

        return (
            <div>

                <Row>

                    {this.state.userList.length == 0 ? <div>无私信</div> : <ChatWidget user={this.state.clickUser} username={this.state.username} />}

                </Row>
            </div>
        )
    }
}
class ChatWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // user: null,
            msgDataList: [],
            sendMsg: "",
            editorState: '', // 设置编辑器初始内容
            tips: '',
            user: this.props.username
        }
        this.clickButton = this.clickButton.bind(this);
        this.messagesEnd = createRef();
    }

    componentDidMount() {

        fetch('http://localhost:5000/api/chat/enter?username=zhangsan').then(req => req.json())
            .then(data => {

                console.log("加入成功");
            })
        this.ws = new WebSocket('ws://localhost:4000');
        const ws = this.ws
        console.log("ws", ws)

        switch (ws.readyState) {
            case WebSocket.CONNECTING:
                console.log("CONNECTING");
                break;
            case WebSocket.OPEN:
                console.log("OPEN");

                break;
            case WebSocket.CLOSING:
                console.log("CLOSING");
                break;
            case WebSocket.CLOSED:
                console.log("CLOSED");
                break;
            default:
                // this never happens
                break;
        }
        console.log(this.state, "这是state")
        const user = this.state.user
        ws.onopen = function () {
            ws.send(user);
            console.log("链接服务器成功");
        }

        ws.onmessage = event => {
            console.log(event, "event");
            const { type, msg } = JSON.parse(event.data);
            console.log("type", type)
            if (Number(type) === 2) {
                this.doMessage(msg)
            }
            if (Number(type) === 0) {
                this.showTips(msg)
            }

        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ user: nextProps.user });
    }

    clickButton() {
        let list = this.state.msgDataList;
        list.push({
            position: 'right',
            type: 'text',
            // text: this.state.sendMsg,
            text:<ReactMarkdown
            source={this.state.sendMsg}
            escapeHtml={false}
          />,
            date: new Date(),
        })
        this.setState({ msgDataList: list });
        this.setState({ sendMsg: "" });
        // setTimeout(BraftEditor.createEditorState(''), 1000)
        // this.setState({ editorState: "" });
        const ws = this.ws
        if (ws.readyState === 1) {
            ws.send(this.state.sendMsg);
        } else {
            console.log();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
    }
    showTips(msg) {
        this.setState({
            tips: msg
        })
    }
    doMessage(msg) {
        console.log(msg, "msg");
        console.log(this.state, "eueueueueueuueueueueueu")
        let user = this.state.user
        if (msg.name == user) {
            return
        } else {
            let newReciveList = this.state.msgDataList
            newReciveList.push({
                position: 'left',
                type: 'text',
                text: <ReactMarkdown
                source={msg.data}
                escapeHtml={false}
              />,
                date: new Date(),
            });
            this.setState({
                ...this.state,
                msgDataList: newReciveList
            });
        }
    }
    sendmessage() {
        console.log("点击按钮");
        const ws = this.ws
        if (ws.readyState === 1) {
            ws.send("你好");
        } else {
            //do something
            console.log();
        }
    }
    render() {
        const controls = [
            {
                key: 'bold',
                text: <b>加粗</b>
            },
            'italic', 'underline', 'separator', 'emoji', 'link', 'separator', 'media'
        ]
        return (
            <div >
                <div style={{
                    width: 800,
                    height: 420,
                    textAlign: "center",
                    verticalAlign: "middle",
                    fontSize: 20,
                    overflow: "auto",
                    backgroundColor: "whitesmoke",
                    // border: "1px solid pink"
                }}
                    ref={(el) => {
                        this.messagesEnd = el;
                    }}
                >
                    {/* {this.state.tips} */}
                    <MessageList
                        className='message-list'
                        dataSource={this.state.msgDataList}
                    />
                </div>
                {/* <TextArea rows={4} onChange={e => {
                    this.setState({ sendMsg: e.target.value });
                }}
                    ref={el => (this.inputRef = el)}
                    value={this.state.sendMsg} /> */}
                <div className="editor_box">
                    <div className="chat_editor_box">
                        <BraftEditor
                            controls={controls}
                            ref={el => (this.inputRef = el)}
                            // value={}
                            contentStyle={{height: 210, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)'}}
                            onChange={e => {
                                this.setState({ sendMsg: e.toHTML() });
                            }}
                        />
                    </div>
                </div>
                <Button type="primary" onClick={this.clickButton}>发送</Button>
            </div>
           
        );
    }
}