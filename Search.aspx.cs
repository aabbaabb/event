using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Darili_api;
using System.Linq.Expressions;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using System.Xml.Linq;

public partial class Search : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string q = HttpUtility.HtmlDecode(Request.QueryString["q"]);
            string page = Request.QueryString["page"] != null ? Request.QueryString["page"] : "0";
            string perpage = Request.QueryString["perpage"] != null ? Request.QueryString["perpage"] : "5";
            Darili_LinqDataContext ctx = new Darili_LinqDataContext();
            //添加内容：标题符合
            var predicate = PredicateBuilder.False<EventMain>();
            predicate = predicate.Or(p => p.Title.Contains(q));
            predicate = predicate.Or(p => p.Subtitle.Contains(q));
            predicate = predicate.Or(p => p.Location.Contains(q));
            predicate = predicate.Or(p => p.Series.Contains(q));
            
            var quary = ctx.EventMain.Where(predicate).Select(p => p.Id);
           
            
            var result = quary.ToList();
            Response.Write(JsonConvert.SerializeObject(result));
            //Brand
            
            var quary2 = from entry in ctx.Event_LectureEx
                         where entry.Brand.Contains(q)
                         select entry.event_id;
            //Host
            var quary3 = ctx.Host.Where(p => p.Name.Contains(q)).Select(p => p.Event_id);
                List<Event> events = new List<Event>();
            result.AddRange(quary2.ToList());
            result.AddRange(quary3.ToList());
            result = result.Distinct().ToList();
            foreach (var eid in result.Skip (int.Parse(perpage) * int.Parse(page)).Take(int.Parse(perpage)))
            {
                events.Add(Event.GetEventById(eid));

            }
            LikeAndGoDataContext ctx2 = new LikeAndGoDataContext();
            int uid = Darili_User.Get_Uid_Local(Page.User.Identity.Name);
            var likedquery = ctx2.Event_Like.Where(p => p.uid == uid).Select(p => p.eid).ToList();
            foreach (var element in events)
            {
                element.liked = likedquery.Exists(p => p == element.Id);
            }
            var subscribedquery = ctx2.Event_Subscription.Where(p => p.uid == uid).Select(p => p.eid).ToList();
            foreach (var element in events)
            {
                element.subscribed = subscribedquery.Exists(p => p == element.Id);
            }
            XElement Xml_Root = new XElement("allevents", null);
            var Events = events.ToArray();
            XElement[] Elements = Event.Translte_Xml(Events).ToArray();

            if (Elements != null && Events.Length>0)
            {
                foreach (XElement element in Elements)
                {
                    Xml_Root.Add(element);
                }
                Xml_Root.Add(new XElement("success", 1));
            }
            Response.Clear();
            Response.Write(JsonConvert.SerializeXNode(Xml_Root));


        }
    }
}