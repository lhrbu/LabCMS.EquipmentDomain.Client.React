import React from 'react';
import UsageRecordEditor from '../Components/UsageRecordEditor';
import UsageRecord from '../Models/UsageRecord';
import UsageRecordsWebAPI from '../WebAPIs/UsageRecordsWebAPI';
import UsageRecordLocalCacheService from '../Services/UsageRecordLocalCacheService';


export default function AddRecord()
{
    const _usageRecordsWebAPI = new UsageRecordsWebAPI();
    const _localCache = UsageRecordLocalCacheService.Instance();
    let record:UsageRecord | undefined = undefined;
    if(_localCache.HasCache())
    {
        record = _localCache.GetCache()!;
        record.Id = null;
    }
    return <UsageRecordEditor Record={record}
        OnSubmit={OnSubmitNewRecordAsync}/>

    async function OnSubmitNewRecordAsync(usageRecord:UsageRecord)
    {
        await _usageRecordsWebAPI.PostAsync(usageRecord);
        window.alert(`New usage record of ${usageRecord.TestNo} is added.`);
        // const status = await _usageRecordsWebAPI.PostAsync(usageRecord);
        // if(status==200){
        //     window.alert(`New usage record of ${usageRecord.TestNo} is added.`);
        // }else{
        //     window.alert('Failed to add the usage record');
        // }
    }
}

