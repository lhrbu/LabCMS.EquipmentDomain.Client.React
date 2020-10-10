import React from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import AddRecord from './Pages/AddRecord';
import Records from './Pages/Records';

const { Header, Content, Footer } = Layout;


function App()
{
  return (
    <Layout className="layout">
      <BrowserRouter>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><Link to='/'>Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to='/AddRecord'>Add Record</Link></Menu.Item>
            <Menu.Item key="3"><Link to='/Records'>Records</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Switch>
              <Route exact path='/AddRecord'>
                <AddRecord />
              </Route>
              <Route exact path='/Records'>
                <Records />
              </Route>
              <Route path='/'>
                Home Page
            </Route>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>LabCMS.EquipmentDomain ©2020 Created by Raccoon Li</Footer>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
