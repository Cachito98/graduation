import React, { useState, useCallback, useRef } from 'react';
import Cookies from 'js-cookie'
// import cookie from 'react-cookies'
// import Captcha from 'react-captcha-code';
import Captcha from '../components/Captcha'
import Router from 'next/router'
// import onLogin from '../components/cookie'
import { Alert, Space, message, Tabs, Button, Form, Input, Checkbox, Cascader, Select, Row, Col, notification, AutoComplete, Card } from 'antd';
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

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
function callback(key) {
    console.log(key);
}

const residences = [
    {
        value: '本科',
        label: '本科',

    },
    {
        value: '研究生',
        label: '研究生',

    },
];
const success = () => {
    message.success('登录成功');
};
const error = () => {
    message.error('账号密码有误，请重新输入');
};
const success2 = () => {
    message.success('注册成功，请前往登录');
};

export default function Login(props) {

    const [form] = Form.useForm();

    const onFinish = (values) => {

        console.log('Success:', values);
        console.log(values);
        fetch('http://localhost:5000/api/user/login', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(//请求的参数
                values
            )
        }).then(res => res.json()).then(data => {
            console.log(data) //请求的结果
            if (data.code == "1004") {
                console.log("登录失败，账号密码错误");
                error()
            } else {
                console.log(data.data[0].review, "权限") //请求的结果
                Cookies.set("username", values.username, { path: '/' });
                Cookies.set("isLogin", "yes", { path: '/' });
                Cookies.set("power", data.data[0].review, { path: '/' });
                success()
                Router.push('/')
            }

        })
    };
    const onFinish2 = (values) => {
        // console.log('Received values of form: ', values);
        let userinfo = {
            username:values.username,
            realname:values.realname,
            password:values.password,
            email:values.email,
            introduce:values.introduce,
            school:values.school,
            edu:values.residence[0],
            username:values.username,
            imgurl:values.imgurl,
        }
        fetch('http://localhost:5000/api/user/res', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(//请求的参数
                userinfo
            )
        }).then(res => res.json()).then(data => {
            console.log(data,"返回的结果") //请求的结果
                success2()
        })
        Router.push('/Login')
        

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="loginBox">
            <Card className="CardBox" style={{ width: 450 }}>
                <Tabs centered defaultActiveKey="1" onChange={callback}>
                    <TabPane className="logincontentBox" tab="登录" key="1">
                        <Form
                            className="logincontentBox"
                            {...layout}
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >

                            <Form.Item
                                label="账号"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label="验证码"
                                name="vcode"
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Captcha ></Captcha>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    登录
                            </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab="注册" key="2">
                        <Form
                            className="logincontentBox"
                            {...formItemLayout}
                            form={form}
                            name="register"
                            onFinish={onFinish2}
                            initialValues={{
                                residence: ["本科"],
                                prefix: '86',
                            }}
                            scrollToFirstError
                        >
                            <Form.Item
                                name="username"
                                label="账号"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入账号！',
                                    },
                                ]}
                            >
                                <Input
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="邮箱"
                                rules={[
                                    {
                                        type: 'email',
                                        message: '请输入正确的邮箱格式',
                                    },
                                    {
                                        required: true,
                                        message: '邮箱不能为空',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="realname"
                                label="真实姓名"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入真实姓名',
                                    },
                                ]}
                            >
                                <Input
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="school"
                                label="学校"
                                rules={[

                                    {
                                        required: true,
                                        message: '学校不能为空',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="residence"
                                label="学历"
                                rules={[
                                    {
                                        // type: 'array',
                                        required: true,
                                        message: '请选择您的学历',
                                    },
                                ]}
                            >
                                <Select style={{ width: 120 }}>
                                    <Option value="本科">本科</Option>
                                    <Option value="研究生">研究生</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="密码"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="确认密码"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: '请再次确认密码！',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('两次密码不匹配！'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="imgurl"
                                label="头像地址"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入头像图片地址！',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="introduce"
                                label="个人介绍"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入个人介绍！',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <TextArea />
                            </Form.Item>
                            <Form.Item
                                label="验证码"
                                name="vcode"
                                rules={[
                                    {
                                        required: true,
                                        message: '',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Captcha ></Captcha>
                            {/* <Form.Item
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                    },
                                ]}
                                {...tailFormItemLayout}
                            >
                                {/* <Checkbox>
                                    我已阅读 <a href="">“声明”</a>
                                </Checkbox> */}
                            {/* </Form.Item>  */}
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">
                                    注册
                        </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>

            </Card>

        </div>

    )
}
export const Basic = () => {
    const handleChange = useCallback((captcha) => {
        console.log('captcha:', captcha);
    }, []);

    const captchaRef = useRef < HTMLCanvasElement > ({});

    const handleClick = () => {
        // 刷新验证码
        captchaRef.current.refresh();
    };

    return (
        <>
            <Captcha ref={captchaRef} charNum={6} onChange={handleChange} />
            <div>
                <button onClick={handleClick}>更换验证码</button>
            </div>
        </>
    );
};