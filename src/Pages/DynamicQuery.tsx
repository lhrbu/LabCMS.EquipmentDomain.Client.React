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
import generateCalendar from 'antd/lib/calendar/generateCalendar';

const { Text,Paragraph } = Typography;
const { Panel } = Collapse;

export default function DynamicQuery()
{
    const [code,setCode]=useState<string>("");

    const data = [
        {A:1,B:"Haha"},
        {A:2,B:"Hehe"}
    ];
    return (
        <Fragment>
            <Collapse accordion defaultActiveKey={['QueryCodePanel']}>
                <Panel header="Input query code:" key="QueryCodePanel">
                    <Paragraph keyboard>using System;</Paragraph>
                    <Paragraph keyboard>using System.Collections.Generic;</Paragraph>
                    <Paragraph keyboard>using System.Linq;</Paragraph>
                    <Paragraph keyboard>using System.Threading.Tasks;</Paragraph>
                    <Paragraph keyboard>sing LabCMS.EquipmentDomain.Shared.Models;</Paragraph>
                    <Paragraph />
                    <Paragraph keyboard>......</Paragraph>
                    <Paragraph />
                    <Paragraph keyboard>public dynamic DynamicQuery(IEnumerable usageRecords)</Paragraph>
                    <Paragraph keyboard>{"{"}</Paragraph>
                    <TextArea autoSize={{ minRows: 5 }} value={code} onChange={e => setCode(e.target.value)} />
                    <Paragraph keyboard>{"}"}</Paragraph>
                    <Button onClick={() => window.alert(code)}>Test</Button>
                </Panel>
            </Collapse>
            <GenerateResultsTable Items={data} />
        </Fragment>
        );
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