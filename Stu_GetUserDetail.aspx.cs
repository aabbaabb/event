using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web.UI.WebControls;
using System.IO;
using System.Net;
using System.Text;
using System.Web.Security;
using Darili_api;
using System.Xml;
using System.Data.Linq;
using System.Xml.Linq;

public partial class Stu_GetUserDetail : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            //Darili_User.Validate_StuDeatil(null);
            HttpCookieCollection cookies = Request.Cookies;
            var cookie = cookies["webpy_session_id"];
            Darili_User.Validate_StuDeatil(cookie);

        }
    }
}