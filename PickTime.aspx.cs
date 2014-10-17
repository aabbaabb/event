using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Xml.Linq;
using Darili_api;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
public partial class PickTime : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
         XElement Xml_Root = new XElement("allevents", null);
        DateTime Date = DateTime.Parse(Request.QueryString["d"]);
        string page = Request.QueryString["page"] != null ? Request.QueryString["page"] : "0";
        string perpage = Request.QueryString["perpage"] != null ? Request.QueryString["perpage"] : "5";
        var events=Event.GetTimeSpan(Date.Date,Date.Date+new TimeSpan(1,0,0,0),"","",true,int.Parse(perpage),int.Parse(page));
        XElement[] Elements = Event.Translte_Xml(events).ToArray();

                if (Elements != null&&events[0]!=null)
                {
                    foreach (XElement element in Elements)
                    {
                        Xml_Root.Add(element);
                    }
                    Xml_Root.Add(new XElement("success", 1));
                }
                Response.Clear();
                Response.Write(JsonConvert.SerializeXNode(Xml_Root));
            }

   }