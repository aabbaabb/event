using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Xml.Linq;
using System.Data.Linq;
using System.Web.UI.WebControls;
using Darili_api;

public partial class Like : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string success = "{\"success\":\"1\"}";
        string fail = "{\"success\":\"0\"}";
        if (!IsPostBack && Darili_User.IsAuthenticated())
        {
            var eid = Request.QueryString["id"];

            /*if (Request.HttpMethod.ToLower() != "post")
            {
                Response.StatusCode = 405;
                Response.Status = "405 METHOD NOT ALLOWED";
                Response.End();
            }*/
            string user = Page.User.Identity.Name;
            if (Darili_User.IsInitialized())
            {
                var lctx = new LikeAndGoDataContext();
                var ctx = new Darili_UserDataContext();
                var uid = Darili_User.Get_Uid_Local(Page.User.Identity.Name);
                if (Event.EventExists(int.Parse(eid)))
                {
                    if (!Darili_Extra.LikeExists(uid, int.Parse(eid)))
                    {

                        var entry = new Event_Like
                        {
                            eid = int.Parse(eid),
                            uid = uid,
                            time = DateTime.Now
                        };
                        lctx.Event_Like.InsertOnSubmit(entry);
                        try
                        {
                            lctx.SubmitChanges();
                            Response.Write(1);
                        }
                        catch (ChangeConflictException)
                        {
                            foreach (ObjectChangeConflict confict in ctx.ChangeConflicts)
                            {
                                confict.Resolve(RefreshMode.OverwriteCurrentValues);
                            }
                            ctx.SubmitChanges();
                        }
                        catch (Exception exp)
                        {
                            Response.Write(exp.Message);
                        }
                        finally
                        {

                        }
                    }

                    else
                    {
                        try
                        {
                            var dlike = (from entry in lctx.Event_Like
                                         where entry.uid == uid && entry.eid == int.Parse(eid)
                                         select entry).First();
                            lctx.Event_Like.DeleteOnSubmit(dlike);
                            lctx.SubmitChanges();
                            Response.Write(1);
                        }
                        catch (Exception exp)
                        {
                            Response.Write(0);
                        }

                    }
                }
            }
        }
    }
}