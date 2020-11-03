import React, { Fragment } from 'react';
import { Button, Form, Input, Typography, Collapse } from 'antd';
import ProjectsWebAPI from '../WebAPIs/ProjectsWebAPI';
import ProjectsWebCacheService from '../Services/ProjectsWebCacheService';
import Project from '../Models/Project';

import EquipmentHourlysRatesWebAPI from '../WebAPIs/EquipmentHourlyRatesWebAPI';
import EquipmentHourlyRatesWebCacheService from '../Services/EquipmentHourlyRatesWebCacheService';
import EquipmentHourlyRate from '../Models/EquipmentHourlyRate';

import UsageRecordsWebAPI from '../WebAPIs/UsageRecordsWebAPI';

const { Panel } = Collapse;


const _projectsWebAPI = new ProjectsWebAPI();
const _projectsWebCacheService = ProjectsWebCacheService.Instance();

const _equipmentHourlyRatesWebAPI = new EquipmentHourlysRatesWebAPI();
const _equipmentHourlyRatesWebCaceService = EquipmentHourlyRatesWebCacheService.Instance();

const _usageRecordsWebAPI = new UsageRecordsWebAPI();

export default function Admin() {
    return (

        <Fragment>
            <Collapse accordion>
                <Panel header="Add or update Project" key="AddProject">
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
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
                <Panel header="Add or update Equipment Hourly Rate" key="AddEquipmentHourlyRate">
                <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
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
            </Collapse>

        </Fragment>
    )

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
}