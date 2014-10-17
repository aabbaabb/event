using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class User_Initialize : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            var flag = Darili_User.IsInitialized();
            var flag2 = Darili_User.IsAuthenticated();
            Label2.Text = Page.User.Identity.Name;
            Label1.Text = flag.ToString();
        }
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        if (Darili_User.IsAuthenticated())
        {

            try
            {
                var User_Id = Darili_User.Validate_StuCommon(Request.Cookies["webpy_session_id"]);

                var update_status = Darili_User.UpdateUserInfo(TextBox1.Text, TextBox2.Text);
                Label3.Text = update_status.ToString() + "|" + DateTime.Now;

            }
            catch (Exception exp)
            {
                Label3.Text = exp.Message;

            }
        }
    }
}