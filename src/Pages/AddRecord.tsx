import React from 'react';
import UsageRecordEditor from '../Components/UsageRecordEditor';
import UsageRecordsWebAPI from '../WebAPIs/UsageRecordsWebAPI';

const _usageRecordsWebAPI = new UsageRecordsWebAPI();
export default function AddRecord()
{
    return <UsageRecordEditor 
        OnSubmit={async record=>await _usageRecordsWebAPI.PostAsync(record)}/>
}

