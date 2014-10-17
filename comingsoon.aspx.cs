using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Xml.Linq;
using Newtonsoft.Json;
using System.Web.UI.WebControls;

public partial class comingsoon : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    public bool IsEmail(string str_Email)
    {
        return System.Text.RegularExpressions.Regex.IsMatch(str_Email, @"^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$");

    }
    protected void form_try_Click1(object sender, EventArgs e)
    {
        string email = form_text.Text;
        if (IsEmail(email))
        {
            var ctx = new commingsoonDataContext();
            var count = (from entry in ctx.Event_commingsoon
                         where entry.email == email
                         select entry).Count();
            if (count == 0)
            {
                var addr = new Event_commingsoon
                {
                    email = email
                };
                ctx.Event_commingsoon.InsertOnSubmit(addr);
                try
                {
                    ctx.SubmitChanges();
                    Label1.Text = "订阅成功！";
                }
                catch (Exception exp)
                {
                    Label1.Text = exp.Message;
                }

            }
            else
            {
                Label1.Text="你已经订阅了！";
            }
        }
            else
            {
                Label1.Text = "错误：非标准的email格式";
            }
        
    }
}