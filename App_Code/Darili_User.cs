using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;
using Darili_api;
using System.Xml;
using System.Data.Linq;
using System.Xml.Linq;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

/// <summary>
///Darili_User 的摘要说明
/// </summary>
public class Darili_UserDetail
{
    public string weibo, major, name, dormitory, phone, birthday,grade,gender;
    public Darili_UserDetail(string weibo,string major,string name,string dormitory,string phone,string birthday,string grade,string gender)
    {
        this.weibo = weibo;
        this.major = major;
        this.name = name;
        this.dormitory = dormitory;
        this.phone = phone;
        this.birthday = birthday;
        this.grade=grade;
        this.gender=gender;
    }
    public XElement Translate_Xml()
    {
        return new XElement("root",
            new XElement("weibo", this.weibo),
            new XElement("major", this.major),
            new XElement("name", this.name),
            new XElement("dormitory", this.dormitory),
            new XElement("phone", this.phone),
            new XElement("birthday", this.birthday),
            new XElement("grade", this.grade),
            new XElement("gender", this.gender));

    }
    
}
public class Darili_User
{
    // if (HttpContext.Current.User.Identity.Name != null)
    //Darili_LinqDataContext ctx = new Darili_LinqDataContext();
 //从stu_info中获取stu.user的Id
    public static int Get_StuId(HttpCookie oCookie)
    {
        CookieContainer cookies = new CookieContainer();
        HttpWebRequest request = WebRequest.Create("http://stu.fudan.edu.cn/user/info") as HttpWebRequest;
        request.CookieContainer = cookies;


        Cookie oC = new Cookie();

        // Convert between the System.Net.Cookie to a System.Web.HttpCookie...
        oC.Domain = request.RequestUri.Host;
        oC.Expires = oCookie.Expires;
        oC.Name = oCookie.Name;
        oC.Path = oCookie.Path;
        oC.Secure = oCookie.Secure;
        oC.Value = oCookie.Value;

        request.CookieContainer.Add(oC);
        request.UserAgent = "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4";
        request.Accept = "text/plain,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
        request.Timeout = 0x1388;
        request.Method = "POST";
        request.ContentType = "application/x-www-form-urlencoded";
        ASCIIEncoding encoding = new ASCIIEncoding();
        byte[] byteArray = encoding.GetBytes("tucao=411whatthefuck");
        Stream newStream = request.GetRequestStream();
        newStream.Write(byteArray, 0, byteArray.Length);//写入参数
        newStream.Close();
        HttpWebResponse response = request.GetResponse() as HttpWebResponse;

        if (response.StatusCode.Equals(HttpStatusCode.OK))
        {
            string content = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding("GB2312")).ReadToEnd();
            Dictionary<string, string> values = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);
            String success;
            if (values.TryGetValue("success", out success))
            {
                if (success.Equals("1"))
                {
                    string id;
                    values.TryGetValue("id", out id);
                    return int.Parse(id);
                }
                else
                {
                    return -1;
                }
            }
        }
        return -1;
    }
    //new user
    //从stu_info中获取用户名信息
    public static Tuple<bool,string,string> Validate_StuCommon(HttpCookie oCookie)
    {
        CookieContainer cookies = new CookieContainer();
        HttpWebRequest request = WebRequest.Create("http://stu.fudan.edu.cn/user/info") as HttpWebRequest;
        request.CookieContainer = cookies;
       
           
            Cookie oC = new Cookie();

            // Convert between the System.Net.Cookie to a System.Web.HttpCookie...
            oC.Domain = request.RequestUri.Host;
            oC.Expires = oCookie.Expires;
            oC.Name = oCookie.Name;
            oC.Path = oCookie.Path;
            oC.Secure = oCookie.Secure;
            oC.Value = oCookie.Value;

            request.CookieContainer.Add(oC);
        request.UserAgent = "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4";
        request.Accept = "text/plain,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
        request.Timeout = 0x1388;
        request.Method = "POST";
        request.ContentType = "application/x-www-form-urlencoded";
        ASCIIEncoding encoding = new ASCIIEncoding();
        byte[] byteArray = encoding.GetBytes("tucao=411whatthefuck");
        Stream newStream = request.GetRequestStream();
        newStream.Write(byteArray, 0, byteArray.Length);//写入参数
        newStream.Close();
        HttpWebResponse response = request.GetResponse() as HttpWebResponse;
       
        if (response.StatusCode.Equals(HttpStatusCode.OK))
        {
            string content = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding("GB2312")).ReadToEnd();
            Dictionary<string, string> values = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);
            String success;
            if (values.TryGetValue("success", out success))
            {
                if (success.Equals("1"))
                {
                    String stuno;
                    String nickname;
                    values.TryGetValue("stuno", out stuno);
                    values.TryGetValue("nickname", out nickname);
                    return new Tuple<bool,string,string>(true,stuno,nickname);
                }
                else
                {
                    return null;
                }
            }
        }
        return null;
    }
   
    //从stu_info中获取用户详细信息
    public static Darili_UserDetail Validate_StuDeatil(HttpCookie oCookie)
    {
        var id = Get_StuId(oCookie);
        CookieContainer cookies = new CookieContainer();
        HttpWebRequest request = WebRequest.Create("http://stu.fudan.edu.cn/user/profile/"+id.ToString()) as HttpWebRequest;
        request.CookieContainer = cookies;
        Cookie oC = new Cookie();
        // Convert between the System.Net.Cookie to a System.Web.HttpCookie...
        oC.Domain = request.RequestUri.Host;
        oC.Expires = oCookie.Expires;
        oC.Name = oCookie.Name;
        oC.Path = oCookie.Path;
        oC.Secure = oCookie.Secure;
        oC.Value = oCookie.Value;
        request.CookieContainer.Add(oC);
        request.UserAgent = "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4";
        request.Accept = "text/plain,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
        request.Timeout = 0x1388;
        request.Method = "GET";
        HttpWebResponse response = request.GetResponse() as HttpWebResponse;
        if (response.StatusCode.Equals(HttpStatusCode.OK))
        {
            string content = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding("GB2312")).ReadToEnd();
            Dictionary<string, string> values = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);
            String success;
            if (values.TryGetValue("success", out success))
            {
                if (success.Equals("1"))
                {
                    string weibo, major, name, dormitory, grade, gender, birthday, phone;
                    values.TryGetValue("weibo", out weibo);
                    values.TryGetValue("major", out major);
                    values.TryGetValue("name", out name);
                    values.TryGetValue("dormitory", out dormitory);
                    values.TryGetValue("phone", out phone);
                    values.TryGetValue("birthday", out birthday);
                    values.TryGetValue("gender",out gender);
                    values.TryGetValue("grade",out grade);
                    return new Darili_UserDetail(weibo, major, name, dormitory, phone, birthday,grade,gender);
                }
                else
                {
                    return null;
                }
            }
        }
        return null;
    }
    //获取当前登陆用户的信息(姓名，昵称，手机号)，如果没有登陆则返回null
    public static XElement GetUserInfo()
    {
        if (HttpContext.Current.User.Identity.Name != null)
        {
            string name =HttpContext.Current.User.Identity.Name;
            var ctx = new Darili_UserDataContext();
            var quary = from entry in ctx.Event_Users
                        where (entry.User_NickName == name|| entry.User_Realname == name)
                        select new
                        {
                            Id=entry.User_Id,
                            Cellphone = entry.User_CellPhone,
                            Nickname = entry.User_NickName,
                            Realname = entry.User_Realname
                        };
            var user = quary.First();
            XElement xml = new XElement("User", new XAttribute("Id", user.Id));
            xml.Add(new XElement("Cellphone", user.Cellphone),
                    new XElement("Nickname", user.Nickname),
                    new XElement("Realname", user.Realname));
            return xml;
        }
        else return null;
    }
    //以当前用户的身份订阅指定ID的活动
    public static XElement Subscribe(int id)
    {
        return null;
    }
   
   //判断本地用户信息库是否已存在该用户
    public static bool IsInitialized(string NickName)
    {
        var ctx = new Darili_UserDataContext();
        var quary = (from entry in ctx.Event_Users
                     where entry.User_NickName == NickName
                     select entry);
        var result = quary.ToList();

        return (result.Count != 0);
    }
    public static bool IsInitialized()
    {
        if (HttpContext.Current.User.Identity.Name != null)
        {
            return IsInitialized(HttpContext.Current.User.Identity.Name);
        }
        else return false;
    }
    public static bool IsAuthenticated()
    {
        return HttpContext.Current.User.Identity.IsAuthenticated;
    }
    //根据NickName 和UserId 初始化本地的表单
    //返回值：正数代表成功（为返回的UserId）
     //0表示查无此用户或其他异常
    //-1表示发生编辑冲突，未对数据库做出变动
    public static int Initialize(string NickName,int uid)
    {
        int status = 0;
        if (IsInitialized(NickName) == false)
        {
            var ctx = new Darili_UserDataContext();

            Event_Users user = new Event_Users
            {
                User_NickName = NickName,
                User_Id=uid
            };
            try
            {
                ctx.Event_Users.InsertOnSubmit(user);
                ctx.SubmitChanges();
                status = user.User_Id;
            }
            catch (ChangeConflictException)
            {
                foreach (ObjectChangeConflict confict in ctx.ChangeConflicts)
                {
                    confict.Resolve(RefreshMode.KeepCurrentValues);
                }
                status = -1;
                ctx.SubmitChanges();
            }
            finally
            {
                
            }
        }
        else status = 0;
        return status;

    }
    public static void InitializeIfNotInitialized()
    {
        if (!IsInitialized())
        {
            var uid = Get_StuId(HttpContext.Current.Request.Cookies["webpy_session_id"]);
            var nickname = HttpContext.Current.User.Identity.Name;
            if((uid!=-1)&&(!String.IsNullOrEmpty(nickname)))
            {
                Initialize(nickname,uid);
            }
        }

    }
    //记录token
    public static void Recordtoken(string NickName,string token)
    {
        //todo
        var ctx = new Darili_UserDataContext();
        if (IsInitialized(NickName))
        {
            HttpContext.Current.Response.Write(token);
            ctx.ExecuteCommand("UPDATE dbo.Event_Users SET User_Token=@p1 WHERE User_NickName = @p0", NickName,token);
            /**var user = ctx.Event_Users.Single(c => c.User_NickName == NickName);
            user.User_Token = token;
            try
            {
                ctx.SubmitChanges(ConflictMode.ContinueOnConflict);
               
            }
            catch (ChangeConflictException)
            {
                foreach (ObjectChangeConflict confict in ctx.ChangeConflicts)
                {
                    confict.Resolve(RefreshMode.KeepChanges);
                }
                ctx.SubmitChanges();
            }
            finally
            {

            }**/
        }
    }
    //记录登陆时间
    public static void RecordLoginTime(string NickName)
    {
        var ctx = new Darili_UserDataContext();
        if (IsInitialized(NickName))
        {
            var user = ctx.Event_Users.Single(c => c.User_NickName == NickName);
            user.User_LastLoginTime = DateTime.Now;
            try
            {
                ctx.SubmitChanges(ConflictMode.ContinueOnConflict);
            }
            catch (ChangeConflictException)
            {
                foreach (ObjectChangeConflict confict in ctx.ChangeConflicts)
                {
                    confict.Resolve(RefreshMode.OverwriteCurrentValues);
                }
                ctx.SubmitChanges();
            }
            finally
            {

            }
        }
    }
    //编辑用户信息（预留管理用借口）
    //1=成功 0=异常 -1=编辑冲突（覆盖前值）(未切换！）
    public static int UpdateUserInfo(string NickName,string RealName, string cellphone)
    {
        int status=0;
        var ctx = new Darili_UserDataContext();
        if (IsInitialized(NickName))
        {
            var user = ctx.Event_Users.Single(c => c.User_NickName == NickName);
            if (RealName != null)
            {
                user.User_Realname = RealName;
            }
            if (cellphone != null)
            {
                user.User_CellPhone = cellphone;
            }
            try
            {
                ctx.SubmitChanges();
                status=1;
            }
            catch (ChangeConflictException)
            {
                foreach (ObjectChangeConflict confict in ctx.ChangeConflicts)
                {
                    confict.Resolve(RefreshMode.OverwriteCurrentValues);
                }
                status = -1;
                ctx.SubmitChanges();
            }
            finally
            {
               
            }
           
        }
        return status;
    }
    public static int UpdateUserInfo(string RealName, string cellphone)
    {
        string user = HttpContext.Current.User.Identity.Name;
        if (IsAuthenticated() && IsInitialized())
        {
            return UpdateUserInfo(user, RealName, cellphone);
        }
        else return 0;
    }
    //输出用户信息(JSON格式）
    public static string GetUserInfo(string NickName,bool RequireDetailInfo,bool RequireRoles)
    {
        var ctx = new Darili_UserDataContext();
        XElement User_Root = new XElement("User");
        if (IsInitialized(NickName))
        {
            //用户存在，输出用户基本信息
            var user = ctx.Event_Users.Single(c => c.User_NickName == NickName);
            
                User_Root.Add("NickName", user.User_NickName);
                if (RequireDetailInfo)
                {
                    User_Root.Add("RealName", user.User_Realname);
                    User_Root.Add("CellPhone", user.User_CellPhone);
                    User_Root.Add("UserId", user.User_Id);
                }
                #region 是否获取角色信息
                if (RequireRoles)
                {
                    try
                    {
                        var roles = Roles.GetRolesForUser(NickName);
                        foreach (string role in roles)
                        {
                            User_Root.Add("Role", role);
                        }

                    }
                    catch (Exception e)
                    {
                        User_Root.Add("success",0);
                        User_Root.Add("exception", e.Message);
                    }
                }
                #endregion


        }
        else//用户不存在或用户未初始化
        {
            User_Root.Add("success", 0);
            User_Root.Add("exception", "用户不存在或未初始化");
        }
        return JsonConvert.SerializeXNode(User_Root);
    }
    public static int GetUnreadMessage(string NickName,string cat,string subcat)
    {
        var uctx = new Darili_UserDataContext();
        var evectx = new Darili_LinqDataContext();
        if (IsInitialized(NickName))
        {
            var user = uctx.Event_Users.Single(c => c.User_NickName == NickName);
            var events = from entry in evectx.EventMain
                         where entry.PublishTime >= user.User_LastLoginTime
                         select entry;
            if (subcat == "" || subcat == null)
            {
                if (cat != null && cat != "")
                    return events.Count(c => c.Type == cat);
                else return events.Count();
            }
            else
            {
                return events.Count(c => c.Type == cat && c.SubType == subcat);
            }
            throw new Exception("未知错误");

        }
        else throw new ArgumentException("人物未初始化");
    }
    //获取当前用户报名的活动
    public static List<Event> GetSubscription()
    {
        List<Event> list=new List<Event>();
        var ctx = new LikeAndGoDataContext();
        var quary = from entry in ctx.Event_Like
                    where entry.uid == Darili_User.Get_Uid_Local(HttpContext.Current.User.Identity.Name)
                    select entry.eid;

        foreach (var ele in quary.ToList())
        {
           list.Add(Event.GetEventById(ele));

        }
        return list;
    }
    public static int STU_UpdateUserInfo(string weibo, string major, string name, string dormitory, string phone, string birthday, HttpCookie oCookie)
    {
        var encoding = new ASCIIEncoding();
        string rStr = "weibo=" + weibo + "&major=" + major + "&name=" + name + "&dormiroty=" + dormitory + "&phone=" + phone + "&birthday=" + birthday;
        byte[] byteArray = encoding.GetBytes(rStr); //转化
        HttpWebRequest webReq = (HttpWebRequest)WebRequest.Create(new Uri("http://stu.fudan.edu.cn/user/profile"));
        webReq.Method = "POST";
        webReq.ContentType = "application/x-www-form-urlencoded";
        webReq.AllowAutoRedirect = false;
        webReq.ContentLength = byteArray.Length;
        Stream newStream = webReq.GetRequestStream();
        newStream.Write(byteArray, 0, byteArray.Length);//写入参数
        newStream.Close();
        HttpWebResponse response = (HttpWebResponse)webReq.GetResponse();
        
        return -1;
    }
    public static string Get_Nickname_Local(int User_id)
    {
        var ctx = new Darili_UserDataContext();
        try
        {
            var quary = (from entry in ctx.Event_Users
                         where entry.User_Id == User_id
                         select entry.User_NickName).First();
            if (quary == null || quary == "") return "Unknown";
            else return quary;
        }
        catch { return "Unknown"; }
            
         
    }
    public static int Get_Uid_Local(string nickname)
    {
        var ctx = new Darili_UserDataContext();
        try
        {
            var quary = (from entry in ctx.Event_Users
                         where entry.User_NickName == nickname
                         select entry.User_Id).First();
            if (quary == null)
            {
                /*try
                {
                    return Get_StuId(HttpContext.Current.Request.Cookies["webpy_session_id"]);
                }
                catch
                {
                    return -1;
                }*/
                return -1;
            }
            else return quary;
        }
        catch { return -1; }


    }
    public static string Get_Stuno_Local(string nickname)
    {
        var ctx = new Darili_UserDataContext();
        try
        {

            var quary = (from entry in ctx.Event_Users
                         where entry.User_NickName == nickname
                         select entry.User_Stuno);
            if (quary.Count() > 0)
            {
                var number = quary.First();
                if (!String.IsNullOrEmpty(number))
                {
                    return number;

                }
                else
                {
                    return null;
                }

            }
            else
            {
                return null;
            }
           
        }
        catch (Exception e)
        {
            return null;
        }

    }
    //在登录情况下，获取指定UID的profile 
    public static Darili_UserDetail Get_Profile_Remote(int uid)
    {
        var oCookie = HttpContext.Current.Request.Cookies["webpy_session_id"];

        var id = Get_StuId(oCookie);
        CookieContainer cookies = new CookieContainer();
        HttpWebRequest request = WebRequest.Create("http://stu.fudan.edu.cn/user/profile/" + id.ToString()) as HttpWebRequest;
        request.CookieContainer = cookies;
        Cookie oC = new Cookie();
        // Convert between the System.Net.Cookie to a System.Web.HttpCookie...
        oC.Domain = request.RequestUri.Host;
        oC.Expires = oCookie.Expires;
        oC.Name = oCookie.Name;
        oC.Path = oCookie.Path;
        oC.Secure = oCookie.Secure;
        oC.Value = oCookie.Value;
        request.CookieContainer.Add(oC);
        request.UserAgent = "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4";
        request.Accept = "text/plain,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
        request.Timeout = 0x1388;
        request.Method = "GET";
        HttpWebResponse response = request.GetResponse() as HttpWebResponse;
        if (response.StatusCode.Equals(HttpStatusCode.OK))
        {
            string content = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding("GB2312")).ReadToEnd();
            Dictionary<string, string> values = JsonConvert.DeserializeObject<Dictionary<string, string>>(content);
            String success;
            if (values.TryGetValue("success", out success))
            {
                if (success.Equals("1"))
                {
                    string weibo, major, name, dormitory, grade, gender, birthday, phone;
                    values.TryGetValue("weibo", out weibo);
                    values.TryGetValue("major", out major);
                    values.TryGetValue("name", out name);
                    values.TryGetValue("dormitory", out dormitory);
                    values.TryGetValue("phone", out phone);
                    values.TryGetValue("birthday", out birthday);
                    values.TryGetValue("gender", out gender);
                    values.TryGetValue("grade", out grade);
                    return new Darili_UserDetail(weibo, major, name, dormitory, phone, birthday, grade, gender);
                }
                else
                {
                    return null;
                }
            }
        }
        return null;
    }
}