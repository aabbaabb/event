using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using System.Xml.Linq;

public partial class UnreadMessage : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
         Response.ContentType = "application/json";
        Response.Charset = "utf-8";
        if (!IsPostBack)
        {
            string cat = Request.QueryString["cat"];
            string subcat = Request.QueryString["subcat"];
            try{
            int num = Darili_User.GetUnreadMessage(Page.User.Identity.Name, cat, subcat);
                XElement root = new XElement("UnreadMessage", new XElement("success", "1"), new XElement("num", num));
                Response.Write(JsonConvert.SerializeXNode(root));
            }
            catch (Exception exp)
            {
                XElement root = new XElement("UnreadMessage", new XElement("success", "1"), new XElement("error", exp.Message));
            }
          
        }
    }
}