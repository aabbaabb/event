using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Darili_api;

public partial class RequireOrganization : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Darili_User.IsAuthenticated())
        {

            string OrgName = Request.QueryString["Name"];
            string Type = Request.QueryString["Type"];
            Event_RoleControl.RequireOrganization(OrgName, Type);
            Response.Write(1);
        }
        else
        {
            Response.StatusCode = 500;
            Response.End();
        }

    }
}