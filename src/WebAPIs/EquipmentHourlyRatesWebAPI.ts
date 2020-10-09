import Axios from "axios";
import EquipmentHourlyRate from "../Models/EquipmentHourlyRate";

export default class EquipmentHourlysRatesWebAPI
{
    private readonly _url = '/api/EquipmentHourlyRates';

    public async GetAsync()
    {
        return (await Axios.get(this._url,{params:{date:new Date()}})).data as EquipmentHourlyRate[];
    }
}