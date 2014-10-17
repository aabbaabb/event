using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Xml.Linq;
using Darili_api;
using Newtonsoft.Json;
using System.Net;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Web.UI.WebControls;

public partial class AlbumUpload : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string jsontest = @"{'root':{'Album':[{'FileName':'07dda466-ec55-4338-88f8-5ba79bb497fb','Description':'test_1'},{'FileName':'76ffa915-f807-4d18-8a3b-6b2b4b28a969','Description':'test_2'}]}}";
        if (!IsPostBack)
        {
            //用户已登录
            if (true)
            {
                List<Guid> list = new List<Guid>();
                
                int eid = 27;//测试数据
               
                string id = Session["u_eid"] != null ? (string)Session["u_eid"] : "";
                if (id != "") eid = int.Parse(id);
               
                 string path = Server.MapPath("~/img/album/") + eid.ToString() + "/";
                //上传内容格式正确
                if (Request.ContentType.Contains("multipart/form-data"))
                {
                    //存在上传内容
                    XElement root = Darili_Extra.ForceArray(new XElement("root"), true);
                    if (Request.Files.Count > 0&&Event.EventExists(eid))
                    {
                        
                        //活动ID对应的文件夹不存在则创建文件夹
                        if (!Directory.Exists(path))
                        {

                            var d = Directory.CreateDirectory(path);
                        }
                        var ctx = new Darili_LinqDataContext();
                        //生成所有的GUID并记录
                        for (int i = 0; i < Request.Files.Count; i++)
                        {
                            //文件大小,类型过滤
                            if (Darili_Extra.AllowedMineType.Contains(Request.Files[i].ContentType) && Request.Files[i].ContentLength < 3145729)
                            {
                                Event_Album element = new Event_Album
                                {
                                    eid = eid,
                                    filename = Guid.NewGuid()
                                };
                                ctx.Event_Album.InsertOnSubmit(element);
                                list.Add(element.filename);

                            }
                            else
                            {
                                list.Add(Guid.NewGuid());
                            }
                        }
                        
                        for (int i = 0; i < Request.Files.Count; i++)
                        {
                            if (Darili_Extra.AllowedMineType.Contains(Request.Files[i].ContentType) && Request.Files[i].ContentLength < 3145729)
                            {
                                Request.Files[i].SaveAs(path+list[i].ToString()+Darili_Extra.GetFormat(Request.Files[0].ContentType));
                                var x_toadd = Darili_Extra.ForceArray(new XElement("Album"), false);
                                x_toadd.Add(new XElement("index", i + 1), new XElement("FileName", list[i].ToString()));
                                root.Add(x_toadd);
                            }
                            
                        
                         }
                        ctx.SubmitChanges();
                        root.Add(new XElement("u_eid", (string)Session["u_eid"]));
                        Response.Write(Newtonsoft.Json.JsonConvert.SerializeXNode(root));
                        


                    }
                    else
                    {
                        Response.Write("没有上传的内容");
                        Response.StatusCode = 403;
                        Response.End();
                    }
                }
                else
                {
                    //尝试标记session
                    if(!String.IsNullOrEmpty(Request.QueryString["id"]))
                    {
                        if (!String.IsNullOrEmpty((string)Session["u_eid"]))
                            Session.Remove("u_eid");
                        
                        Session.Add("u_eid",Request.QueryString["id"].ToString());
                        Response.Write("Status:SessionManuever"+(string)Session["u_eid"]);
                    }
                    else
                    {
                        //尝试写入Description
                        jsontest = String.IsNullOrEmpty(Request.QueryString["description"]) ? jsontest : Request.QueryString["description"];
                        var jParams=JObject.Parse(jsontest);
                       var xParams= XElement.Parse(JsonConvert.DeserializeXNode(jParams.ToString()).ToString());

                        var ctx = new Darili_LinqDataContext();
                        var album_list = ctx.Event_Album.Where(p => p.eid == eid).Select(p=>p).ToList();
                        foreach (var element in xParams.Elements())
                        {
                            string description = element.Element("Description").Value;
                            string FileName = element.Element("FileName").Value;
                            var ToModify = album_list.Where(p => p.filename.ToString().ToLower() == FileName.ToLower()).First();
                            ToModify.description = description;
                        }
                        ctx.SubmitChanges();
                        Session.Remove("u_eid");

                   
                    }
                }
            }
            else
            {
                Response.Write("用户未登录,请登陆后重试");
                Response.StatusCode = 401;
                Response.End();
            }
        }
    }
}