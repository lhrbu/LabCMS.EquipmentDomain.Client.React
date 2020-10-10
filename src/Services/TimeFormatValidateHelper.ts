export default class TimeFormatValidateHelper
{
    
    public get TimeFormat() : string {
        return this._timeFormat;
    }
    
    private readonly _timeFormat = 'yyyy/MM/dd HH:mm';
    public get TimeFormatPattern():RegExp {
        return this._timeFormatPattern;
    }
    private readonly _timeFormatPattern = /^\d{4}\/\d{1,2}\/\d{1,2}\s\d{1,2}:\d{1,2}$/;

    public get ValidateErrorMessage():string{
        return this._validateErrorMessage;
    }
    private readonly _validateErrorMessage = 'Time format does not match yyyy/MM/dd HH:mm';

}