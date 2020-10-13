import React, { useEffect, useState } from 'react';
import {Statistic,Result, Typography, Card} from 'antd';
import moment from "moment";
import { RedditOutlined } from '@ant-design/icons';

const { Text,Paragraph } = Typography;

export default function Home()
{
    const [dateTime,setDateTimeNow] = useState<string>(moment().format("yyyy/MM/DD HH:mm:ss"));

    useEffect(()=>{
        const id = setInterval(()=>{
            setDateTimeNow(moment().format("yyyy/MM/DD HH:mm:ss"));
        },1000);
        return ()=>clearInterval(id);
    },[]);

    return (
    <Result icon={<RedditOutlined />}
        title={<Text strong style={{fontSize:'2.4rem'}}>Welcome</Text>}
        subTitle='Equipment Usage Record System' 
        extra={
            <Card>
                <Statistic title='Date Time' value={dateTime} valueStyle ={{fontSize:'20px'}}/>
            </Card>
            
            }>

    </Result>)
}

