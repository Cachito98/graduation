import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import '../style/AdminIndex.css'
import { Link, Route } from "react-router-dom";
import AddArticle from './AddArticle'
// import ArticalAudit from './ArticalAudit'
import { OmitProps } from 'antd/lib/transfer/ListBody';
import ArticleList from './ArticleList'
import Userlist from './UserList'
import LinkList from './LinkList';
import GroupList from './GroupList';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function AdminIndex(props) {

    const [collapsed, setCollapsed] = useState(false)

    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    };
    const handleClickArticle = e => {
        console.log(e.item.props)
        if (e.key == 'addArticle') {
            props.history.push('/index/add')
        } else {
            props.history.push('/index/list')
        }

    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" >科研成果后台管理系统</div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

                    {/*  
                    <SubMenu
                        key="sub1"
                        onClick={handleClickArticle}
                        title={
                            <span>
                                
                                <span>文章审核</span>
                            </span>
                        }
                    >
                        <Menu.Item key="addArticle">添加文章</Menu.Item>
                        <Menu.Item key="articleList">文章列表</Menu.Item>

                    </SubMenu>
                */}
                    <Menu.Item key="9" onClick={() => { props.history.push('/index/userlist') }} >
                        {/* <Icon type="file" /> */}
                        <span>用户管理</span>
                    </Menu.Item>
                    <Menu.Item key="10" onClick={() => { props.history.push('/index/articlelist') }} >
                        {/* <Icon type="file" /> */}
                        <span>文章管理</span>
                    </Menu.Item>
                    <Menu.Item key="11" onClick={() => { props.history.push('/index/linklist') }} >
                        {/* <Icon type="file" /> */}
                        <span>链接管理</span>
                    </Menu.Item>
                    <Menu.Item key="12" onClick={() => { props.history.push('/index/grouplist') }} >
                        {/* <Icon type="file" /> */}
                        <span>课题组成员信息</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>后台管理</Breadcrumb.Item>
                        <Breadcrumb.Item>工作台</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <div>
                            <Route path="/index/" exact component={AddArticle} />
                            <Route path="/index/add/" exact component={AddArticle} />
                            <Route path="/index/articlelist/" exact component={ArticleList} />
                            <Route path="/index/userlist/" exact component={Userlist} />
                            <Route path="/index/linklist/" exact component={LinkList} />
                            <Route path="/index/grouplist/" exact component={GroupList} />
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>后台管理系统</Footer>
            </Layout>
        </Layout>
    )

}

export default AdminIndex