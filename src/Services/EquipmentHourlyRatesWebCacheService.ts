import EquipmentHourlyRate from '../Models/EquipmentHourlyRate';
import EquipmentHourlysRatesWebAPI from '../WebAPIs/EquipmentHourlyRatesWebAPI';

export default class EquipmentHourlyRatesWebCacheService
{
    private static _instance:EquipmentHourlyRatesWebCacheService = new EquipmentHourlyRatesWebCacheService();
    private constructor(){}
    public static Instance(){return this._instance;}

    private readonly _gateWayUrl = "http://localhost:5050"

    private _cachedEquipmentHourlyRates:EquipmentHourlyRate[] = [];
    public get CachedEquipmentHourlyRates() : EquipmentHourlyRate[] {
        return this._cachedEquipmentHourlyRates;
    }

    public async RefreshCacheAsync()
    {
        const webAPI:EquipmentHourlysRatesWebAPI = new EquipmentHourlysRatesWebAPI();
        this._cachedEquipmentHourlyRates = await webAPI.GetAsync();
    }

    public ContainsNo(equipmentNo:string)
    {
        return this._cachedEquipmentHourlyRates.some(item=>item.EquipmentNo===equipmentNo)
    }
}