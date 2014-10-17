using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using Darili_api;
using Newtonsoft.Json;
using System.Xml.Linq;
using System.Web.UI.WebControls;

public partial class ViewOrgMembers : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Event_orgDataContext ctx = new Event_orgDataContext();
        string OrgName = Request.QueryString["OrgName"];

        var toWrite = ctx.Event_MinorOrg.Where(p => p.Org_Name == OrgName).Select(p => p).ToList();
        var toWrite2 = ctx.Event_Org.Where(p => p.Org_Name == OrgName).Select(p => p).ToList();
        XElement root = Darili_Extra.ForceArray(new XElement("root"), true);
        foreach (var element in toWrite2)
        {
            root.Add(Darili_Extra.ForceArray(new XElement("NickName", element.NickName), false));
           root.Add(Darili_Extra.ForceArray(new XElement("stuno", GetStunoByNickName(element.NickName)), false));
        }
        
        foreach (var element in toWrite)
        {
            root.Add(Darili_Extra.ForceArray(new XElement("NickName", element.NickName), false));
            root.Add(Darili_Extra.ForceArray(new XElement("stuno", GetStunoByNickName(element.NickName)), false));
        }
        Response.Write(Newtonsoft.Json.JsonConvert.SerializeXNode(root));
    }
    private string GetStunoByNickName(string Nickname)
    {
        var ctx = new Darili_UserDataContext();
        var query=ctx.Event_Users.Where(p => p.User_NickName == Nickname).Select(p => p.User_Stuno);
        if (query.Count() > 0)
        {
            return query.First();

        }
        else
        {
            return null;
        }
    }
}