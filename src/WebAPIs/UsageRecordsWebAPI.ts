import Axios from "axios";
import UsageRecord from '../Models/UsageRecord';

export default class UsageRecordsWebAPI
{
    private readonly _url = '/api/UsageRecords';


    public async GetAsync()
    {
        return (await Axios.get(this._url,{params:{date:new Date()}})).data as UsageRecord[];
    }
    public async PostAsync(usageRecord:UsageRecord)
    {
        await Axios.post(this._url,usageRecord,{params:{date:new Date()}});
    }
    public async PutAsync(usageRecord:UsageRecord)
    {
        await Axios.put(this._url,usageRecord,{params:{date:new Date()}});
    }
    public async DeleteByIdAsync(id:string)
    {
        const idUrl:string = `${this._url}/${id}`;
        await Axios.delete(idUrl,{params:{date:new Date()}});
    }
}