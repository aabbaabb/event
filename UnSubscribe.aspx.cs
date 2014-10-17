using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class UnSubscribe : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Darili_User.IsAuthenticated())
            {
                try
                {

                    LikeAndGoDataContext ctx = new LikeAndGoDataContext();
                    int eid = int.Parse(Request.QueryString["id"]);
                    int uid = Darili_User.Get_Uid_Local(Page.User.Identity.Name);
                    var predicate = PredicateBuilder.True<Event_Subscription>();
                    predicate = predicate.And(p => p.eid == eid).And(p => p.uid == uid);
                    var todel = ctx.Event_Subscription.Where(predicate).Select(p => p).ToList();
                    ctx.Event_Subscription.DeleteAllOnSubmit(todel);
                    ctx.SubmitChanges();
                     Response.Write(1);
                   
                }
                catch
                {
                    
                }

            }
            else
            {
                Response.StatusCode = 401;
                Response.End();
            }
        }
    }
}