using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Xml.Linq;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using Darili_api;
public partial class output : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        
        string type = Request.QueryString["type"];
        int eid = int.Parse(Request.QueryString["id"]);
        if (!Event_RoleControl.OwnerOrAdmin(eid))
        {
            Response.StatusCode = 403;
            Response.End();
        }
        LikeAndGoDataContext ctx = new LikeAndGoDataContext();
        var query = ctx.Event_Subscription.Where(p => p.eid == eid).Select(p => p);
        List<Event_Subscription> list = new List<Event_Subscription>();
        if (query.Count() > 0)
        {
            list = query.ToList();
        }
        string result = "";
        if (type == "xml" || type == "json")
        {
            XElement root = new XElement("root");
            foreach (var element in list)
            {
                root.Add(element.sdetail);

            }
            if (type == "xml")
            {
                Response.ContentEncoding = System.Text.Encoding.GetEncoding("GB2312");
                Response.ContentType = "application/octet-stream;charset=UTF-8"; result = new XDocument(new XDeclaration("1.0","UTF-8","yes"),root).ToString();
                var encoding = System.Text.Encoding.GetEncoding("UTF-8");
                var result_bin = encoding.GetBytes(result);
                Response.BinaryWrite(result_bin);
                Response.AddHeader("Content-Disposition", "attachment; filename=" + "Subscription_" + eid.ToString() + ".xml");
            }
            else
            {
                Response.ContentType = "application/json";
                result = JsonConvert.SerializeXNode(root);
            }
        }
        if (type == "csv")
        {
            Response.ContentEncoding = System.Text.Encoding.GetEncoding("gb2312");
            Response.ContentType = "application/octet-stream;charset=gb2312";
            //var xroot = list.Select(p => p.sdetail).ToList();
            var xroot = list.Select(p => new { id = p.uid, detail = p.sdetail }).ToList();
            List<String> Params = new List<String>();

            foreach (var element in xroot)
            {
                foreach (var ele_element in element.detail.Elements())
                {
                    if (ele_element.Attribute("Name") != null)
                    {
                        if (!Params.Exists(p => p == ele_element.Attribute("Name").Value))
                        {
                            Params.Add(ele_element.Attribute("Name").Value);
                        }
                    }
                }
            }
            for (int i = 0; i < Params.Count; i++)
            {
                result += Params[i];
                if (!(i == Params.Count - 1))
                {
                    result += ",";
                }
                else
                {
                    result += System.Environment.NewLine;
                }
            }
            foreach (var element in xroot)
            {
                for (int i = 0; i < Params.Count; i++)
                {
                    string toAdd = "";
                    var ele = element.detail.Elements().ToList();
                    var notnull = ele.Where(p => p.Attribute("Name") != null).Select(p => p).ToList();
                    var Param_Toadd = notnull.Where(p => p.Attribute("Name").Value == Params[i]);
                    if (Param_Toadd.Count() > 0)
                    {
                        string value = notnull.Where(p => p.Attribute("Name").Value == Params[i]).First().Value;
                        toAdd += value;
                    }
                    else
                    {
                        //试验用代码，尝试通过User数据库补完用户数据
                        if (Params[i] == "学号")
                        {
                            string stuno = Darili_User.Get_Stuno_Local(Darili_User.Get_Nickname_Local(element.id));
                            toAdd += stuno;
                        }
                        if (Params[i] == "姓名")
                        {
                            string Name = Darili_User.Get_Nickname_Local(element.id);
                            toAdd += Name;
                        }
                        Darili_UserDetail detail = Darili_User.Get_Profile_Remote(element.id);
                        if (detail != null)
                        {
                            if (Params[i] == "手机"||Params[i].ToLower()=="cellphone"||Params[i].ToLower()=="mobileno"||Params[i].ToLower()=="phone")
                            {
                                string cellphone = detail.phone;
                                toAdd += cellphone;
                            }
                        }
                    }
                    if (!(i == Params.Count - 1))
                    {
                        toAdd += ",";
                    }
                    else
                    {
                        toAdd += System.Environment.NewLine;
                    }
                    result+=toAdd;
                }
            }
            result = result.Replace("手机", "MobileNo");
            result = result.Replace("Cellphone", "MobileNo");
            result = result.Replace("姓名", "Name");
            result = result.Replace("昵称", "Nickname");
            var encoding = System.Text.Encoding.GetEncoding("gb2312");
            var result_bin = encoding.GetBytes(result);
            Response.BinaryWrite(result_bin);
            Response.AddHeader("Content-Disposition", "attachment; filename=" + "Subscription_" + eid.ToString() + ".csv");


        }
        if (type == "json")
        {
            Response.Write(result);
        }

    }
}