import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import AddRecord from './Pages/AddRecord';
import Records from './Pages/Records';
import DynamicQuery from './Pages/DynamicQuery';
import Home from './Pages/Home';
import {HomeFilled,PlusCircleFilled,ProfileFilled,
  FileExcelFilled,CodeFilled, SaveFilled} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
function App()
{

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
            <Menu.Item key="/DynamicQuery"><Link to='/DynamicQuery'><CodeFilled />Query</Link></Menu.Item>
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
