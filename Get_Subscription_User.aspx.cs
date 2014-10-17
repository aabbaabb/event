using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Darili_api;
using System.Web.UI;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Xml.Linq;
using System.Web.UI.WebControls;

public partial class Get_Subscription_User : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if(Darili_User.IsAuthenticated())
            {
                var events = Darili_User.GetSubscription().ToArray();
                var XRoot=new XElement("Subscription",Event.Translte_Xml(events));
                Response.Write(JsonConvert.SerializeXNode(XRoot));

            }
    }
}
}