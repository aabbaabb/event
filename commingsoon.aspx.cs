using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Xml.Linq;
using System.Web.UI.WebControls;
using Newtonsoft.Json;

public partial class commingsoon : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string email="";
        int count=Request.QueryString.Count;
        if(count!=0)
        {
        email = Request.QueryString[0];
        }
            if (IsEmail(email))
        {
            var ctx = new commingsoonDataContext();
            var addr = new Event_commingsoon
            {
                email = email
            };
            ctx.Event_commingsoon.InsertOnSubmit(addr);
            try
            {
                ctx.SubmitChanges();
                Response.ClearContent();
                Response.Write(JsonConvert.SerializeXNode(new XElement("root",new XElement("success", "1"))));
            }
            catch (Exception exp)
            {
                Response.Write(JsonConvert.SerializeXNode(new XElement("root",new XElement("success", "0"),new XElement("err",exp.Message))));
            }

        }
        else
        {
            Response.Write(JsonConvert.SerializeXNode(new XElement("root", new XElement("success", "0"), new XElement("err", "非标准的email格式"))));
        }
    }
    public bool IsEmail(string str_Email)
    {
        return System.Text.RegularExpressions.Regex.IsMatch(str_Email, @"^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$");

    }

    
}