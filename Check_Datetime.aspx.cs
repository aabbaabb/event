using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using System.Xml.Linq;

public partial class Check_Datetime : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //检查时间是否正确
        //传入参数：d1 日期1 |d2 日期2(可选） |t1 时间1| t2 时间2|flag 多时段
        //如果d2 传参存在，则为多时段判断
        //-1:日期错
        //-2:日期先后
        //-3：时间错
        //-4:时间先后
        if (!IsPostBack)
        {
            var d1 = Request.QueryString["d1"];
            var d2 = Request.QueryString["d2"];
            var t1 = Request.QueryString["t1"];
            var t2 = Request.QueryString["t2"];
            var flag = Request.QueryString["flag"];
            DateTime result1 = DateTime.Now;
            DateTime result2 = DateTime.Now;
            DateTime result3 = DateTime.Now;
            DateTime result4 = DateTime.Now;
            DateTime.TryParse(d1, out result1);
            DateTime.TryParse(d2, out result2);
            DateTime.TryParse(t1, out result3);
            DateTime.TryParse(t2, out result4);
            int SpanCompare = TimeSpan.Compare(result3.TimeOfDay, result4.TimeOfDay);
            int success;
            int DateCompare = DateTime.Compare(result1.Date, result2.Date);
            if (SpanCompare < 0)
            {
                success = 0;
            }
            else
            {
                
                    success = -4;
            }
            if (flag != "0")
            {
                if (DateCompare >= 0)
                {
                    success = -2;
                }
            }
            if (result1 == DateTime.MinValue || result2 == DateTime.MinValue&&flag!="0") success = -1;
            if (result3 == DateTime.MinValue || result4 == DateTime.MinValue) success = -3;
            if (flag == "3")
            {
                if (result1 != DateTime.MinValue && result2 != DateTime.MinValue && result3 != DateTime.MinValue && result4 != DateTime.MinValue)
                {
                    result1 = result1 + result3.TimeOfDay;
                    result2 = result2 + result4.TimeOfDay;
                    if (result1 > result2)
                    {
                        success = -4;
                    }
                    else
                    {
                        success = 0;
                    }
                }
                else
                {
                    success=-3;
                }
            }
            Response.Write(success);

        }
    }
}