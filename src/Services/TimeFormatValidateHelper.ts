import TimeStampStringConverter from "./TimeStampStringConverter";

export default class TimeFormatValidateHelper
{
    
    public get TimeFormat() : string {
        return this._timeFormat;
    }
    
    private readonly _timeFormat = 'yyyy/MM/DD HH:mm';
    public get TimeFormatPattern():RegExp {
        return this._timeFormatPattern;
    }
    private readonly _timeFormatPattern = /^\d{4}\/\d{1,2}\/\d{1,2}\s\d{1,2}:\d{1,2}$/;

    public get ValidateErrorMessage():string{
        return this._validateErrorMessage;
    }
    private readonly _validateErrorMessage = 'Time format does not match yyyy/MM/dd HH:mm';
    private readonly _timeStampStringConverter = new TimeStampStringConverter();

    public RenderTimeStamp(timeStampValue: number)
    {
        return this._timeStampStringConverter.FromUnixTimeSeconds(timeStampValue,
            this.TimeFormat);
    }

    public GetTimeStampValue(timeString:string)
    {
        return this._timeStampStringConverter.ToUnixTimeSeconds(timeString,
            this.TimeFormat)
    }
}