import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import UsageRecord from '../Models/UsageRecord';
import EquipmentHourlyRatesWebCacheService from '../Services/EquipmentHourlyRatesWebCacheService';
import ProjectsWebCacheService from '../Services/ProjectsWebCacheService';
import TimeStampStringConverter from '../Services/TimeStampStringConverter';
import TimeFormatValidateHelper from '../Services/TimeFormatValidateService';

const { Option } = Select;
const _equipmentHourlyRatesCache = EquipmentHourlyRatesWebCacheService.Instance();
const _projectsWebCache = ProjectsWebCacheService.Instance();
const _timeStampStringConverter = new TimeStampStringConverter();
const _timeFormateValidateHelper = new TimeFormatValidateHelper();

const UsageRecordEditor: React.FC<{
    Record?: UsageRecord,
    OnSubmit? : (record:UsageRecord) => void
}> = ({ Record,OnSubmit }) =>
    {
        const [form] = Form.useForm();
        useEffect(()=>{
            if(!Record)
            {
                Record = new UsageRecord();
            }else{
                form.setFieldsValue(Record);
            }
        },[]);

        return (
            <Form
                form={form}
                labelCol={{ span: '8' }}
                wrapperCol={{ span: '16' }}
                layout="horizontal"
                initialValues={Record ?? undefined}
            >
                <Form.Item
                    name="User"
                    label="User"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="TestNo"
                    label="Test No"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="EquipmentNo"
                    label="Equipment No"
                    rules={[{
                        required: true,
                        validator: (_, value: string) => _equipmentHourlyRatesCache.ContainsNo(value) ? Promise.resolve() : Promise.reject("Equipment no is invalid."),
                        message: "Equipment no is invalid."
                    }]}
                >
                    <Select showSearch
                        onSearch={(value) => form.setFieldsValue({ EquipmentNo: value })}>
                        {
                            _equipmentHourlyRatesCache.CachedEquipmentHourlyRates.map(
                                info => <Option value={info.EquipmentNo!} key={info.EquipmentNo!}>{info.EquipmentNo}</Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    name="TestType"
                    label="Test Type"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="ProjectName"
                    label="Project Name"
                    rules={[{
                        required: true,
                        validator: (_, value: string) => _projectsWebCache.ContainsName(value) ? Promise.resolve() : Promise.reject("Project name is invalid."),
                        message: "Project name is invalid."
                    }]}
                >
                    <Select showSearch
                        onSearch={(value) => form.setFieldsValue({ ProjectName: value })}>
                        {
                            _projectsWebCache.CachedProjects.map(
                                info => <Option value={info.Name!} key={info.No!}>{info.Name}</Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    name="StartTime"
                    label="Start Time"
                    rules={[{ required: true, pattern: /^\d{4}\/\d{1,2}\/\d{1,2}\s\d{1,2}:\d{1,2}$/, message: 'Time format does not match yyyy/MM/dd HH:mm' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="EndTime"
                    label="End Time"
                    rules={[{ required: true, pattern: /^\d{4}\/\d{1,2}\/\d{1,2}\s\d{1,2}:\d{1,2}$/, message: 'Time format does not match yyyy/MM/dd HH:mm' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit" onClick={SubmitAsync}
                        style={{marginRight:"4px"}}>
                        Submit
                    </Button>
                    <Button danger type="primary" onClick={ResetForm}>
                        Clear
                    </Button>
                </Form.Item>
            </Form>
        );

        async function SubmitAsync ()
        {
            const values =await form.validateFields();
            const usageRecord = new UsageRecord();
            usageRecord.User = values.User;
            usageRecord.TestNo = values.TestNo;
            usageRecord.TestType = values.TestType;
            usageRecord.EquipmentNo = values.EquipmentNo;
            usageRecord.ProjectName = values.ProjectName;
            usageRecord.StartTime = _timeStampStringConverter.ToUnixTimeSeconds(values.StartTime,
                _timeFormateValidateHelper.TimeFormat);
            usageRecord.EndTime = _timeStampStringConverter.ToUnixTimeSeconds(values.EndTime,
                _timeFormateValidateHelper.TimeFormat);
            OnSubmit?.(usageRecord);
        };

        function ResetForm()
        {
            if( window.confirm('Confirm to clear all the fields?'))
            {
                form.resetFields()
            }
        }
    }

    export default UsageRecordEditor;