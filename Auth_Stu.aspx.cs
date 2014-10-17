using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Security;
using Newtonsoft.Json;


public partial class Auth_Stu : System.Web.UI.Page
{
    private static TimeSpan autoUnlock = TimeSpan.FromHours(0.5);
    public static HttpCookie Set_Cookie(string str)
    {
        var sb = str.Split(';');
        if (str.IndexOf("webpy_session_id") != -1)
        {
            HttpCookie cookie = new HttpCookie("webpy_session_id");
            string value = sb[0].Substring(17);
            cookie.HttpOnly = true;
            cookie.Path = "/";
            
            cookie.Value =value;
            return cookie;
        }
        return null;
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            
            string strId = Request.QueryString["stuno"];
            string strPassword = Request.QueryString["password"];
            strId = Request.Form["stuno"] != "" ? Request.Form["stuno"] : strId;
            strPassword = Request.Form["password"] != "" ? Request.Form["password"] : strPassword;
            string ret = string.Empty;
            string str = "stuno=" + strId + "&" + "password="+strPassword;
            ASCIIEncoding encoding = new ASCIIEncoding();
            try
            {
                byte[] byteArray = encoding.GetBytes(str); //转化
                HttpWebRequest webReq = (HttpWebRequest)WebRequest.Create(new Uri("http://stu.fudan.edu.cn/user/login"));
                webReq.Method = "POST";
                webReq.ContentType = "application/x-www-form-urlencoded";
                webReq.AllowAutoRedirect = false;
                webReq.ContentLength = byteArray.Length;
                Stream newStream = webReq.GetRequestStream();
                newStream.Write(byteArray, 0, byteArray.Length);//写入参数
                newStream.Close();
                HttpWebResponse response = (HttpWebResponse)webReq.GetResponse();
                string py_cookie=response.GetResponseHeader("Set-Cookie");
                HttpCookie auth_cookie=Set_Cookie(py_cookie);
                var result = Darili_User.Validate_StuCommon(auth_cookie);
                if (result.Item1 == true)
                {
                    if (!Darili_User.IsInitialized(result.Item3))
                    {
                        //初始化本地用户数据库
                        int uid = Darili_User.Get_StuId(auth_cookie);
                        string nickname = result.Item3;
                        if(Darili_User.Initialize(nickname, uid)!=uid)throw new Exception();
                    }
                    Darili_User.RecordLoginTime(result.Item3);
                    RedictFromLoginPage(result.Item3, result.Item2, auth_cookie);
                }
                else
                {
                 //未完成，暂时跳白屏
                }
               // Response.Write(result);
                /*StreamReader sr = new StreamReader(response.GetResponseStream(), Encoding.Default);
                ret = sr.ReadToEnd();
                sr.Close();
                response.Close();
                newStream.Close();*/
            }
            catch (Exception ex)
            {
              
            }
        }

    }
    private void RedictFromLoginPage(string nickname, string stuno,HttpCookie webpy)
    {
        HttpCookie cookie = new HttpCookie("stuno");
        cookie.HttpOnly = true;
        cookie.Value = stuno;
        Response.Cookies.Add(cookie);
        Response.Write("");
        Response.AppendCookie(webpy);
        FormsAuthentication.RedirectFromLoginPage(nickname, false);
    }
    
}