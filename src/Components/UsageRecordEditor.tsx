import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import UsageRecord from '../Models/UsageRecord';
import EquipmentHourlyRatesWebCacheService from '../Services/EquipmentHourlyRatesWebCacheService';
import ProjectsWebCacheService from '../Services/ProjectsWebCacheService';
import TimeFormatValidateHelper from '../Services/TimeFormatValidateHelper';

const { Option } = Select;
const _equipmentHourlyRatesCache = EquipmentHourlyRatesWebCacheService.Instance();
const _projectsWebCache = ProjectsWebCacheService.Instance();
const _timeFormateValidateHelper = new TimeFormatValidateHelper();

const UsageRecordEditor: React.FC<{
    Record?: UsageRecord,
    OnSubmit? : (record:UsageRecord) => Promise<void>
    OnCancel?:()=>Promise<void>
}> = ({ Record,OnSubmit,OnCancel }) =>
    {
        const [form] = Form.useForm();
        const [submitButtonLoading,setSubmitButtonLoading]=useState<boolean>(false);

        useEffect(()=>{
            if(Record)
            {
                form.setFieldsValue(Record);
                form.setFieldsValue({
                    StartTimeString:_timeFormateValidateHelper.RenderTimeStamp(Record.StartTime!),
                    EndTimeString:_timeFormateValidateHelper.RenderTimeStamp(Record.EndTime!)
                });
            }
        },[Record]);

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
                        validator: (_, value: string) => _projectsWebCache.ContainsFullName(value) ? Promise.resolve() : Promise.reject("Project name is invalid."),
                        message: "Project name is invalid."
                    }]}
                >
                    <Select showSearch
                        onSearch={(value) => form.setFieldsValue({ ProjectName: value })}>
                        {
                            _projectsWebCache.CachedProjects.map(
                                project => <Option value={project.FullName!} key={project.No!}>{project.FullName}</Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    name="StartTimeString"
                    label="Start Time"
                    rules={[{ required: true, pattern: /^\d{4}\/\d{1,2}\/\d{1,2}\s\d{1,2}:\d{1,2}$/, message: 'Time format does not match yyyy/MM/dd HH:mm' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="EndTimeString"
                    label="End Time"
                    rules={[{ required: true, pattern: /^\d{4}\/\d{1,2}\/\d{1,2}\s\d{1,2}:\d{1,2}$/, message: 'Time format does not match yyyy/MM/dd HH:mm' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit" onClick={SubmitAsync}
                        loading={submitButtonLoading}
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
            setSubmitButtonLoading(true);
            try
            {
                const values = await form.validateFields();
                const usageRecord: UsageRecord = Object.assign(new UsageRecord(), values);
                usageRecord.StartTime = _timeFormateValidateHelper.GetTimeStampValue(values.StartTimeString);
                usageRecord.EndTime = _timeFormateValidateHelper.GetTimeStampValue(values.EndTimeString);
                await OnSubmit?.(usageRecord);
            }finally{
                setSubmitButtonLoading(false);
            }
        };

        function ResetForm()
        {
            if( window.confirm('Confirm to clear all the fields?'))
            {
                form.setFieldsValue(new UsageRecord());
                OnCancel?.();
            }
        }
    }

    export default UsageRecordEditor;