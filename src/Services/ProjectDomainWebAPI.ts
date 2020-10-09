import Axios from 'axios';
import Project from '../Models/Project';

export default class ProjectDomainWebAPI
{
    private readonly _url = '/api/Projects';
    public async GetAsync()
    {

       const data:any[]=(await await Axios.get(this._url,{params:{date:new Date()}})).data;
       return data.filter(item=>Object.assign(new Project(),item)) as Project[];
    }
}