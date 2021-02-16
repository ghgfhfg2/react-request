import React from "react";
import { Layout, Menu } from 'antd';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import List from "component/List"
import Write from "component/Write"
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="./list">list</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="./write">write</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{width:"1200px",margin:"20px auto",background:"#fff",padding:"20px",minHeight:"500px"}}>
          <Switch>
            <Route exact path="/list" component={List} />
            <Route exact path="/write" component={Write} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>metree_dev ©{new Date().getFullYear()} Created by SY&amp;KW</Footer>
      </Layout>
    </>
  );
}

export default App;
