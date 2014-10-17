using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Drawing;
using System.Drawing.Imaging;
using System.Web.UI;
using System.IO;
using System.Web.UI.WebControls;

public partial class g_Poster : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        
        Response.ContentType = "image/jpeg";
        int eid = Request.QueryString["id"] != null ? int.Parse(Request.QueryString["id"]) : 0;
        DirectoryInfo dir = new DirectoryInfo(HttpContext.Current.Server.MapPath("./Poster/" ));
        bool Thumb=Request.QueryString["Thumb"]=="1"?true:false;
        if (Thumb)
        {
            var ctx = new PosterDataContext();
            var quary = ctx.Event_Poster.Where(p => p.Event_id == eid).Select(p => p.thumb_stream);
            if (quary.Count() > 0)
            {
                var result = quary.First();
                Response.BinaryWrite(result.ToArray());
            }
            else
            {
                var nopic = System.Drawing.Image.FromFile(Server.MapPath("./") + "/img/pic-bigger.png");
                var str = new System.IO.MemoryStream();
                nopic.Save(str, nopic.RawFormat);
                Response.BinaryWrite(str.ToArray());
                nopic.Dispose();
                str.Dispose();

            }
        }
        else
        {
            var ctx = new PosterDataContext();
            var quary = ctx.Event_Poster.Where(p => p.Event_id == eid).Select(p => p.poster);
            if (quary.Count() > 0)
            {
               
                FileInfo[] files = dir.GetFiles(quary.First().ToString() + @".*");
                if (files.Count() > 0)
                {
                    var origin = System.Drawing.Image.FromStream(files[0].OpenRead());
                    MemoryStream ms = new MemoryStream();
                    origin.Save(ms, origin.RawFormat);
                    Response.BinaryWrite(ms.ToArray());
                    ms.Close();
                    origin.Dispose();

                }
                
            }
            else
            {
                var nopic = System.Drawing.Image.FromFile(Server.MapPath("./") + "/img/pic-L.png");
                var str = new System.IO.MemoryStream();
                nopic.Save(str, nopic.RawFormat);
                Response.BinaryWrite(str.ToArray());
                nopic.Dispose();
                str.Dispose();
            }
        }

        

    }
}