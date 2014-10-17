using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Security.Cryptography;

public partial class logout : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Session.Remove("OrgName");
        Session.Remove("IsMinorOrg");
        Session.Clear();
        FormsAuthentication.SignOut();
        string appid = "ac81396d2793d0911c170980b5cbdc4e0977bc957beb5b178241efe41317933d";
        string returnurl = "http://stu.fudan.edu.cn/event/main.html";
        string appsecret = "124ec0d994e611edc0d8a82bd5b700258aa3efb6f94dfb3356b5451a9ac9e328";
        string stringtemp = returnurl + "|" + appsecret;
        byte[] SHA256Data = System.Text.Encoding.Default.GetBytes(stringtemp);
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
        string sign = result;
        Response.Redirect("http://stu.fudan.edu.cn/teleport/gateway/logout?returnurl="+returnurl+"&appid="+appid+"&sign="+sign);
    }
}