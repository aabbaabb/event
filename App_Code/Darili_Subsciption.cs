using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
/// <summary>
///Darili_Subsciption 的摘要说明
///注意：不要更新该版本
/// </summary>
namespace Darili_api
{
public class Darili_Subsciption
{
	public Darili_Subsciption()
	{
		//
		//TODO: 在此处添加构造函数逻辑
		//
	}
    public static bool NeedSubscribe(int eid)
    {
        Darili_LinqDataContext ctx = new Darili_LinqDataContext();
        return (ctx.Event_BM.Where(p => p.id == eid).Select(p => p).Count()) > 0;
    }
    public static bool SubscribeExists(int eid,int uid)
    {
       LikeAndGoDataContext ctx=new LikeAndGoDataContext();
       var quary = (from entry in ctx.Event_Subscription
                    where entry.eid == eid && entry.uid == uid
                    select entry.sid).Count();
                  return quary>0;



    }
    public static void SubscribeEvent(int eid,JObject s_detail)
    {
       
        if (Darili_User.IsAuthenticated() &&Event.EventExists(eid))
        {
            
            int uid = Darili_User.Get_Uid_Local(HttpContext.Current.User.Identity.Name);
            if(!Darili_Subsciption.SubscribeExists(uid,eid)){
            //int uid = Darili_User.Get_Uid_Local(HttpContext.Current.User.Identity.Name);
            Darili_Subscription_Parameters para = new Darili_Subscription_Parameters(eid);
            try
            {
                LikeAndGoDataContext ctx = new LikeAndGoDataContext();
                Event_Subscription toAdd = new Event_Subscription
                {
                    eid = eid,
                    uid = uid,
                    sdetail = new XElement("Params"),
                    stime=DateTime.Now
                };
                //处理活动报名时间段
                if (s_detail != null)
                {
                    JObject obj = new JObject(new JProperty("Times", s_detail["Times"]));
                    foreach (var time in obj["Times"].ToList())
                    {
                        toAdd.sdetail.Add(new XElement("Times", new XElement("StartTime", DateTime.Parse((string)time["StartTime"])), new XElement("EndTime", DateTime.Parse((string)time["EndTime"]))));
                    }
                    //检查必填字段
                    var Parameters_Required = new Darili_Subscription_Parameters(eid);
                    if (Parameters_Required.root == null) { Parameters_Required.root = new XElement("Parameters"); }
                    Parameters_Required.AddParameter("姓名");
                    Parameters_Required.AddParameter("学号");

                    // Parameters_Required.root.Add(new XElement("Para", "姓名"), new XElement("Para", "学号"));
                    var ddd = new JObject(new JProperty("Root", new JObject(new JProperty("Parameters", s_detail["Parameters"])))).ToString();
                    //var xParameters = JsonConvert.DeserializeXmlNode(ddd).ToString();
                    XElement xParameters = XElement.Parse(JsonConvert.DeserializeXNode(ddd).ToString());
                    foreach (var Parameters in Parameters_Required.root.Elements("Para"))
                    {
                        var query = (from entry in xParameters.Elements("Parameters")
                                     where entry.Element("name").Value == Parameters.Value
                                     select entry);
                        if (query.Count() > 0)
                        {
                            XElement e_toadd = new XElement("Para", (string)query.First().Element("value").Value);
                            e_toadd.Add(new XAttribute("Name", Parameters.Value));
                            toAdd.sdetail.Add(e_toadd);
                        }
                        else
                        {
                            if(Darili_Subsciption.NeedSubscribe(eid))
                            {
                                throw new ArgumentNullException(Parameters.Value, "必填字段未填写");
                            }
                        }

                    }
                    ctx.Event_Subscription.InsertOnSubmit(toAdd);
                    ctx.SubmitChanges();
                   HttpContext.Current.Response.Write(1);
                }
                else
                {
                   
                    Event_Subscription toAdd2 = new Event_Subscription
                    {
                        eid = eid,
                        uid = uid,
                        sdetail = new XElement("Params"),
                        stime = DateTime.Now
                    };
                    ctx.Event_Subscription.InsertOnSubmit(toAdd2);
                    ctx.SubmitChanges();

                }
            }
            catch (ArgumentNullException exp)
            {
                throw exp;
            }
        }
        else
        {
                /*
                LikeAndGoDataContext ctx = new LikeAndGoDataContext();
                var d_query = (from entry in ctx.Event_Subscription
                               where entry.uid == uid && entry.eid == eid
                               select entry).First();
                ctx.Event_Subscription.DeleteOnSubmit(d_query);
                ctx.SubmitChanges();*/
            throw new ArgumentException("法克");
        }
        }
    }
    public static int[] GetSubscriptionList(int uid)
    {
        LikeAndGoDataContext ctx = new LikeAndGoDataContext();
        return ctx.Event_Subscription.Where(p => p.uid == uid).OrderByDescending(p => p.eid).Select(p => p.eid).ToArray();
    }
    public static int[] GetLikeList(int uid)
    {
        LikeAndGoDataContext ctx = new LikeAndGoDataContext();
        return ctx.Event_Like.Where(p => p.uid == uid).OrderByDescending(p=>p.eid).Select(p => p.eid).ToArray();
    }
    public static int GetLikeCount(int uid)
    {
        var ctx = new LikeAndGoDataContext();
        return ctx.Event_Like.Where(p => p.uid == uid).Count();
 
  }
    public static int[] GetLikeList(int uid, int perpage, int page)
    {
        LikeAndGoDataContext ctx = new LikeAndGoDataContext();
        return ctx.Event_Like.Where(p => p.uid == uid).OrderByDescending(p => p.eid).Skip(perpage*page).Take(perpage).Select(p => p.eid).ToArray();
    }
    public static int[] GetSubscriptionList(int uid, int perpage, int page)
    {
        LikeAndGoDataContext ctx = new LikeAndGoDataContext();
        return ctx.Event_Subscription.Where(p => p.uid == uid).OrderByDescending(p => p.eid).Skip(perpage * page).Take(perpage).Select(p => p.eid).ToArray();
    }
    public static int GetSubscribeCount(int uid)
    {
        var ctx = new LikeAndGoDataContext();
        return ctx.Event_Subscription.Where(p => p.uid == uid).Count();
    }
    public static Event[] GetSubscribedEvents(int uid,int perpage,int page)
    {
        int[] list = GetSubscriptionList(uid, perpage, page);
        List<Event> result=new List<Event>();

        if (list != null)
        {
            foreach (var element in list)
            {
               result.Add(Event.GetEventById(element));

            }
            return result.ToArray();
        }
        else return null;
    }
    public static Event[] GetLikedEvents(int uid,int perpage ,int page)
    {
        int[] list = GetLikeList(uid, perpage, page);
        List<Event> result = new List<Event>();

        if (list != null)
        {
            foreach (var element in list)
            {
                result.Add(Event.GetEventById(element));

            }
            return result.ToArray();
        }
        else return null;
    }
}

public class Darili_Subscription_Parameters
{
    public XElement root=new XElement("root");
    public Darili_Subscription_Parameters()
    {
    }
    public Darili_Subscription_Parameters(int eid)
    {
        LikeAndGoDataContext ctx = new LikeAndGoDataContext();
      var quary=from entry in ctx.Event_Subscription_Parameters
                where entry.eid==eid
                select entry.parameters;
      if (quary.Count() > 0 )
      {

          this.root = quary.First();
      }
      else
      {
          this.root = null;
      }


    }
    public  bool AddParameter(string parameter)
    {
        try
        {
            if (!ParameterExists(parameter))
            {
                this.root.Add(new XElement("Para", parameter));
                return true;
            }
            else
                return true;
        }
        catch
        {
            return false;
        }

    }
    public bool ParameterExists(string parameter)
    {
        return ((from entry in root.Elements("Para")
                 where entry.Value == parameter
                 select entry).Count() > 0);

    }
    public bool DeletePatameter(string parameter)
    {
        try
        {
            if (ParameterExists(parameter))
            {
                XElement ToDelete = (from entry in root.Elements("Para")
                                     where entry.Value == parameter
                                     select entry).First();
                ToDelete.Remove();
                return true;

            }
            else
            {
                return true;
            }
        }
        catch
        {
            return false;
        }
    }
  
}
}