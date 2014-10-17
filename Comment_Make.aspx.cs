using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json.Linq;
using System.Xml.Linq;
using Newtonsoft.Json;
using Darili_api;

public partial class Comment_Make : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            try
            {
                
                string Event_id = Request.QueryString["eid"];
                string Content = String.IsNullOrWhiteSpace(Request.QueryString["content"]) ? null : Request.QueryString["content"];
                //测试用代码
                if (Darili_api.Event.EventExists(int.Parse(Event_id)) ==true && (Content != null || Content != "")&&Darili_User.IsAuthenticated())
                {
                    int uid = Darili_User.Get_Uid_Local(Page.User.Identity.Name);
                    
                    int cid=Darili_Comments.MakeComment(uid, int.Parse(Event_id), Content);
                    XElement Result = new XElement("MakeComment",new XElement("success", 1),new XElement("cid",cid));
                    Response.Write( JsonConvert.SerializeXNode(Result));
                }
            }
            catch
            {
                XElement Result = new XElement("MakeComment",new XElement("success", 0));
                Response.Write( JsonConvert.SerializeXNode(Result));
            }
           
        }
    }
}