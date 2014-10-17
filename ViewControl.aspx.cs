using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Darili_api;

public partial class ViewControl : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        int eid=int.Parse(Request.QueryString["id"]);
        Darili_LinqDataContext ctx = new Darili_LinqDataContext();
        short viewflag = ctx.EventMain.Where(p => p.Id == eid).Select(p => p.ViewFlag).First();
        if (Event_RoleControl.OwnerOrAdmin(eid))
        {
            if (viewflag == (short)Event_ViewControl.ViewLevel.Closed || viewflag == (short)Event_ViewControl.ViewLevel.InternalClosed)
            {
                Darili_EventManuever.OpenEvent(eid);
            }
            else if (viewflag == (short)Event_ViewControl.ViewLevel.PublicViewable || viewflag == (short)Event_ViewControl.ViewLevel.Internal)
            {
                Darili_EventManuever.CloseEvent(eid);
            }
            Response.Write(1);
        }
    }
}