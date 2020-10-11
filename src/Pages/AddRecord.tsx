import React from 'react';
import UsageRecordEditor from '../Components/UsageRecordEditor';
import UsageRecord from '../Models/UsageRecord';
import UsageRecordsWebAPI from '../WebAPIs/UsageRecordsWebAPI';
import UsageRecordLocalCacheService from '../Services/UsageRecordLocalCacheService';

const _usageRecordsWebAPI = new UsageRecordsWebAPI();
export default function AddRecord()
{

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
        await _usageRecordsWebAPI.PostAsync(usageRecord)
        window.alert(`New usage record of ${usageRecord.TestNo} is added.`);
    }
}

