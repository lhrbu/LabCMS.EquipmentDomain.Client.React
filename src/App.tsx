import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import AddRecord from './Pages/AddRecord';
import Records from './Pages/Records';
import DynamicQuery from './Pages/DynamicQuery';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Admin from './Pages/Admin';
import Visualize from './Pages/Visualize';

import {HomeFilled,PlusCircleFilled,ProfileFilled,
  LoginOutlined,CodeFilled, SaveFilled,DatabaseFilled,BarChartOutlined} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
function App()
{
  const [hiddenAdminFlag,setHideAdminFlag] = useState<boolean>(true);
  const admintLinkRef = useRef<HTMLAnchorElement>(null);
  

  return (
    <Layout className="layout">
      <BrowserRouter>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[window.location.pathname]} style={{fontSize:'16px'}}
            >
            <Menu.Item key="/"><Link to='/'><HomeFilled />Home</Link></Menu.Item>
            <Menu.Item key="/AddRecord"><Link to='/AddRecord'><PlusCircleFilled />Add Record</Link></Menu.Item>
            <Menu.Item key="/Records"><Link to='/Records'><ProfileFilled />Records</Link></Menu.Item>
            <Menu.Item key="/api/UsageRecords/ExcelInterop"><a href='/api/UsageRecords/ExcelInterop' target="_blank"><SaveFilled />Excel</a></Menu.Item>
            <Menu.Item key="/Visualize"><Link to='/Visualize'><BarChartOutlined />Visualize</Link></Menu.Item>
            <Menu.Item key="/DynamicQuery"><Link to='/DynamicQuery'><CodeFilled />Query</Link></Menu.Item>
            <Menu.Item key="/Login" hidden={!hiddenAdminFlag}><Link to='/Login'><LoginOutlined />Login</Link></Menu.Item>
            <Menu.Item key="/Admin" hidden={hiddenAdminFlag} 
              ><Link ref={admintLinkRef} id='AdminMenuDom' to="/Admin"><DatabaseFilled />Admin</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 28px' }}>
          <div className="site-layout-content">
            <Switch>
              <Route exact path='/AddRecord'>
                <div style={{padding:'2rem 10rem 0rem 10rem'}}>
                  <AddRecord />
                </div>
              </Route>
              <Route exact path='/Records'>
                <Records />
              </Route>
              <Route exact path='/DynamicQuery'>
                <DynamicQuery />
              </Route>
              <Route exact path='/Login'>
                <Login OnLogin={()=>{
                  setHideAdminFlag(false);
                  admintLinkRef.current?.click();
                  //const dom = document.getElementById('AdminMenuDom');
                  //document.getElementById('AdminMenuDom')?.click();
                  }}/>
              </Route>
              <Route exact path='/Admin'>
                <Admin />
              </Route>
              <Route exact path='/Visualize'>
                <Visualize />
              </Route>
              <Route path='/'>
                <Home />
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
