using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using System.Xml.Linq;
using Darili_api;

public partial class albumtest : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        int id=Request.QueryString["id"]!=""?int.Parse(Request.QueryString["id"]):0;
        var result = Darili_Extra.GetAlbum(id,Server.MapPath("./"));
        Response.Write(JsonConvert.SerializeXNode(new XElement("root",result)));
    }
}