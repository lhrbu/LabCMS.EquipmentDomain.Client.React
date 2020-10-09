import moment from "moment";

export default class TimeStampStringConverter
{
    public ToUnixTimeSeconds(dateTimeString:string,timeFormat:string)
    {
        return moment(dateTimeString,timeFormat).unix();
    }
    public FromUnixTimeSeconds(timeStamp:number,timeFormat:string)
    {
        return moment(timeStamp*1000).format(timeFormat);
    }
}