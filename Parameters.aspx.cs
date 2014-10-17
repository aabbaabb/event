using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using Darili_api;
using Newtonsoft.Json;
using System.Web.UI.WebControls;
using System.Xml.Linq;
public partial class Parameters : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!String.IsNullOrEmpty(Request.QueryString["id"]))
        {
            var sub=new Darili_Subscription_Parameters(int.Parse(Request.QueryString["id"]));
            XElement root = Darili_Extra.ForceArray(new XElement("Root"), true);
            if (sub.root != null)
            {
                foreach (var elements in sub.root.Elements().Reverse())
                {
                    root.Add(Darili_Extra.ForceArray(elements, false));
                }
            }
            var times=Event.SeparateMultipleTimes(Event.GetMultipleTime(int.Parse(Request.QueryString["id"])));
            foreach(var element in times)
            {
                XElement Times_root = Darili_Extra.ForceArray(new XElement("Times"),false);
                Times_root.Add(new XElement("StartTime", element.starttime), new XElement("EndTime", element.endtime));
                root.Add(Times_root);

            }
            Response.Write(JsonConvert.SerializeXNode(root));
        }
    }
}