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

public partial class ModifyEvent : System.Web.UI.Page
{
    public static string TrimIfExists(string toTrim)
    {
        if (string.IsNullOrEmpty(toTrim)) return null;
        else return toTrim.Trim();
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        
        //以下为测试用代码
        /*
        if (!Page.User.IsInRole("Admin"))
        {
            Response.StatusCode = 403;
            Response.End();
        }*/
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
                int eid = (int)obj["id"];
                if (!Event_RoleControl.OwnerOrAdmin(eid))
                {
                    Response.StatusCode = 403;
                    Response.End();
                }
                EventMain toModify = ctx.EventMain.Where(p => p.Id == eid).Select(p => p).First();
                #region 处理基础信息
               
                    toModify.Title = TrimIfExists((string)obj["Title"]);
                    toModify.Subtitle = TrimIfExists((string)obj["SubTitle"]);
                    toModify.Location = TrimIfExists((string)obj["Location"]);
                    toModify.Type = TrimIfExists((string)obj["Type"]);
                    toModify.SubType = TrimIfExists((string)obj["Subtype"]);
                    toModify.Context = TrimIfExists((string)obj["Context"]);
          
                    toModify.LastModified = DateTime.Now;
                    //toModify.Publisher = HttpContext.Current.User.Identity.Name;
                    toModify.ViewFlag = (string)obj["EventType"] == "0" ? (short)1 : (short)-1;
                    toModify.Series = (string)obj["series"];
                
                #endregion
                
                #region 处理speaker,class
                    if (toModify.Type == "讲座")
                {
                    if (toModify.Lecture.Count > 0)
                    {
                        ctx.Lecture.DeleteAllOnSubmit(toModify.Lecture.ToList());
                    }
                    foreach (var element in obj["speaker"].ToList())
                    {
                        string raw = element.ToString();
                        raw = System.Text.RegularExpressions.Regex.Replace(raw, @"\s{4}", "|");
             //           ctx.Lecture.DeleteAllOnSubmit(toModify.Lecture.ToList());
                        string[] speaker = raw.Split('|');
                        toModify.Lecture.Add(new Lecture
                        {
                            Speaker = speaker[0],
                            Class = speaker[1]
                        }
                        );
                    }
                    if (toModify.Host.Count > 0)
                    {
                        ctx.Host.DeleteAllOnSubmit(toModify.Host.ToList());
                    }
                    foreach (var element in obj["Publisher"].ToList())
                    {
                        
                        toModify.Host.Add(new Host
                        {
                            Name = element.ToString()

                        });

                    }
                }
                else
                {
                    if (toModify.Host.Count > 0)
                    {
                        ctx.Host.DeleteAllOnSubmit(toModify.Host.ToList());
                    }
                        foreach (var element in obj["Publisher"].ToList())
                    {
                        
                        toModify.Host.Add(new Host
                        {
                            Name = element.ToString()
                        });
                    }
                }

                #endregion
                #region 处理多时段
                    if (toModify.Event_MultipleTime.Count > 0)
                    {
                        ctx.Event_MultipleTime.DeleteAllOnSubmit(toModify.Event_MultipleTime.ToList());
                    }
                    List<Event_MultipleTime> temp = new List<Event_MultipleTime>();
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
                            temp.Add(multi);
                           // toModify.Event_MultipleTime.Add(multi);
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
                            temp.Add(multi);
                            //toModify.Event_MultipleTime.Add(multi);
                        }
                    }




                }
                #endregion
                #region 处理讲座信息
                
                if (toModify.Type == "讲座")
                {
                    ctx.Event_LectureEx.DeleteOnSubmit(toModify.Event_LectureEx);
                    toModify.Event_LectureEx = new Event_LectureEx
                    {
                        Brand = obj["brand"].ToString(),
                        speakerinf = obj["speakerinf"].ToString()
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
                    toModify.Event_BM = event_bm;
                }
                #endregion
                #region 计算总时间范围
                toModify.Event_MultipleTime.AddRange(temp);
                toModify.StartTime = (from entry in temp
                                  orderby entry.StartDate ascending
                                  select entry.StartDate).First();
                toModify.EndTime = (from entry in temp
                                orderby entry.EndDate descending
                                select entry.EndDate).First();
                #endregion
                #region 处理线上
                if (toModify.Type == "线上")
                {
                    toModify.Location = " ";
                }
                #endregion
                #region 插入记录，返回
                if (toModify.Publisher == null || toModify.Publisher.Trim() == "")
                {
                    toModify.Publisher = "佚名";
                }
               ctx.SubmitChanges();
                #region 处理报名参数

                var paractx = new LikeAndGoDataContext();
                paractx.Event_Subscription_Parameters.DeleteAllOnSubmit(paractx.Event_Subscription_Parameters.Where(p => p.eid == toModify.Id).Select(p => p).ToList());
                Event_Subscription_Parameters para = new Event_Subscription_Parameters
                {
                    eid = toModify.Id,
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
                        ctx.EventMain.DeleteOnSubmit(toModify);
                        ctx.SubmitChanges();
                        Response.End();
                    }
                }
                #endregion
                Session["post_id"] = toModify.Id;
                JObject response = new JObject(new JProperty("success", 1),
                    new JProperty("id", toModify.Id));

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
