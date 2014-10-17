using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;
using System.Data;
using System.Web;
using  Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Xml.Linq;
namespace Darili_api
{
    //重写后的Event主类
    //数据类型参见EventMain.dbml(linq to sql class)说明。。。。 
    //by 小胖
    //id:主键，唯一标示
    //各种time：自己看
    //viewflag:大于0允许公众访问
    //Context：详细内容
    //Type：类别
    //Location：地点
    //Publisher:发布者（创建者）
    public class Event_Time_Helper
    {
        public DateTime starttime;
            public DateTime endtime;
        public Event_Time_Helper()
        {
        }
    }
    public class Speaker
    {
        public string Name;
        public string Class;
        public Speaker()
        {
        }
    }
    public class Event_Time
    {
        public int sub_id;
        public DateTime StartTime;
        public DateTime EndTime;
        public bool IsRoutine;
        public string RoutineDetail;
        
        public static implicit operator Event_MultipleTime(Event_Time value)
        {
            return new Event_MultipleTime
            {
                SubTime_Id=value.sub_id,
                StartDate = value.StartTime,
                EndDate = value.EndTime,
                IsRoutine = value.IsRoutine,
                routine = value.RoutineDetail
            };
        }
        public static implicit operator Event_Time(Event_MultipleTime value)
        {
            return new Event_Time
            {
                sub_id=value.SubTime_Id,
                StartTime = value.StartDate,
                EndTime = value.EndDate,
                IsRoutine = value.IsRoutine,
                RoutineDetail = value.routine
            };
        }
        }
    public class Event
    {
        public int Id { get; set; }
        public String[] Hosts { get; set; }
        public bool liked { get; set; }
        public bool subscribed{get;set;}
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public DateTime PublishTime { get; set; }
        public DateTime LastModified { get; set; }
        public string Publisher { get; set; }
        public JToken ExtraInfo { get; set; }
        public string Speaker { get; set; }
        public string Class { get; set; }
        public Speaker[] C_Speaker{get;set;}

        public Event_Time[] MultipleTime { get; set; }
        public string series { get; set; }
        public bool ShouldSerializeMultipleTime()
        {
            return (this.IsMultipleTime);
        }
        public string Subtype { get; set; }
        public bool IsMultipleTime { get; set; }
        public string Subtitle { get; set; }
        public short ViewFlag { get; set; }
        public string Type { get; set; }
        public string Title { get; set; }
        public string Location { get; set; }
        public string Context { get; set; }
        public bool NeedSubscribe { get; set; }
        public static XElement Exception(string value)
        {
            return new XElement("Exception", value.ToString());
        }
        public static XElement Translate_Xml(Event value)
        {
            if (value.ToString() == "")
                return null;
            try
            {
                XElement Xml = new XElement("Event", new XElement("Id", value.Id));
                XElement MultipleTime=new XElement("MultipleTime","");
                var MultipleTimeHelper = Event.SeparateMultipleTimes(value.MultipleTime);
                foreach (var element in MultipleTimeHelper)
                {
                    XElement temp = Darili_Extra.ForceArray(new XElement("MultipleTimes"), false);
                    temp.Add(new XElement("StartTime", element.starttime), new XElement("endTime", element.endtime));
                    Xml.Add(temp);
                }
                /*foreach (var time in value.MultipleTime)
                {
                    MultipleTime.Add(new XElement("Time", new XElement("sub_id", time.sub_id),
                                             new XElement("starttime", time.StartTime),
                                             new XElement("endtime", time.EndTime),
                                             new XElement("isroutine", Convert.ToInt32(time.IsRoutine)),
                                             new XElement("routinedetail", time.RoutineDetail)));

                }*/
                if (value.Speaker != null)
                {
                    Xml.Add(new XElement("speaker", value.Speaker.Trim()),
                            new XElement("Class", value.Class.Trim()));
                }
                if (value.C_Speaker != null)
                {
                    foreach (var element in value.C_Speaker)
                    {
                        var Speakers_root=Darili_Extra.ForceArray(new XElement("Speakers"),false);
                        Speakers_root.Add(new XElement("Name",element.Name.Trim()),new XElement("Class",element.Class.Trim()));
                        Xml.Add(Speakers_root);
                    }
                }
                if (value.Hosts != null)
                {
                    foreach (var element in value.Hosts)
                    {

                        var Publishers_root = Darili_Extra.ForceArray(new XElement("Publishers"), false);
                        Publishers_root.SetValue(element);
                        Xml.Add(Publishers_root);
                    }
                    
                    
                }
                Xml.Add(new XElement("pic",@"./g_Poster.aspx?Thumb=1&id="+value.Id.ToString()));
                Xml.Add(new XElement("liked", value.liked));
                Xml.Add(new XElement("subscribed",value.subscribed));
                var timeleft=Darili_Extra.TimeLeft(value);
                var timeleft2 = Darili_Extra.TimeLeft2(value);
                Xml.Add(new XElement("Title", value.Title),
                        new XElement("Subtitle",value.Subtitle),
                        new XElement("Location", value.Location),
                        new XElement("Subtype",value.Subtype),
                        new XElement("StartTime", value.StartTime),
                        new XElement("EndTime", value.EndTime),
                        new XElement("PublishTime", value.PublishTime),
                        new XElement("Publisher", value.Publisher),
                        new XElement("Context", value.Context),
                        new XElement("ViewFlag", value.ViewFlag),
                        new XElement("series",value.series),
                        new XElement("tag",Darili_Extra.GetTag(value.Id)),
                        new XElement("reply-num",Darili_Extra.GetReplyNum(value.Id)),
                        new XElement("love-num",Darili_Extra.GetLikeNum(value.Id)),
                        new XElement("pin-num",Darili_Extra.GetSubscriptionNum(value.Id)),
                        new XElement("share-num",Darili_Extra.GetShareNum(value.Id)),
                        new XElement("NeedSubscribe",value.NeedSubscribe),
                        
                        new XElement("Type", value.Type));
                if (value.NeedSubscribe == true)
                {
                    Xml.Add(new XElement("timeleft", new XElement("day", timeleft.Item1), new XElement("hour", timeleft.Item2), new XElement("min", timeleft.Item3)));
                }
                Xml.Add(new XElement("timeleft2", new XElement("day", timeleft2.Item1), new XElement("hour", timeleft2.Item2), new XElement("min", timeleft2.Item3)));
                Xml.Add(MultipleTime);

                return Xml;
            }
            catch (Exception exp)
            {
                return new XElement("Exception",exp.ToString());
            }

        }
        public XElement Translate_Xml()
        {
            return Translate_Xml(this);
        }
        public static IEnumerable<XElement> Translte_Xml(Event[] value)
        {
            XElement Xml_Root = new XElement("Root", "");
            foreach (Event eve in value)
            {
                Xml_Root.Add(eve.Translate_Xml());
            }
            if (value.Count() == 1) Xml_Root.Add(new XElement("Event", ""));
            return Xml_Root.Elements();


        }
        public static implicit operator Event(EventMain value)
        {
            return new Event((int)value.Id, (DateTime)value.StartTime, (DateTime)value.EndTime, (DateTime)value.PublishTime, (DateTime)value.LastModified, (String)value.Publisher, (short)value.ViewFlag, (String)value.Type, (String)value.SubType, (String)value.Title, (String)value.Subtitle, (String)value.Location, (String)value.Context,(String)value.Series);
        }


        #region 构造函数
        public Event() { }
        public Event(int _Id, DateTime _StartTime, DateTime _EndTime, DateTime _PublishTime, DateTime _LastModified, string _Publisher, short _ViewFlag, string _Type, string _Subtype, string _Title, string _Subtitle, string _Location, string _Context,string  _series)
        {
            Id = _Id;
            StartTime = _StartTime;
            EndTime = _EndTime;
            PublishTime = _PublishTime;
            LastModified = _LastModified;
            Publisher = _Publisher;
            ViewFlag = _ViewFlag;
            Type = _Type;
            Subtitle = _Subtitle;
            Title = _Title;
            Location = _Location;
            Context = _Context;
            Subtype = _Subtype;
            series = _series;
        }

        #endregion

        public static bool EventExists(int id)
        {
            Darili_LinqDataContext ctx = new Darili_LinqDataContext();
            var quary = (from entry in ctx.EventMain
                        where entry.Id == id
                        select entry).Count();
            return quary>0;
        }
        public static int GetPublishCount(string nickname)
        {
            var ctx = new Darili_LinqDataContext();
            return ctx.EventMain.Where(p=>p.Publisher==nickname).Count();
        }
        public Tuple<string,string> loadExtra(int id) {
            try
            {
                Darili_LinqDataContext ctx = new Darili_LinqDataContext();
                var quary2 = (from entry in ctx.Lecture
                              where entry.Event_Id == id
                              select entry).First();
                if (quary2 != null)
                {
                    return new Tuple<string, string>(quary2.Speaker, quary2.Class);
                }
                else return null;
            }
            catch
            {
                return null;
            }
        }
        public int InsertEntry()
        {
            Darili_LinqDataContext ctx = new Darili_LinqDataContext();
            EventMain eve = new EventMain
            {
                StartTime = this.StartTime,
                EndTime = this.EndTime,
                PublishTime = this.PublishTime,
                LastModified = this.LastModified,
                Publisher = this.Publisher,
                ViewFlag = this.ViewFlag,
                Type = this.Type,
                Title = this.Title,
                Location = this.Location,
                Context = this.Context,
                Subtitle = this.Subtitle,
                SubType = this.Subtype
            };
            if (this.IsMultipleTime == true)
            {
                foreach (var time in MultipleTime)
                {
                    eve.Event_MultipleTime.Add(time);
                }
            }
            ctx.EventMain.InsertOnSubmit(eve);
            try
            {
                ctx.SubmitChanges();
                return eve.Id;
            }
            catch
            {
                return -1;
            }


        }
        //删除指定ID的记录
        public bool DeleteID(int id)
        {
            Darili_LinqDataContext ctx = new Darili_LinqDataContext();
            var quary = from entry in ctx.EventMain
                        where entry.Id == id
                        select entry;
            foreach (var entry in quary)
            {
                ctx.EventMain.DeleteOnSubmit(entry);
            }
            try
            {
                ctx.SubmitChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;

            }


        }
        public static Event GetEventById(int id)
        {
            Darili_LinqDataContext ctx = new Darili_LinqDataContext();
            var quary = from entry in ctx.EventMain
                        where entry.Id == id
                        select entry;
           
            Event result = quary.First();
            try
            {
                var quary2 = (from entry in ctx.Lecture
                              where entry.Event_Id == id
                              select entry).ToArray();
                if (quary2.Length>0)
                {
                    result.C_Speaker = new Speaker[quary2.Length];
                    for(int i=0;i<quary2.Length;i++)
                    {
                        result.C_Speaker[i] = new Speaker
                        {
                            Name = quary2[i].Speaker,
                            Class = quary2[i].Class
                        };
                        }
                    result.Speaker = quary2[0].Speaker;
                    result.Class = quary2[0].Class;
                }
            }
            catch (Exception e)
            {
            }

            result.Hosts = Darili_Extra.GetHosts(id);
            result.MultipleTime = GetMultipleTime(id);
            if (result.MultipleTime != null) result.IsMultipleTime = true; else result.IsMultipleTime = false;
            return result;
        }
        
        //获取指定发布人的发布记录(out of date)
        public static Event[] GetPublisherEntries(string people,int perpage,int page)
        {
            Event_orgDataContext orgctx = new Event_orgDataContext();
            List<string>list2 =new List<string>();
            list2.Add(people);
            
            List<int> list3 = new List<int>();
            var predicate =PredicateBuilder.False<EventMain>();
            for (int i = 0; i < list2.Count(); i++)
            {
                list3.Add(i);
                predicate=predicate.Or(p=>p.Publisher==list2[list3[i]]);
            }
            Darili_LinqDataContext ctx = new Darili_LinqDataContext();
            var quary = from entry in ctx.EventMain
                        where list2.Contains(entry.Publisher)
                        orderby entry.StartTime descending
                        select entry;

            EventMain[] temp = quary.Skip(perpage * page).Take(perpage).ToArray();
            List<Event> list = new List<Event>();
            foreach (EventMain t in temp)
            {
                list.Add(t);

            }
            foreach (Event t in list)
            {
                t.Hosts = Darili_Extra.GetHosts(t.Id);
                t.MultipleTime = GetMultipleTime(t.Id);
                if (t.MultipleTime != null) t.IsMultipleTime = true; else t.IsMultipleTime = false;
                try
                {
                    var quary2 = (from entry in ctx.Lecture
                                  where entry.Event_Id == t.Id
                                  select entry).ToArray();
                    if (quary2.Length > 0)
                    {
                        t.C_Speaker = new Speaker[quary2.Length];
                        for (int i = 0; i < quary2.Length; i++)
                        {
                            t.C_Speaker[i] = new Speaker
                            {
                                Name = quary2[i].Speaker,
                                Class = quary2[i].Class
                            };
                        }
                        t.Speaker = quary2[0].Speaker;
                        t.Class = quary2[0].Class;
                    }
                }
                catch (Exception e)
                {
                }
            }
            return list.ToArray();
        }
        
        //外部调用：显示所有公共可访问的活动
        
       
        public static Event[] GetTimeSpan(DateTime StartTime, DateTime EndTime, string type, string subtype, bool IsAll, int perpage, int page)
        {
            var predicate = PredicateBuilder.True<EventMain>();
           if(subtype!=""&&subtype!=null)
            {
                 predicate = predicate.And(p => p.SubType == subtype);
            }
            if(type!=""&&type!=null)
            
                predicate=predicate.And(p=>p.Type==type);
            if (!IsAll)
            {
                predicate = predicate.And(p => p.ViewFlag > 0);
            }
           // predicate = predicate.And(p => p.StartTime >= StartTime);
            var PredicateStartTime = PredicateBuilder.True<EventMain>();
            PredicateStartTime = PredicateStartTime.And(p => p.StartTime >= StartTime).And(p => p.StartTime <= EndTime);
            var PredicateEndTime = PredicateBuilder.True<EventMain>();
            PredicateEndTime = predicate.And(p => p.EndTime >= StartTime).And(p => p.EndTime <= EndTime);
            var PredicateInside = PredicateBuilder.True<EventMain>();
            //edited @2013.11.17 反转
            PredicateInside = PredicateInside.And(p => p.StartTime <= StartTime).And(p => p.EndTime >= EndTime);
            var predicate2 = PredicateBuilder.False<EventMain>();
            predicate2 = predicate2.Or(PredicateStartTime
                ).Or(PredicateEndTime).Or(PredicateInside);
            predicate2 = predicate.And(predicate2);

            Darili_LinqDataContext ctx = new Darili_LinqDataContext();
            var query = ctx.EventMain.Where(predicate2).OrderByDescending(p => p.StartTime).ThenByDescending(p => p.PublishTime).Select(p => p).Skip(perpage * page).Take(perpage);
            
            EventMain[] temp = query.ToArray();
            List<Event> list = new List<Event>();
            foreach (EventMain t in temp)
            {
                list.Add(t);

            }
            foreach (Event t in list)
            {
                t.Hosts = Darili_Extra.GetHosts(t.Id);
                t.MultipleTime = GetMultipleTime(t.Id);
                if (t.MultipleTime != null) t.IsMultipleTime = true; else t.IsMultipleTime = false;
                try
                {
                    var quary2 = (from entry in ctx.Lecture
                                  where entry.Event_Id == t.Id
                                  select entry).ToArray();
                    if (quary2.Length>0)
                    {
                        t.C_Speaker = new Speaker[quary2.Length];
                        for (int i = 0; i < quary2.Length; i++)
                        {
                            t.C_Speaker[i] = new Speaker
                            {
                                Name = quary2[i].Speaker,
                                Class = quary2[i].Class
                            };
                            }
                        t.Speaker = quary2[0].Speaker;
                        t.Class = quary2[0].Class;
                    }
                }
                catch (Exception e)
                {
                }
            }
            //var comp = new Darili_EventManuever.IEventStarttimeComparer();
            //list.Sort(comp);
            return list.ToArray();
        }
      
        public static Event_Time[] GetMultipleTime(int id)
        {
            Darili_LinqDataContext ctx = new Darili_LinqDataContext();
            var quary = from entry in ctx.Event_MultipleTime
                        where entry.Event_Id == id
                        select entry;
            List<Event_Time> list = new List<Event_Time>();
            foreach (var e in quary)
            {
                list.Add(e);
            }
            if (list != null) return list.ToArray();
            return null;
           
        }
        public static Event_Time_Helper[] SeparateMultipleTimes(Event_Time[] times)
        {
            List<Event_Time_Helper> result = new List<Event_Time_Helper>();
            foreach (Event_Time time in times)
            {
                result.AddRange(SeparateMultipleTime(time));
            }
            return result.ToArray();
        }
        public static Event_Time_Helper[] SeparateMultipleTime(Event_Time time)
        {
  
            
            List<Event_Time_Helper> result = new List<Event_Time_Helper>();
            bool[] r_detail = new bool[7] ;
            if (time.IsRoutine == false) 
            {
                return new Event_Time_Helper[1]{ new Event_Time_Helper{
                    starttime=time.StartTime,
                    endtime=time.EndTime}};
            }
            else
            {
                
            if (int.Parse(time.RoutineDetail)<256)
            {
                int routinedetail = int.Parse(time.RoutineDetail);
                //接受RoutineDetail数据
                for (int i = 0; i < 7; i++)
                {
                    if (i == 0)
                    {
                        r_detail[i] = (routinedetail & 128) > 0;
                    }
                    else
                    {
                        r_detail[i] = (routinedetail & Convert.ToInt32(System.Math.Pow(2 , i))) > 0;
                    }
                }
                //处理RoutineDetail数据至DateTime.DayOfWeek的格式
                for (int i = 0; i < 7; i++)
                {
                    if (r_detail[i] == true)
                    {
                        DateTime flag = time.StartTime.Date + new TimeSpan(Darili_Extra.CalculateTimeSpan((int)time.StartTime.DayOfWeek, i), 0, 0, 0);
                        while (flag < time.EndTime)
                        {
                            result.Add(new Event_Time_Helper
                            {
                                starttime = flag + time.StartTime.TimeOfDay,
                                endtime = flag + time.EndTime.TimeOfDay
                            });
                            flag += new TimeSpan(7, 0, 0, 0);
                        }
                    }
                }
            }
            else throw new ArgumentException("遇到异常的重复时间参数", time.RoutineDetail);
            }
            
            return result.ToArray();
        }

    }
}