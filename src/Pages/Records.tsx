import React,{Fragment, useEffect, useState} from 'react';
import { Table,Modal} from 'antd';
import Column from 'antd/lib/table/Column';
import ProjectProvider from '../Services/ProjectProvider';
import UsageRecord from '../Models/UsageRecord';
import TimeFormatValidateHelper from '../Services/TimeFormatValidateHelper';
import TimeStampStringConverter from '../Services/TimeStampStringConverter';
import UsageRecordsWebAPI from '../WebAPIs/UsageRecordsWebAPI';
import UsageRecordEditor from '../Components/UsageRecordEditor';

const distinct = require('distinct');

const _tableHeader = <div style={{backgroundColor:"#305496",color:"white",padding:"0.5rem"}}>HJL-NL-DV Test equipment usage record 2020</div>
const _projectProvider=new ProjectProvider();
const _timeFormatValidateHelper = new TimeFormatValidateHelper();
const _timeStampStringConverter = new TimeStampStringConverter();
const _pageSize = 20;

const _usageRecordsWebAPI = new UsageRecordsWebAPI();

export default function Records()
{
    const [currentPageIndex,setCurrentPageIndex]=useState<number>(1);
    const [usageRecords,setUsageRecords] = useState<UsageRecord[]>([]);
    useEffect(()=>{
        FetchUsageRecords();
    },[]);

    return (
        <Fragment>
            {_tableHeader}
            <Table
                dataSource={usageRecords} 
                rowKey="Id"
                pagination={{position:["bottomCenter"],pageSize:_pageSize,current:currentPageIndex}}>
                <Column title="User" dataIndex="User"
                    filters={GenerateFilterOptions(usageRecords.filter(item=>item.User?true:false).map(item=>item.User!))}
                    onFilter={(value, record) => (record as UsageRecord).User === value }
                    />
                <Column title="Test No" dataIndex="TestNo"
                    filters={GenerateFilterOptions(usageRecords.filter(item=>item.TestNo?true:false).map(item=>item.TestNo!))}
                    onFilter={(value, record) => (record as UsageRecord).TestNo === value }
                    />
                <Column title="Equipment No" dataIndex="EquipmentNo"
                    filters={GenerateFilterOptions(usageRecords.filter(item=>item.EquipmentNo?true:false).map(item=>item.EquipmentNo!))}
                    onFilter={(value, record) => (record as UsageRecord).EquipmentNo === value }
                    />
                <Column title="Test Type" dataIndex="TestType"
                    filters={GenerateFilterOptions(usageRecords.filter(item=>item.TestType?true:false).map(item=>item.TestType!))}
                    onFilter={(value, record) => (record as UsageRecord).TestType === value }
                    />
                <Column title="Project Name" dataIndex="ProjectName" 
                     filters={GenerateFilterOptions(usageRecords.filter(item=>item.ProjectName?true:false).map(item=>item.ProjectName!))}
                     onFilter={(value, record) => (record as UsageRecord).ProjectName === value }
                    />
                <Column title="Project No"
                    filters={GenerateFilterOptions(usageRecords.filter(item=>item.ProjectName?true:false).map(item=>_projectProvider.GetProject(item)!.No!))}
                    onFilter={(value, record) => _projectProvider.GetProject(record as UsageRecord)!.No === value }
                    render={(_,usageRecord)=>usageRecord?_projectProvider.GetProject(usageRecord as UsageRecord)?.Name:null}
                    />
                <Column title="Start Time" dataIndex="StartTime" 
                    render={timeStampValue=>timeStampValue?RenderTimeStamp(timeStampValue as number):null}/>
                <Column title="End Time" dataIndex="EndTime" 
                    render={timeStampValue=>timeStampValue?RenderTimeStamp(timeStampValue as number):null}/>
                <Column title="Duration" 
                    render={(_,usageRecord)=>usageRecord?UsageRecord.GetDuration(usageRecord as UsageRecord):null}
                    />
            </Table>

            <Modal>
                <UsageRecordEditor />
            </Modal>
        </Fragment>
    );

    async function FetchUsageRecords()
    {
        const usageRecords = await _usageRecordsWebAPI.GetAsync();
        setUsageRecords([...usageRecords]);
        setCurrentPageIndex(GetPageCount(usageRecords.length,_pageSize));
    }

    function RenderTimeStamp(timeStampValue:number)
    {
        return _timeStampStringConverter.FromUnixTimeSeconds(timeStampValue,
            _timeFormatValidateHelper.TimeFormat);
    }

    function GetPageCount(num:number,pageSize:number)
    {
        return num%pageSize===0?num/pageSize:num/pageSize+1;
    }

    function GenerateFilterOptions<TOption>(optionValues:TOption[])
    {
        return (distinct(optionValues) as TOption[]).sort().map(optionValue=>{return { text: optionValue, value: optionValue }});
    }
}