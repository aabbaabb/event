using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using Darili_api;

public partial class UserDetail : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            int uid = Darili_User.Get_Uid_Local(Page.User.Identity.Name);
            XElement root = new XElement("User", new XElement("uid", Darili_User.Get_Uid_Local(Page.User.Identity.Name)));

            int page = Request.QueryString["page"] != null ? int.Parse(Request.QueryString["page"]) : 0;
            int perpage = Request.QueryString["perpage"]!=null ? int.Parse(Request.QueryString["perpage"]) : 5;
            string type = Request.QueryString["type"];
            if (type == "Liked")
            {

                //写入参加活动

                //写入喜欢的活动
                Event[] Liked_Events = Darili_Subsciption.GetLikedEvents(Darili_User.Get_Uid_Local(Page.User.Identity.Name), perpage, page);
                foreach (var element in Liked_Events)
                {
                    element.NeedSubscribe = Darili_Subsciption.NeedSubscribe(element.Id);
                }
                //写入本人添加的活动
                int like_count = Darili_Subsciption.GetLikeCount(uid);
                root.Add(new XElement("LikedEvents",
                    Event.Translte_Xml(Liked_Events),
                    new XElement("count", like_count)

                    ));



            }
            if (type == "Subscribed")
            {
                int subscribe_count = Darili_Subsciption.GetSubscribeCount(uid);
                Event[] Subscibed_Events = Darili_Subsciption.GetSubscribedEvents(Darili_User.Get_Uid_Local(Page.User.Identity.Name), perpage, page);
                foreach (var element in Subscibed_Events)
                {
                    element.NeedSubscribe = Darili_Subsciption.NeedSubscribe(element.Id);
                }
                root.Add(new XElement("SubscribedEvents",
                    new XElement("count", subscribe_count),
                    Event.Translte_Xml(Subscibed_Events)));
            }
            if (type == "Published")
            {
                //modified by aabb 2014.4.28
                //add search the published by orgname
                string searchname;
                if (!String.IsNullOrEmpty((String)Session["OrgName"]))
                {
                    searchname = (string)Session["OrgName"];
                }
                else
                {
                    searchname = Page.User.Identity.Name;
                }
                int publishcount = Event.GetPublishCount(searchname);
                //end of modified
                Event[] Published_Events = Event.GetPublisherEntries(searchname, perpage, page);
                foreach (var element in Published_Events)
                {
                    element.NeedSubscribe = Darili_Subsciption.NeedSubscribe(element.Id);
                }
                root.Add(new XElement("PublishedEvents",new XElement("count",publishcount), Event.Translte_Xml(Published_Events)));
            }
            Response.Write(Newtonsoft.Json.JsonConvert.SerializeXNode(root));
        }
    }
}