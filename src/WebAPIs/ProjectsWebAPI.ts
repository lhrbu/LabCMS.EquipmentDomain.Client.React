import Axios from 'axios';
import Project from '../Models/Project';

export default class ProjectsWebAPI
{
    private readonly _url = '/api/Projects';
    public async GetAsync()
    {
        return (await Axios.get(this._url,{params:{date:new Date()}})).data as Project[];
    }
}