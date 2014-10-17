using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Xml.Linq;
using System.Web.UI.WebControls;
using Darili_api;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


public partial class Event_Detail : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string user = HttpContext.Current.User.Identity.Name;
        int id = 23;
            int.TryParse(Request.QueryString["id"] == null ? "23" : Request.QueryString["id"],out id);
        Darili_LinqDataContext ctx = new Darili_LinqDataContext();
        if (Darili_EventManuever.IsExist(id) != false)
        {
            Event result = Event.GetEventById(id);
            //输出格式不同，懒得再在类里面再写了（好吧我错了），完全把设计思想抛在脑后233max
            XElement result_root = Darili_Extra.ForceArray(new XElement("Eventdetail"),true);
            result_root.Add(new XElement("Id", id));
            result_root.Add(new XElement("Subtitle", result.Subtitle));
            result_root.Add(new XElement("StartTime", result.StartTime));
            result_root.Add(new XElement("EndTime", result.EndTime));
            result_root.Add(new XElement("Context",result.Context));
            result_root.Add(new XElement("SubType", result.Subtype));
         result_root.Add(new XElement("Type",result.Type));
         result_root.Add(new XElement("pic", @"./g_Poster.aspx?&Thumb=1&id=" + result.Id.ToString()));
            result_root.Add(new XElement("Subtype",result.Subtype));
            result_root.Add(new XElement("Title",result.Title));
            var query_Host = (from entry in ctx.Host
                              where entry.Event_id == id
                              select entry.Name).ToList();
            foreach (var element in query_Host)
            {
                result_root.Add(Darili_Extra.ForceArray(new XElement("Publishers",element),false));
            }
            
            result_root.Add(new XElement("Location", result.Location));
            result_root.Add(new XElement("series", result.series));
           
            var LectureEx = Extra_Lecture.GetExtraInfo(id);
            if (LectureEx != null)
            {
                result_root.Add(new XElement("speakerinf", LectureEx.speakerinfo));
                result_root.Add(new XElement("brand", LectureEx.Brand));
            }
            result_root.Add(new XElement("speaker", result.Speaker));
            Comment[] comments = Darili_Comments.GetCommentsById(id);
            if (result.C_Speaker != null)
            {
                foreach (var element in result.C_Speaker)
                {
                    var Speakers_root = Darili_Extra.ForceArray(new XElement("Speakers"), false);
                    Speakers_root.Add(new XElement("Name", element.Name.Trim()), new XElement("Class", element.Class.Trim()));
                    result_root.Add(Speakers_root);
                }
            }
            /*
            var MultipleTimeHelper=Event.SeparateMultipleTimes(Event.GetMultipleTime(id));
            foreach (var element in MultipleTimeHelper)
            {
                XElement temp = Darili_Extra.ForceArray(new XElement("MultipleTimes"), false);
                temp.Add(new XElement("StartTime", element.starttime), new XElement("endTime", element.endtime));
                result_root.Add(temp);
            }*/
            var MultipleTimes = Event.GetMultipleTime(id);
            foreach (var element in MultipleTimes)
            {
                if (element.IsRoutine)
                {
                    //重复时间
                    var toAdd = Darili_Extra.ForceArray(new XElement("multipletime"), false);
                    toAdd.Add(new XElement("IsRoutine", "1"), new XElement("routine", element.RoutineDetail));
                    
                    string starttime = element.StartTime.Year.ToString() + "-" + element.StartTime.Month.ToString() + "-" + element.StartTime.Day.ToString()+"/"+element.StartTime.ToShortTimeString()+"/"+element.EndTime.ToShortTimeString(); 
                    string endtime = element.EndTime.Year.ToString() +"-" + element.EndTime.Month.ToString() + "-" + element.EndTime.Day.ToString();
                    toAdd.Add(new XElement("StartTime", starttime),
                        new XElement("EndTime", endtime));
                    result_root.Add(toAdd);
                }
                else
                {
                    //非重复时间
                    var toAdd = Darili_Extra.ForceArray(new XElement("multipletime"), false);
                    toAdd.Add(new XElement("IsRoutine", "0"));
                    toAdd.Add(new XElement("StartTime",element.StartTime.Year.ToString()+"-"+element.StartTime.Month.ToString()+"-"+element.StartTime.Day.ToString()+"/"+element.StartTime.ToShortTimeString()+"/"+element.EndTime.ToShortTimeString()));
                    result_root.Add(toAdd);
                }
            }
            if (comments != null)
            {
                result_root.Add(new XElement("reply-num",comments.Length));
                foreach (var entry in comments)
                {
                    //备注：本地获取nickname
                    XElement responses_root = Darili_Extra.ForceArray(new XElement("responses"),false);
                    string nickname = Darili_User.Get_Nickname_Local(entry.User_Id);
                    responses_root.Add(new XElement("personID", entry.User_Id), new XElement("time", entry.time), new XElement("content", entry.content), new XElement("name", nickname), new XElement("cid", entry.id));

                    result_root.Add(responses_root);

                }
               
            }
            result_root.Add(new XElement("share-num",Darili_Extra.GetShareNum(id)));
            var xml_album = Darili_Extra.GetAlbum_new(id);
            if (xml_album != null)
            {
                if (xml_album.Elements().Count() > 0)
                {

                    result_root.Add(Darili_Extra.GetAlbum_new(id).Elements());
                }
                }
            result_root.Add(new XElement("success", "1"));
            result_root.Add(new XElement("love-num", Darili_Extra.GetLikeNum(id)));
            result_root.Add(new XElement("liked",Darili_Extra.LikeExists(Darili_User.Get_Uid_Local(Page.User.Identity.Name),id)));
            result_root.Add(new XElement("subscribed", Darili_Extra.SubscribeExists(Darili_User.Get_Uid_Local(Page.User.Identity.Name), id)));
            result_root.Add(new XElement("pin-num", Darili_Extra.GetSubscriptionNum(id)));
            result_root.Add(new XElement("NeedSubscribe", Darili_Subsciption.NeedSubscribe(id)));
            result_root.Add(new XElement("ViewFlag", result.ViewFlag));
            #region Parameters
            LikeAndGoDataContext ctx2 = new LikeAndGoDataContext();
            var parameters = ctx2.Event_Subscription_Parameters.Where(p => p.eid == id).Select(p => p.parameters);
            if (parameters.Count()>0)
            {
                XElement ele = new XElement("Parameters");
                foreach (var element in parameters.ToList().Elements())
                {
                   ele.Add(Darili_Extra.ForceArray(element,false));

                }
                result_root.Add(ele);

            }
            #endregion
            #region Event_BM
            var Event_BM=ctx.Event_BM.Where(p => p.id == id).Select(p => p);
            if (Event_BM.Count() > 0)
            {
                var Event_Bm_Toadd = new XElement("PublishTime",
                    new XElement("StartTime", Event_BM.First().StartTime),
                    new XElement("EndTime", Event_BM.First().EndTime));
                result_root.Add(Event_Bm_Toadd);
                result_root.Add(new XElement("numlimit", Event_BM.First().numlimit));
            }
            #endregion
            Response.Write(JsonConvert.SerializeXNode(result_root));
           // Response.Write(result_root);

        }


    }
}