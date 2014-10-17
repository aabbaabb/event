using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Xml.Linq;
using Darili_api;
using System.Web.UI.WebControls;

public partial class Default2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        int eid = 17;
        var multipletime = Event.SeparateMultipleTimes(Event.GetMultipleTime(eid));
        Response.Write(multipletime);
     }
}