import Project from '../Models/Project';
import UsageRecord from '../Models/UsageRecord';
import ProjectsWebCacheService from './ProjectsWebCacheService';

export default class ProjectProvider
{
    public GetProject(usageRecord:UsageRecord) : Project | null
    {
        const _cacheService = ProjectsWebCacheService.Instance();
        let result = _cacheService.CachedProjects.find(item=>item.FullName===usageRecord.ProjectName);
        return result?result:null;
    }
}