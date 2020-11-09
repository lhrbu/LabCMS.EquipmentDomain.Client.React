import Axios from "axios";
import EquipmentHourlyRate from "../Models/EquipmentHourlyRate";

export default class EquipmentHourlysRatesWebAPI
{
    private readonly _url = '/api/EquipmentHourlyRates';

    public async GetAsync()
    {
        return (await Axios.get(this._url,{params:{date:new Date()}})).data as EquipmentHourlyRate[];
    }

    public async PostAsync(equipmentHourlyRate:EquipmentHourlyRate)
    {
        await Axios.post(this._url,equipmentHourlyRate,{params:{date:new Date()}});
    }
    public async PutAsync(equipmentHourlyRate:EquipmentHourlyRate)
    {
        await Axios.put(this._url,equipmentHourlyRate,{params:{date:new Date()}});
    }
    public async DeleteByIdAsync(id:string)
    {
        const idUrl:string = encodeURI(`${this._url}/${id}`);
        await Axios.delete(idUrl);
    }
}