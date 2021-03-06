import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Card, Input, Button,Spin,message } from 'antd'
import '../style/Login.css'
import {
    UserOutlined,
    KeyOutlined
  } from '@ant-design/icons';
  import servicePath from '../config/apiUrl'
  import axios from 'axios'

function Login(props) {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const checkLogin = ()=>{
        setIsLoading(true)

        if(!userName){
            message.error('用户名不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }else if(!password){
            message.error('密码不能为空')
            return false
        }
        let dataProps = {
            'username':userName,
            'password':password
        }
        console.log(dataProps,"dataProps");
        axios.post('http://localhost:5000/api/admin/login',dataProps).then((res)=>{
            if(res.data.msg=='登录成功'){
                localStorage.setItem('openId',res.data.openId)
                props.history.push('/index')
            }else{
                message.error('用户名密码错误')
            }
        })

        setTimeout(()=>{
            setIsLoading(false)
        },1000)
    }
    
    const hello =()=>{
        axios.get('http://localhost:5000/api/user/tt')
	  .then(function (e) {
		console.log(e.data);
	  })
	  .catch(function (error) {
		console.log(error);
	  });

    }

    return (
        <div className="login-div">
            {/* <Button onClick={hello}>点击</Button> */}
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="登录" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="请输入账号"
                        prefix={<UserOutlined />}
                        onChange={(e)=>{setUserName(e.target.value)}}
                    /> 
                    <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="请输入密码"
                        prefix={<KeyOutlined />}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />     
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin} > 登录 </Button>
                </Card>
            </Spin>
        </div>
    )
}
export default Login