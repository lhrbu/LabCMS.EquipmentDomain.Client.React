export default class SerializerHelp
{
    public Get<TEntity>(data:any[])
    {
        return data.filter(item=>Object.assign(new TEntity(),item)) as TEntity[]
    }
}