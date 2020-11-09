export default class LoginCheckService
{
    private static _instance:LoginCheckService = new LoginCheckService();
    private constructor(){}
    public static Instance(){return this._instance;}

    private _loginFlag:boolean = false;
    public SetLogin(){this._loginFlag = true;}
    public LoginStatus(){return this._loginFlag;}
}