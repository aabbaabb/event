using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Xml.Linq;
using System.Web.UI.WebControls;
using Darili_api;


public partial class Darili_Subscription : System.Web.UI.Page
{
    
    string user = HttpContext.Current.User.Identity.Name;
    protected void Page_Load(object sender, EventArgs e)
    {
       
    }
    //为当前用户订阅ID=id的项目
    protected XElement Subscribe(int id)
    {
        try
        {
            if (user == null) throw new Exception("用户未登陆");
            else if (Event.GetEventById(id) == null) throw new ArgumentException("活动ID未找到", "id");
            else
            {
                return null;
            }
        }
        catch (Exception exp)
        {
            return new XElement("Exception", new XCData(exp.Message.ToString()));
        }

    }
}