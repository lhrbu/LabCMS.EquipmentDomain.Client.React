import {ColumnProps} from 'antd/lib/table/Column';

export default class TableGenerator
{
    public GenerateColumns<TItem>(item:TItem)
    {
        const columns:ColumnProps<TItem>[] =[];
        for (const key in item) {
            if (Object.prototype.hasOwnProperty.call(item, key)) {
                const element = item[key];
                const columnType:ColumnProps<TItem> = 
                {
                    title : key,
                    dataIndex :key,
                }
                columns.push(columnType);
            }
        }
        return columns;
    }
}