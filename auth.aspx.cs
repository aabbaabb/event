using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Web;
using System.Web.Security;
using Newtonsoft.Json;
using System.Text;
using System.Security.Cryptography;
public partial class auth : System.Web.UI.Page
{
    private bool checkhash(string token,string uid,string username,string stuid,string email,string sign){
        bool success=false;
        string appid = "ac81396d2793d0911c170980b5cbdc4e0977bc957beb5b178241efe41317933d";
        string appsecret = "124ec0d994e611edc0d8a82bd5b700258aa3efb6f94dfb3356b5451a9ac9e328";
        
        string stringtemp = token + "|" + uid + "|" + username + "|" + stuid + "|" + email + "|" + appsecret;
        byte[] SHA256Data = System.Text.UTF8Encoding.UTF8.GetBytes(stringtemp);
        SHA256Managed Sha256 = new SHA256Managed();
        byte[] Result = Sha256.ComputeHash(SHA256Data);
        string result = "";
        string temp;
        for (int i = 0; i < Result.Length; i++)
        {
            temp = Result[i].ToString("X");
            if (temp.Length < 2)
            {
                temp = "0" + temp;
            }
            result += temp;
        }
        result = result.ToLower();
        if (sign == result)
            success = true;
        else
            success = false;
        return success;
    }
    protected void Page_Load(object sender, EventArgs e)
    {
       //var result= Darili_User.Validate_StuCommon(Request.Cookies["webpy_session_id"]);
        //if (result.Item1 == true)
        string stuid, email, sign, uid, token, username;
        stuid = "";
        email = "";
        sign = "";
        uid = "";
        token = "";
        username = "";
        
        if (Request["username"] != null)
            username = Request["username"].ToString();
        // Response.Redirect(username);
        if (Request["email"] != null)
            email = Request["email"].ToString();
        if (Request["stuid"] != null)
            stuid = Request["stuid"].ToString();
        if (Request["token"] != null)
            token = Request["token"].ToString();
        if (Request["sign"] != null)
            sign = Request["sign"].ToString();
        if (Request["uid"] != null)
            uid = Request["uid"].ToString();
        if(Request.QueryString["result"]=="1"&& checkhash(token,uid,username,stuid,email,sign))
        {
            //Response.Redirect("1234");
            if (!Darili_User.IsInitialized(username))
            {
                //初始化本地用户数据库
                //int uid = Darili_User.Get_StuId(Request.Cookies["webpy_session_id"]);
                int uidtemp = int.Parse(uid)+3000;
                string nickname = username; 
                if (Darili_User.Initialize(nickname, uidtemp) != uidtemp) 
                    throw new Exception();
                
            }
            Darili_User.Recordtoken(username, token);
            Darili_User.RecordLoginTime(username);
           
            RedictFromLoginPage(username, stuid);
            // RedictFromLoginPage(result.Item3, result.Item2,Request.Cookies["webpy_session_id"]);
        }
        else
        {
            Response.Redirect("main.html");
        }
    }
    private void RedictFromLoginPage(string nickname, string stuno)
    {
        HttpCookie cookie = new HttpCookie("stuno");
        cookie.HttpOnly = true;
        cookie.Value = stuno;
        Response.Cookies.Add(cookie);
        Response.Write("");
        FormsAuthentication.RedirectFromLoginPage(nickname, false);
    }
    private void RedictFromLoginPage(string nickname, string stuno, HttpCookie webpy)
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