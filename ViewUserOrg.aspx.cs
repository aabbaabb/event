using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Darili_api;
using System.Xml.Linq;
using Newtonsoft.Json;
public partial class ViewUserOrg : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Event_orgDataContext ctx = new Event_orgDataContext();
        var quary=ctx.Event_Org.Where(p => p.NickName == Page.User.Identity.Name).Select(p => p).ToList();
        var quaryt = quary.Where(p => p.IsProved == true).Select(p=>p.Org_Name).ToList();
        XElement root = Darili_Extra.ForceArray(new XElement("root"),true);
        foreach (var element in quaryt)
        {
            root.Add(Darili_Extra.ForceArray(new XElement("OrgName", element),false));

        }
        var quary2 = ctx.Event_MinorOrg.Where(p => p.NickName == Page.User.Identity.Name).Select(p => p.Org_Name).ToList();
        foreach (var element in quary2)
        {
            if (root.Elements().Where(p => p.Value == element).Count() == 0)
            {
                root.Add(Darili_Extra.ForceArray(new XElement("OrgName", element), false));
            }
        }
        Response.Write(JsonConvert.SerializeXNode(root, Formatting.None, true));
    }
}