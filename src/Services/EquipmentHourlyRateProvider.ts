import UsageRecord from "../Models/UsageRecord";

import EquipmentHourlyRateCacheService from './EquipmentHourlyRatesWebCacheService';

export default class EquipmentHourlyRateProvider
{
    public GetEquipmentHourlyRate(usageRecord:UsageRecord)
    {
        const _cacheService = EquipmentHourlyRateCacheService.Instance();
        const result = _cacheService.CachedEquipmentHourlyRates.find(item=>item.EquipmentNo===usageRecord.EquipmentNo);
        return result?result:null;
    }
}