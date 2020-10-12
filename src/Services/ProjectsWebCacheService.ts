import Project from '../Models/Project';
import ProjectsWebAPI from '../WebAPIs/ProjectsWebAPI';

export default class ProjectsWebCacheService
{
    private static _instance:ProjectsWebCacheService = new ProjectsWebCacheService();
    private constructor(){}
    public static Instance(){return this._instance;}

    private _cachedProjects:Project[] = [];
    public get CachedProjects() : Project[] {
        return this._cachedProjects;
    }

    public async RefreshCacheAsync()
    {
        const webAPI:ProjectsWebAPI = new ProjectsWebAPI();
        this._cachedProjects = await webAPI.GetAsync();
    }

    public ContainsFullName(projectName:string)
    {
        return this._cachedProjects.some(item=>item.FullName===projectName);
    }
    
}