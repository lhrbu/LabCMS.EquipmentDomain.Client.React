import React,{Fragment, useEffect, useState} from 'react';
import { Button, Table,Typography,Collapse} from 'antd';
import Column from 'antd/lib/table/Column';
import ProjectProvider from '../Services/ProjectProvider';
import UsageRecord from '../Models/UsageRecord';
import TimeFormatValidateHelper from '../Services/TimeFormatValidateHelper';
import TimeStampStringConverter from '../Services/TimeStampStringConverter';
import UsageRecordsWebAPI from '../WebAPIs/UsageRecordsWebAPI';
import UsageRecordEditor from '../Components/UsageRecordEditor';
import { TablePaginationConfig } from 'antd/lib/table';
import UsageRecordLocalCacheService from '../Services/UsageRecordLocalCacheService';
import TableGenerator from '../Services/TableGenerator';
import TextArea from 'antd/lib/input/TextArea';
import UsageRecordDyamicQueryWebAPI from '../WebAPIs/UsageRecordsDynamicQueryWebAPI';

const { Text,Paragraph } = Typography;
const { Panel } = Collapse;

const sLeft = "<";
const sRight=">";
export default function DynamicQuery()
{
    const [collapseKey,setCollapseKey]=useState<string[]>(['QueryCodePanel']);

    const [queryLoading,setQueryLoading]=useState<boolean>(false);
    const [code,setCode]=useState<string>("");
    const [queryResult,setQueryResult]=useState<any[]>([]);
    const data = [
        {A:1,B:"Haha"},
        {A:2,B:"Hehe"}
    ];
    return (
        <Fragment>
            <Collapse accordion activeKey={collapseKey} onChange={(key:any)=>setCollapseKey([key])}>
                <Panel header="Input query code:" key="QueryCodePanel" >
                    <Paragraph keyboard>using System;</Paragraph>
                    <Paragraph keyboard>using System.Collections.Generic;</Paragraph>
                    <Paragraph keyboard>using System.Linq;</Paragraph>
                    <Paragraph keyboard>using System.Threading.Tasks;</Paragraph>
                    <Paragraph keyboard>using LabCMS.EquipmentDomain.Shared.Models;</Paragraph>
                    <Paragraph />
                    <Paragraph keyboard>......</Paragraph>
                    <Paragraph />
                    <Paragraph><Text type="danger">// The return type must be a collection type!</Text></Paragraph>
                    <Paragraph keyboard>public dynamic DynamicQuery(IEnumerable{sLeft}UsageRecord{sRight} usageRecords)</Paragraph>
                    <Paragraph keyboard>{"{"}</Paragraph>
                    <TextArea autoSize={{ minRows: 4 }} value={code} onChange={e => setCode(e.target.value)} />
                    <Paragraph keyboard>{"}"}</Paragraph>
                    <Button type="primary" loading={queryLoading}
                        onClick={async()=>await OnQueryAsync(code)}>
                            Query</Button>
                    <Button type="primary" danger
                        onClick={()=>setCode("")}
                        style={{marginLeft:'8px'}}>
                        Clear
                    </Button>
                </Panel>
                <Panel header="QueryResult" key="QueryResult">
                    <GenerateResultsTable Items={queryResult} />
                </Panel>
            </Collapse>
        </Fragment>
        );

        async function OnQueryAsync(code:string)
        {
            setQueryLoading(true);
            setQueryResult(await GetQueryResult(code));
            setCollapseKey(["QueryResult"]);
            setQueryLoading(false);
        }
}



async function GetQueryResult(code:string)
{
    const _dynamicQueryWebAPI = new UsageRecordDyamicQueryWebAPI();
    return await _dynamicQueryWebAPI.PostAsync(JSON.stringify(code));
}

const GenerateResultsTable: React.FC<{Items?:any[]}>
=({Items})=>
{
    const _tableGenerator = new TableGenerator();
    return Items?
        <Table dataSource={Items} 
                bordered 
                size='small'
                columns={_tableGenerator.GenerateColumns(Items[0])}>
                pagination={{position:["bottomCenter"],pageSize:20}}
        </Table>:
        (<div></div>)
    ;
}