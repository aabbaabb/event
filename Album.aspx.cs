using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Linq;
using Newtonsoft.Json;
using Darili_api;

public partial class Album : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Request.Files.Count > 0)
            {
                //添加相册
            }
            else
            {
                int id = Request.QueryString["id"] != null ? int.Parse(Request.QueryString["id"]) : 0;
                Response.Write(JsonConvert.SerializeXNode(Darili_Extra.GetAlbum_new(id),Formatting.None,true));
            }
        }
    }
}