using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net.Security;
using Darili_api;
using Newtonsoft.Json;

public partial class Set_Org_Status : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string OrgName = Request.QueryString["OrgName"];
        if(Event_RoleControl.IsOrg(OrgName,Page.User.Identity.Name))
        {
            Session.Add("OrgName",OrgName);
            Session.Add("IsMinorOrg",false);
            Session.Timeout = 60;
        }
        else if (Event_RoleControl.IsMonorOrg(OrgName, Page.User.Identity.Name))
        {
            Session.Add("OrgName", OrgName);
            Session.Add("IsMinorOrg", true);
            Session.Timeout = 60;
        }
        else
        {
            Session.Remove("OrgName");
            Session.Remove("IsMinorOrg");
            Session.Timeout = 60;
        }
        Response.Write(Session["OrgName"] + "," + "IsMinorOrg:" + Session["IsMinorOrg"]);

    }
}