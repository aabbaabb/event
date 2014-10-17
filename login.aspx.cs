using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Xml.Linq;
using System.Data.Linq;
using System.Web.UI.WebControls;
using System.Text;
using System.Security.Cryptography;
using Darili_api;

public partial class Like : System.Web.UI.Page
{

    private string GetCode()
    {
        int number; char code;
        string checkCode = String.Empty;
        Random random = new Random();
        for (int i = 0; i < 6; i++)
        {
            number = random.Next();
            if (number % 2 == 0)
                code = (char)('0' + (char)(number % 10));
            else
                code = (char)('A' + (char)(number % 26));
            checkCode += code.ToString();
        }
        return checkCode;
    }

    protected void Page_Load(object sender, EventArgs e)
    {

        var url = Request.QueryString["returnurl"];
        string appid = "ac81396d2793d0911c170980b5cbdc4e0977bc957beb5b178241efe41317933d";
        string returnurl = url;
        string state = GetCode();
        string appsecret = "124ec0d994e611edc0d8a82bd5b700258aa3efb6f94dfb3356b5451a9ac9e328";
        string stringtemp=returnurl+"|"+appid+"|"+state+"|||"+appsecret;
        byte[] SHA256Data = System.Text.Encoding.Default.GetBytes(stringtemp);
        SHA256Managed Sha256 = new SHA256Managed();
        byte[] Result = Sha256.ComputeHash(SHA256Data);
        string result="";
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
        string changeurl = "http://stu.fudan.edu.cn/teleport/gateway/request?returnurl="+returnurl+"&appid="+appid+"&state="+state+"&sign="+sign;
        Response.Redirect(changeurl);
    }
}