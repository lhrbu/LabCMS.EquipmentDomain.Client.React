import Axios from 'axios';
import Project from '../Models/Project';

export default class ProjectsWebAPI
{
    private readonly _url = '/api/Projects';
    public async GetAsync()
    {
        return (await Axios.get(this._url,{params:{date:new Date()}})).data as Project[];
    }
    public async PostAsync(project:Project)
    {
        await Axios.post(this._url,project,{params:{date:new Date()}});
    }
    public async PutAsync(project:Project)
    {
        await Axios.put(this._url,project,{params:{date:new Date()}});
    }
    public async DeleteByNameAsync(name:string)
    {
        const nameUrl:string = encodeURI(`${this._url}/${name}`);
        await Axios.delete(nameUrl);
    }
}