import React, { Fragment, useEffect, useState } from 'react';
import { Button, Form, Input, Typography, Collapse } from 'antd';
import ProjectsWebAPI from '../WebAPIs/ProjectsWebAPI';
import ProjectsWebCacheService from '../Services/ProjectsWebCacheService';
import Project from '../Models/Project';

import EquipmentHourlysRatesWebAPI from '../WebAPIs/EquipmentHourlyRatesWebAPI';
import EquipmentHourlyRatesWebCacheService from '../Services/EquipmentHourlyRatesWebCacheService';
import EquipmentHourlyRate from '../Models/EquipmentHourlyRate';

import UsageRecordsWebAPI from '../WebAPIs/UsageRecordsWebAPI';
import LoginCheckService from '../Services/LoginCheckService';

const { Panel } = Collapse;


const _projectsWebAPI = new ProjectsWebAPI();
const _projectsWebCacheService = ProjectsWebCacheService.Instance();

const _equipmentHourlyRatesWebAPI = new EquipmentHourlysRatesWebAPI();
const _equipmentHourlyRatesWebCaceService = EquipmentHourlyRatesWebCacheService.Instance();

const _usageRecordsWebAPI = new UsageRecordsWebAPI();
const _loginCheckService = LoginCheckService.Instance();
export default function Admin() {

    const [visibleFlag,setVisibleFlag] = useState<boolean>(false);
    useEffect(()=>{
        setVisibleFlag(_loginCheckService.LoginStatus());
    });

    return visibleFlag?(

        <Fragment>
            <Collapse accordion>
                <Panel header="Add or update Project" key="AddProject">
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 12 }}
                        onFinish={OnProjectSubmitAsync}
                    >
                        <Form.Item
                            label="Project No."
                            name="No"
                            rules={[{ required: true, message: 'Please input project No!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Project Name"
                            name="FullName"
                            rules={[{ required: true, message: 'Please input project name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </Panel>

                <Panel header="Delete Project" key="DeleteProject">
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 12 }}
                        onFinish={OnProjectDeleteAsync}>
                            <Form.Item
                            label="Project Name."
                            name="Name"
                            rules={[{ required: true, message: 'Please input project Name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <Button type="primary" danger htmlType="submit">Delete</Button>
                        </Form.Item>

                   </Form>
                </Panel>

                <Panel header="Add or update Equipment Hourly Rate" key="AddEquipmentHourlyRate">
                <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 12 }}
                        onFinish={OnEquipmentHourlyRateSubmitAsync}
                    >
                        <Form.Item
                            label="Equipment No"
                            name="EquipmentNo"
                            rules={[{ required: true, message: 'Please input equipment no!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Equipment Name"
                            name="EquipmentName"
                            rules={[{ required: true, message: 'Please input equipment name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Machine Category"
                            name="MachineCategory"
                            rules={[{ required: true, message: 'Please input machine category!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Hourly Rate"
                            name="HourlyRate"
                            rules={[{ required: true, message: 'Please input hourly rate!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Form>
                </Panel>

                <Panel header="Delete Equipment Hourly Rate" key="DeleteEquipmentHourlyRate">
                <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 12 }}
                        onFinish={OnEquipmentHourlyRateDeleteAsync}>
                            <Form.Item
                            label="Equipment No."
                            name="No"
                            rules={[{ required: true, message: 'Please input equipment No!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <Button type="primary" danger htmlType="submit">Delete</Button>
                        </Form.Item>

                   </Form>
                </Panel>
            </Collapse>

        </Fragment>
    ):<div style={{margin:'128px,256px'}}>Not Authorized to view this page!</div>;

    async function OnProjectSubmitAsync(values: any) {
        const project = Object.assign(new Project(), values);
        if (_projectsWebCacheService.CachedProjects.find(item => (item.No === values.No && item.FullName===values.FullName))) {
            window.alert(`${values.No} is already exists, can't add a new one with same project no`);
            return;
        }else if(_projectsWebCacheService.CachedProjects.find(item=>item.FullName === values.FullName))
        {
            if(window.confirm("Sure to update the project?"))
            {
                await _projectsWebAPI.PutAsync(project);
            }else{return;}
        }else{
            if(window.confirm("Sure to add the project?"))
            {
                await _projectsWebAPI.PostAsync(project); 
            }else{return;}
        }
        await _projectsWebCacheService.RefreshCacheAsync();
        await _usageRecordsWebAPI.ReloadCacheAsync();
        window.alert('Add successfully!');
    }

    async function OnProjectDeleteAsync(values:any) {
        if(_projectsWebCacheService.CachedProjects.find(item=>item.FullName===values.Name))
        {
            if(window.confirm("Sure to delete the project?"))
            {
                try{
                    await _projectsWebAPI.DeleteByNameAsync(values.Name);
                    await _projectsWebCacheService.RefreshCacheAsync();
                    await _usageRecordsWebAPI.ReloadCacheAsync();
                    window.alert("Delete successful!");
                }catch(error)
                {
                    window.alert("Server internal error, can't delete the project!");
                }
            }
        }else{
            window.alert("Project name doesn't exist!");
        }
    }

    async function OnEquipmentHourlyRateSubmitAsync(values:any)
    {
        
        const equipmentHourlyRate = Object.assign(new EquipmentHourlyRate(),values);
        
        if(_equipmentHourlyRatesWebCaceService.CachedEquipmentHourlyRates.find(item=>item.EquipmentNo===values.No))
        {
            if(window.confirm("Sure to update the equipment hourly rate?"))
            {
                await _equipmentHourlyRatesWebAPI.PutAsync(equipmentHourlyRate);
            }else{return;}
        }else{
            if(window.confirm("Sure to add the equipment hourly rate?")){
                await _equipmentHourlyRatesWebAPI.PostAsync(equipmentHourlyRate);
            }else{return;}
        }
        await _equipmentHourlyRatesWebCaceService.RefreshCacheAsync();
        await _usageRecordsWebAPI.ReloadCacheAsync();
        window.alert('Add successfully!');
    }

    async function OnEquipmentHourlyRateDeleteAsync(values:any) {
        if(_equipmentHourlyRatesWebCaceService.CachedEquipmentHourlyRates.find(item=>item.EquipmentNo===values.No))
        {
            if(window.confirm("Sure to delete the equipment hourly rate?"))
            {
                try{
                    await _equipmentHourlyRatesWebAPI.DeleteByIdAsync(values.No);
                    await _equipmentHourlyRatesWebCaceService.RefreshCacheAsync();
                    await _usageRecordsWebAPI.ReloadCacheAsync();
                    window.alert("Delete successful!");
                }catch(error)
                {
                    window.alert("Server internal error, can't delete the equipment hourly rate!");
                }
            }
        }else{
            window.alert("Equipment No doesn't exist!");
        }
    }

    
}