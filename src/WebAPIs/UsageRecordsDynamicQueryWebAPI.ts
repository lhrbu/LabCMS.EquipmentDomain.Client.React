import Axios from "axios";

export default class UsageRecordsDynamicQueryWebAPI
{
    private readonly _url = '/api/UsageRecords/DynamicQuery';
    public async PostAsync(code:string)
    {
        return (await Axios.post(this._url,code,{params:{date:new Date()}})).data as any[];
    }
}