using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web.UI;
using System.Drawing;
using System.Xml.Linq;
using Darili_api;
using System.Web.UI.WebControls;

public partial class test_addevent : System.Web.UI.Page
{
    public static string TrimIfExists(string toTrim)
    {
        if (string.IsNullOrEmpty(toTrim))return null;
        else return toTrim.Trim();
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        //以下为测试用代码
        if (!Event_RoleControl.AllowAccess(Event_RoleControl.RoleControlLevel.AllAcceptable))
        {
            Response.StatusCode = 403;
            Response.End();
        }
        //以上为测试用代码
        if (Darili_User.IsAuthenticated())
        {
            try
            {
                //以下为测试用代码
                string Publisher = Page.User.Identity.Name;
                Response.AddHeader("Access-Control-Allow-Origin", "*");
                //以上为测试用代码
                Darili_LinqDataContext ctx = new Darili_LinqDataContext();
                string input = "";
                //试验中，改变方式为POST
                if (Request.HttpMethod == "POST")
                {
                    var inputStream = Request.InputStream;
                    var strLen = Convert.ToInt32(inputStream.Length);
                    var strArr = new byte[strLen];
                    inputStream.Read(strArr, 0, strLen);
                    input = System.Text.Encoding.UTF8.GetString(strArr);
                    inputStream.Flush();
                    inputStream.Close();

                }
                else
                {
                    input = Request.QueryString[0];
                }
                JObject obj = JObject.Parse(input);
                #region 处理基础信息
                EventMain data = new EventMain
                {
                    Title = TrimIfExists((string)obj["Title"]),
                    Subtitle = TrimIfExists((string)obj["SubTitle"]),
                    Location = TrimIfExists((string)obj["Location"]),
                    Type = TrimIfExists((string)obj["Type"]),
                    SubType = TrimIfExists((string)obj["Subtype"]),
                    Context = TrimIfExists((string)obj["Context"]),
                    PublishTime = DateTime.Now,
                    LastModified = DateTime.Now,
                    Publisher = HttpContext.Current.User.Identity.Name,
                    ViewFlag = (string)obj["EventType"] == "0" ? (short)1 : (short)-1,
                    Series = (string)obj["series"]
                };
                #endregion
                if (!String.IsNullOrEmpty((String)Session["OrgName"]) && Event_RoleControl.IsOrgManager((string)Session["OrgName"], Page.User.Identity.Name))
                {
                    data.Publisher = (string)Session["OrgName"];
                }
                else
                {
                    if(!String.IsNullOrEmpty((String)Session["OrgName"]))
                    {
                        Session.Remove("OrgName");
                        Session.Remove("IsMinorOrg");
                    }
                }
                #region 处理ViewFlag
                string eventtype = (string)obj["EventType"];
                string OrgName = TrimIfExists((string)Session["OrgName"]);
                if (eventtype == "1")
                {
                    data.ViewFlag = (short)-1;
                }
                else
                {
                    //公开活动
                    if (Event_RoleControl.IsAdmin(Page.User.Identity.Name) || Event_RoleControl.IsOrg(OrgName, Page.User.Identity.Name))
                    {
                        data.ViewFlag = (short)1;
                    }
                    else
                    {
                        data.ViewFlag = (short)-2;
                    }
                }
                if (Event_RoleControl.IsOrgManager(OrgName, Page.User.Identity.Name))
                {
                    data.Publisher = OrgName;
                }
                #endregion

                #region 处理speaker,class
                if (data.Type == "讲座")
                {
                    foreach (var element in obj["speaker"].ToList())
                    {
                        string raw = element.ToString();
                        raw = System.Text.RegularExpressions.Regex.Replace(raw, @"\s{4}", "|");
                        string[] speaker = raw.Split('|');
                        data.Lecture.Add(new Lecture
                        {
                            Speaker = speaker[0],
                            Class = speaker[1]
                        }
                        );
                    }
                    foreach (var element in obj["Publisher"].ToList())
                    {
                        data.Host.Add(new Host
                        {
                            Name = element.ToString()

                        });

                    }
                }
                else
                {
                    foreach (var element in obj["Publisher"].ToList())
                    {
                        data.Host.Add(new Host
                        {
                            Name = element.ToString()
                        });
                    }
                }

                #endregion
                #region 处理多时段
                foreach (var element in obj["multipletime"].ToList())
                {
                    Event_MultipleTime multi = new Event_MultipleTime
                    {
                        IsRoutine = element["isroutine"].ToString() == "1" ? true : false
                    };
                    if (multi.IsRoutine == false)
                    {
                        string[] st = element["StartTime"].ToString().Split('/');
                        if (st.Length == 3)
                        {
                            multi.StartDate = DateTime.Parse(st[0]) + TimeSpan.Parse(st[1]);
                            multi.EndDate = DateTime.Parse(st[0]) + TimeSpan.Parse(st[2]);
                            data.Event_MultipleTime.Add(multi);
                        }

                        else
                        {

                        }
                    }
                    else
                    {
                        string[] t = element["StartTime"].ToString().Split('/');
                        if (t.Length == 3)
                        {
                            multi.StartDate = DateTime.Parse(t[0]) + TimeSpan.Parse(t[1]);
                            multi.EndDate = DateTime.Parse(element["EndTime"].ToString()) + TimeSpan.Parse(t[2]);
                            multi.routine = element["routine"].ToString();
                            data.Event_MultipleTime.Add(multi);
                        }
                    }




                }
                #endregion
                #region 处理讲座信息
                if (data.Type == "讲座")
                {
                    data.Event_LectureEx = new Event_LectureEx
                    {
                        Brand = obj["brand"].ToString(),
                        speakerinf = TrimIfExists((string)obj["speakerinf"])
                        //obj["speakerinf"].ToString()
                        
                        //speakerinf=null
                    };

                }

                #endregion
                #region 处理live信息
                if (obj["live"] != null)
                {
                    data.Event_Live = new Event_Live
                    {
                        channelV_vid = null
                    };
                }
                #endregion

                #region 处理报名时间
                if (obj["PublishTime"] != null)
                {
                    var event_bm = new Event_BM();

                    string time_s = obj["PublishTime"]["StartTime"].ToString().Replace('/', ' ');
                    string time_r = obj["PublishTime"]["EndTime"].ToString().Replace('/', ' ');
                    event_bm.StartTime = DateTime.Parse(time_s);
                    event_bm.EndTime = DateTime.Parse(time_r);
                    event_bm.numlimit = int.Parse(obj["numlimit"].ToString());
                    data.Event_BM = event_bm;
                }
                #endregion
                #region 计算总时间范围
                data.StartTime = (from entry in data.Event_MultipleTime
                                  orderby entry.StartDate ascending
                                  select entry.StartDate).First();
                data.EndTime = (from entry in data.Event_MultipleTime
                                orderby entry.EndDate descending
                                select entry.EndDate).First();
                #endregion
                #region 处理线上
                if (data.Type == "线上")
                {
                    data.Location = " ";
                }
                #endregion
                #region 插入记录，返回
               
                ctx.EventMain.InsertOnSubmit(data);
                ctx.SubmitChanges();
                #region 处理报名参数
                var paractx = new LikeAndGoDataContext();
                Event_Subscription_Parameters para = new Event_Subscription_Parameters
                {
                    eid = data.Id,
                    parameters = new System.Xml.Linq.XElement("root")
                };
                if (obj["parameters"] != null)
                {
                    try
                    {
                        int count = obj["parameters"].Count();
                        if (count > 0)
                        {
                            foreach (var element in obj["parameters"].ToList())
                            {
                                para.parameters.Add(new XElement("Para", (string)element));
                            }

                            paractx.Event_Subscription_Parameters.InsertOnSubmit(para);
                            paractx.SubmitChanges();
                        }
                    }
                    catch (Exception exp)
                    {
                        ctx.EventMain.DeleteOnSubmit(data);
                        ctx.SubmitChanges();
                        Response.End();
                    }
                }
                #endregion
                Session["post_id"] = data.Id;
                JObject response = new JObject(new JProperty("success", 1),
                    new JProperty("id", data.Id),new JProperty("ViewFlag",data.ViewFlag));

                Response.Write(response.ToString());
                #endregion
            }
            catch (Exception exp)
            {
                JObject obj = new JObject(new JProperty("success", 0),
                    new JProperty("err", exp.Message));
                Response.Write(exp);
                Response.End();
            }

        }
        else
        {
            Response.Redirect("http://stu.fudan.edu.cn/user/login?returnurl=http://stu.fudan.edu.cn/event/auth.aspx");
        }
        
    }
    
}