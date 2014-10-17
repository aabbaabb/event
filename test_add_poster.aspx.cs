using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Drawing;
using System.Drawing.Imaging;
using System.Web.UI;
using System.IO;
using Newtonsoft.Json.Linq;
using System.Web.UI.WebControls;
using Darili_api;

public partial class test_add_poster : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //这是add-event的后续插入海报的页面
        #region 处理海报（插入后，因为要获取ID）
        try
            {
			string id = Session["post_id"] != null ? Session["post_id"].ToString() : "1";
                if (Request.Files.Count > 0 && Page.User.Identity.Name!="")
                {
			
                    PosterDataContext ctx = new PosterDataContext();
                    if (Request.Files[0].ContentLength > 4194304) throw new ArgumentOutOfRangeException("图片过大:" + (Request.Files[0].ContentLength / (1024 * 1024))
                        .ToString() + "M");
                    
                    string path = Server.MapPath("~/Poster/");
                    var length = Request.Files[0].ContentLength;
                    if (length > 0 && Darili_Extra.GetExt(Request.Files[0].ContentType) != null)
                    {
                        var stream = Request.Files[0].InputStream;
                        var origin = System.Drawing.Image.FromStream(stream);

                        var alter = new Bitmap(origin, new Size(120, 180));
 
                        var guid_alter = Guid.NewGuid();

                        var guid_origin = Guid.NewGuid();
                        alter.Save(path + guid_alter + Darili_Extra.GetFormat(Request.Files[0].ContentType), Darili_Extra.GetExt(Request.Files[0].ContentType));
                        
                        Request.Files[0].SaveAs(path + guid_origin + Darili_Extra.GetFormat(Request.Files[0].ContentType));
                        MemoryStream ms = new MemoryStream();
                        alter.Save(ms, Darili_Extra.GetExt(Request.Files[0].ContentType));
                        byte[] buffer = ms.ToArray();

                        
                            
                        stream.Close();
                        alter.Dispose();
                        origin.Dispose();
                        try
                        {
                            var query = from entry in ctx.Event_Poster
                                        where entry.Event_id == int.Parse(id)
                                        select entry;
                            if (query.Count() > 0)
                            {
                                foreach (var element in query)
                                {
                                    element.poster = guid_origin;
                                    element.poster_thumb = guid_alter;
                                    element.thumb_stream = buffer;
                                }
                                
                            }
                            else
                                ctx.Event_Poster.InsertOnSubmit(new Event_Poster
                                    {
                                        Event_id=int.Parse(id),
                                        poster=guid_origin,
                                        poster_thumb=guid_alter,
                                        thumb_stream=buffer
                                    });
                            ctx.SubmitChanges();
                        }
                        catch (Exception exp)
                        {

                           
                            throw exp;
                        }

                    }

                }
				else
				{
				
				}
                JObject response = new JObject(new JProperty("success", 1),
                        new JProperty("id", int.Parse(id)));
                Response.Write(response);
                
              
            }
            catch (Exception exp)
            {
                JObject j = new JObject(new JProperty("success", 0),
                 new JProperty("err",exp.Message));
                Response.Write(j);
            }
             
        #endregion

    }
}