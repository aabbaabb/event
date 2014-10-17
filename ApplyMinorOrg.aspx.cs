using System;
using Darili_api;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;
using System.Text;
public partial class ApplyMinorOrg : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string nickname = String.IsNullOrEmpty(Request.QueryString["NickName"])?null:Request.QueryString["NickName"];
        string type = String.IsNullOrEmpty(Request.QueryString["Type"]) ? null : Request.QueryString["Type"];
        string stuno_raw = String.IsNullOrEmpty(Request.QueryString["stuno"]) ? null : Request.QueryString["stuno"];

        string OrgName = Request.QueryString["OrgName"];
        Event_orgDataContext ctx = new Event_orgDataContext();
        if (type == "del"&&Event_RoleControl.IsOrg(OrgName,Page.User.Identity.Name))
        {
            var predicate = PredicateBuilder.True<Event_Org>();
            predicate = predicate.And(p => p.NickName == Page.User.Identity.Name).And(p => p.Org_Name == OrgName).And(p => p.IsProved == true);
            var count = ctx.Event_Org.Where(predicate).Select(p => p);
            if (count.Count() > 0)
            {
                var predicate2 = PredicateBuilder.True<Event_MinorOrg>();
                predicate2 = predicate2.And(p => p.NickName == nickname).And(p => p.Org_Name == OrgName);
                var toDel = ctx.Event_MinorOrg.Where(predicate2).First();


                ctx.Event_MinorOrg.DeleteOnSubmit(toDel);
                var count2 = ctx.Event_MinorOrg.Where(p => p.NickName == nickname).Select(p => p.id).Count();
                if (count2 == 1)
                {
                    Roles.RemoveUserFromRole(nickname, "MinorOrg");
                }
                ctx.SubmitChanges();

                Response.Write("{\"success\":\"1\",\"msg\":\"删除成功\"}");
            }
            else
            {
                Response.Clear();
                Response.Write("{\"success\":\"0\",\"msg\":\"用户不是主管理员\"}");
            
            }
      
       
        }
        else
        {
        var predicate = PredicateBuilder.True<Event_Org>();
        predicate = predicate.And(p => p.NickName ==Page.User.Identity.Name).And(p => p.Org_Name == OrgName).And(p=>p.IsProved==true);
        var count = ctx.Event_Org.Where(predicate).Select(p => p);
        if (count.Count() > 0)
        {
            //学号模式
            Darili_UserDataContext userctx = new Darili_UserDataContext();
            int stuno = 0;
            bool flag = int.TryParse(stuno_raw, out stuno);
            if (flag)
            {

                var stunocount=userctx.Event_Users.Where(p=>p.User_Stuno==stuno.ToString()).Select(p=>p);
                if (stunocount.Count() > 0)
                {
                    var stuno_toadd = stunocount.First();
                    var stuno_nickname = stuno_toadd.User_NickName;
                    try
                {

                    ctx.Event_MinorOrg.InsertOnSubmit(new Event_MinorOrg
                      {
                          NickName = stuno_nickname,
                          Org_Name = OrgName,

                      });
                    ctx.SubmitChanges();
                    Roles.AddUserToRole(stuno_nickname, "MinorOrg");
                    Response.Write("{\"success\":\"1\",\"msg\":\"以学号添加成功\"}");
                    
                }
                    catch (Exception exp)
                    {
                        Response.Write("{\"success\":\"0\",\"msg\":\"不能重复添加\"}");
                    }

                }
            }
                if (Darili_User.IsInitialized(nickname))
            {
                try
                {

                    ctx.Event_MinorOrg.InsertOnSubmit(new Event_MinorOrg
                      {
                          NickName = nickname,
                          Org_Name = OrgName,

                      });
                    ctx.SubmitChanges();
                    Roles.AddUserToRole(nickname, "MinorOrg");
                    Response.Write("{\"success\":\"1\",\"msg\":\"以昵称添加成功\"}");
                    
                }
                catch (Exception exp)
                {
                    Response.Write("{\"success\":\"0\",\"msg\":\"不能重复添加\"}");
                }
            }
            else
            {
                Response.Clear();
                Response.Write("{\"success\":\"0\",\"msg\":\"用户未注册或初始化\"}");
                
            }

        }
        else
        {
            Response.Clear();
            Response.Write("{\"success\":\"0\",\"msg\":\"用户不是主管理员\"}");
            
        }
    }
        
    }
}