import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import moment from 'moment';

export default class UsageRecord
{
    public Id:string | null = null;
    public User:string | null = null;
    public TestNo : string | null = null;
    public EquipmentNo :  string | null = null;
    public TestType:string | null = null;
    public ProjectName:string | null = null;
    public StartTime : number | null = null;
    public EndTime : number | null = null;

    public static GetDuration(usageRecord:UsageRecord)
    {
        if(usageRecord.StartTime!=null && usageRecord.EndTime!=null){
            return (usageRecord.EndTime - usageRecord.StartTime)/3600
        }else{
            throw new Error("Wrong Timestamp format");
        }
    }
}