import UsageRecord from '../Models/UsageRecord';

export default class UsageRecordLocalCacheService
{

    private static _instance:UsageRecordLocalCacheService = new UsageRecordLocalCacheService();
    private constructor(){}
    public static Instance(){return this._instance;}

    private _cachedRecord:UsageRecord|null=null;
    public GetCache()
    {
        if(this._cachedRecord)
        {
            const result:UsageRecord = this._cachedRecord;
            this._cachedRecord=null;
            return result;
        }else{ return null;}
    }
    public SetCache(usageRecord:UsageRecord)
    {
        this._cachedRecord=Object.assign(new UsageRecord(),usageRecord);
    }
    public HasCache()
    {
        return this._cachedRecord?true:false;
    }
}