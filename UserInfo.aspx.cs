using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using System.Xml.Linq;
using Darili_api;

public partial class UserInfo : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Darili_UserDataContext ctx = new Darili_UserDataContext();
        if (!IsPostBack)
        {
            XElement root = new XElement("User");
            string type = Request.QueryString["type"] != "" ? Request.QueryString["type"] : "simple";
            if (!String.IsNullOrEmpty(Page.User.Identity.Name))
            {

                if (!String.IsNullOrEmpty((String)Session["OrgName"]))
                {
                    root.Add(new XElement("Nickname", (string)Session["OrgName"]));
                    root.Add(new XElement("IsMinorOrg", Session["IsMinorOrg"]));
                    root.Add(new XElement("IsOrg", true));
                }
                else
                {
                    root.Add(new XElement("Nickname", Page.User.Identity.Name));
                    root.Add(new XElement("IsOrg", false));
                }
                root.Add(new XElement("IsInitialized", Darili_User.IsInitialized().ToString()));


                //测试用，远程调用 TODO：改为本地调用(stuno)
                //var user_info = Darili_User.Validate_StuCommon(Request.Cookies["webpy_session_id"]);
                /**if (Darili_User.IsInitialized())
                {
                    var userinfo = ctx.Event_Users.Where(p => p.User_NickName == Page.User.Identity.Name).Select(p => p).First();
                    if (String.IsNullOrEmpty(userinfo.User_Stuno))
                    {
                        userinfo.User_Stuno = user_info.Item2;
                        ctx.SubmitChanges();
                    }
                }
                else
                {
                    Darili_User.InitializeIfNotInitialized();
                    var userinfo = ctx.Event_Users.Where(p => p.User_NickName == Page.User.Identity.Name).Select(p => p).First();
                    if (String.IsNullOrEmpty(userinfo.User_Stuno))
                    {
                        userinfo.User_Stuno = user_info.Item2;
                        ctx.SubmitChanges();
                    }
                }**/
                var userinfo = ctx.Event_Users.Where(p => p.User_NickName == Page.User.Identity.Name).Select(p => p).First();
                /**if (String.IsNullOrEmpty(userinfo.User_Stuno))
                {
                    userinfo.User_Stuno = user_info.Item2;
                    ctx.SubmitChanges();
                }**/
                //if (user_info != null)
                //{
                    root.Add(new XElement("stuno", userinfo.User_Stuno));
                //}
                if (Darili_User.IsInitialized())
                {
                    root.Add(new XElement("uid", Darili_User.Get_Uid_Local(Page.User.Identity.Name)));
                    root.Add(new XElement("token",userinfo.User_Token) );

                }
            }
            else
            {
                Response.StatusCode = 403;
                Session.Clear();
                Response.End();
            }
Response.Write(JsonConvert.SerializeXNode(root));
        }
    }
}