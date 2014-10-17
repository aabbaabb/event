using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using Darili_api;
using System.Web.UI.WebControls;

public partial class Comment_Delete : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //未添加验证逻辑
        string success = "{\"success\":\"1\"}";
        string fail = "{\"success\":\"0\"}";

        try
        {
            int cid = Request.QueryString["cid"] == null ? 0 : int.Parse(Request.QueryString["cid"]);
            if (cid != 0)
            {
                bool flag=Darili_Comments.DeleteComment(cid);
                if (flag == true)
                {
                    Response.Write(success);
                }
                else
                {
                    Response.Write(fail);

                }
            }
        }
        catch (Exception exp)
        {
            Response.Write(fail);
        }
    }
}