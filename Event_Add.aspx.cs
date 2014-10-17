using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web.UI.WebControls;

public partial class Event_Add : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string json = @"{
'event':{
'title':'从毛到无：巴迪欧的“第二现代性”、佛教的马克斯什么乱七八糟我打的还不够长这些应该是省略号',
'subtitle':'复旦大学站',
'starttime':'2013-02-15T00:00:00Z',
'endtime':'2013-02-15T22:00:00Z',
'location':'文科楼424室',
'type':'讲座',
'extrainfo':{
'speaker':'金文',
'class':'博士'},
'subtype':'科技',
'context':'没有金克拉，怎么种庄稼',
'multipletime':[
{'starttime':'2013-02-16T00:00:00Z','endtime':'2013-02-16T12:00:00Z','isroutine':'0','routine':''},
{'starttime':'2013-02-17T00:00:00Z','endtime':'2013-02-17T12:00:00Z','isroutine':'0','routine':''}]
}
}";
        string result=Darili_EventManuever.AddSubscription(json);
        Response.Write(result);
    }
}