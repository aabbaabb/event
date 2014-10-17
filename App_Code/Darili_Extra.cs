using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;
using System.Data;
using  Newtonsoft.Json;
using System.Drawing.Imaging;
using Darili_api;
using System.Web;
using System.IO;
using System.Xml;
using Newtonsoft.Json.Linq;
using System.Xml.Linq;
using System.Net;

/// <summary>
///Darili_Extra 的摘要说明
///一些细小的功能的储藏地
/// </summary>
namespace Darili_api
{
public class Darili_Extra
{
	public Darili_Extra()
	{
		//
		//TODO: 在此处添加构造函数逻辑
		//
	}
    public static string success = "{\"success\":\"1\"}";
    public static string fail = "{\"success\":\"0\"}";
    public static string[] AllowedMineType = { "image/gif", "image/jpeg", "image/png", "application/x-ms-bmp", "image/nbmp" };
    public static System.Drawing.Imaging.ImageFormat GetExt(string MIME)
    {
        switch (MIME.ToLower().Trim())
        {
            case "image/gif": return System.Drawing.Imaging.ImageFormat.Gif;
            case "image/jpeg": return System.Drawing.Imaging.ImageFormat.Jpeg;
            case "image/png": return System.Drawing.Imaging.ImageFormat.Png;
            case "application/x-ms-bmp":
            case "image/nbmp": return System.Drawing.Imaging.ImageFormat.Bmp;
            default: return null;
        }
    }
    public static EncoderParameters GetJpegQuality(int quality)
    {
        var myEncoderParameters = new EncoderParameters(1);
        var myEncoderParameter = new EncoderParameter(Encoder.Quality, 25L);
        myEncoderParameters.Param[0] = myEncoderParameter;
        return myEncoderParameters;
    }
    public static ImageCodecInfo GetEncoderInfo(String mimeType)
    {
        int j;
        ImageCodecInfo[] encoders;
        encoders = ImageCodecInfo.GetImageEncoders();
        for (j = 0; j < encoders.Length; ++j)
        {
            if (encoders[j].MimeType == mimeType)
                return encoders[j];
        }
        return null;
    }
    public static int CalculateTimeSpan(int first, int second)
    {
        return first <= second ? second - first : second - first + 7;
    }

    public static string GetFormat(string MIME)
    {
        switch (MIME.ToLower().Trim())
        {
            case "image/gif": return ".gif";
            case "image/jpeg": return ".Jpeg";
            case "image/png": return ".Png";
            case "application/x-ms-bmp":
            case "image/nbmp": return ".Bmp";
            default: return null;
        }
    }
    public static int GetSubscriptionNum(int id)
    {
        var ctx = new LikeAndGoDataContext();
        return (from entry in ctx.Event_Subscription where entry.eid == id select entry.eid).Count();
    }
    public static int GetLikeNum(int id)
    {
        var ctx = new LikeAndGoDataContext();
        return (from entry in ctx.Event_Like where entry.eid == id select entry.eid).Count();
    }
    public static string GetTag(int id)
    {
        return "测试";
    }
    public static int GetReplyNum(int eid)
    {
        CommentDataContext ctx = new CommentDataContext();
        var quary=(from entry in ctx.Event_Comments
                  where entry.Comment_EventId==eid
                       select entry.id).Count();
        return quary;

    }
    public static int GetShareNum(int id)
    {
        return 0;
    }
    public static bool LikeExists(int uid, int eid)
    {
        LikeAndGoDataContext ctx = new LikeAndGoDataContext();
        var quary = from entry in ctx.Event_Like
                    where entry.eid == eid && entry.uid == uid
                    select entry;
        return quary.Count() > 0;
    }
    public static bool SubscribeExists(int uid, int eid)
    {
        LikeAndGoDataContext ctx = new LikeAndGoDataContext();
        var quary = from entry in ctx.Event_Subscription
                    where entry.eid == eid && entry.uid == uid
                    select entry;
        return quary.Count() > 0;
    }
    public static Tuple<int, int, int> TimeLeft(Event eve)
    {
        var ctx = new Darili_LinqDataContext();
        var query = ctx.Event_BM.Where(p => p.id == eve.Id).Select(p => p.EndTime);
        if (query.Count() > 0)
        {
            TimeSpan span = query.First() - DateTime.Now;
            return new Tuple<int, int, int>(span.Days, span.Hours, span.Minutes);
        }
        else
        {
            return null;
        }
        /*
        else
        {
            TimeSpan span = eve.StartTime - DateTime.Now;
            return new Tuple<int, int, int>(span.Days, span.Hours, span.Minutes);
        }
        */
    }
    public static Tuple<int,int,int>TimeLeft2(Event eve)
    {

        
            TimeSpan span = eve.EndTime - DateTime.Now;
            return new Tuple<int, int, int>(span.Days, span.Hours, span.Minutes);
        
        

}
    public static XElement[] GetAlbum(int id, string FatherPath)
    {
        List<FileInfo> result = new List<FileInfo>();
        string path = FatherPath + "img/album/" + id.ToString();

        if (Directory.Exists(path))
        {
            DirectoryInfo dir = new DirectoryInfo(path);
            FileInfo[] files = dir.GetFiles();
            if (files.Length > 0) result.AddRange(files);
        }
        XElement root = Darili_Extra.ForceArray(new XElement("root"),true);
        foreach (var elements in result)
        {
            root.Add(Darili_Extra.ForceArray(new XElement("Album","http://"+HttpContext.Current.Request.Url.Host+":"+HttpContext.Current.Request.Url.Port+ "/img/album/" +id.ToString()+ "/"+elements.ToString()),false));

        }
        return root.Elements().ToArray();
    }
    public static XElement GetAlbum_new(int id)
    {
        if (Directory.Exists(HttpContext.Current.Server.MapPath("./img/album/"+id.ToString()+"/")))
        {
            DirectoryInfo dir = new DirectoryInfo(HttpContext.Current.Server.MapPath("./img/album/" + id.ToString() + "/"));


            var root = Darili_Extra.ForceArray(new XElement("root"), true);
            var ctx = new Darili_LinqDataContext();
            var result = ctx.Event_Album.Where(p => p.eid == id).Select(p => p);
            foreach (var element in result.ToList())
            {
                FileInfo[] files = dir.GetFiles(element.filename.ToString()+@".*");
                if (files.Length > 0)
                {
                    XElement ToAdd = Darili_Extra.ForceArray(new XElement("Album"),false);
                    ToAdd.Add(new XElement("src", "img/album/" + id.ToString() + "/" + files[0].ToString()), new XElement("description", element.description));
                    
                    
                  root.Add(ToAdd);
                }
            }
            return root;
        }
        return null;
    }
    public static String[] GetHosts(int id)
    {
        var ctx = new Darili_LinqDataContext();
        var quary = from entry in ctx.Host
                    where entry.Event_id == id
                    select entry.Name;
        return quary.ToArray();
    }
    public static XElement[] ForceArray(XElement ele)
    {
     
        
        return new XElement[] { ele, new XElement(ele.Name) };

    }
    public static XElement ForceArray(XElement ele, bool IsRoot)
    {
        XElement temp = ele;
        if (IsRoot)
        {
            ele.Add(new XAttribute(XNamespace.Xmlns + "json", "http://james.newtonking.com/projects/json"));
        }
        else
        {
            string xml = "<root xmlns:json='http://james.newtonking.com/projects/json' id='1'><" + ele.Name + @" json:Array='true'>" + ele.Value + @"</" + ele.Name + "> </root>";
            var xresult = XElement.Parse(xml);
            return xresult.Element(ele.Name);
        }
        return ele;
    }
    public static bool LiveExists(int eid)
    {
        var ctx = new Darili_LinqDataContext();
        var quary = from entry in ctx.Event_Live
                    where entry.eid == eid
                    select entry.eid;
        return quary.Count() > 0;

    }
    public static int GetChannelv_Vid(int eid)
    {
        var ctx = new Darili_LinqDataContext();
        var quary = from entry in ctx.Event_Live
                    where entry.eid == eid
                    select entry;
        if (quary.Count() > 0)
        {
            var entry = quary.First();
            if (entry.channelV_vid.HasValue)
            {
                return entry.channelV_vid.Value;
            }
            else return 0;
        }
        else return -1;
    }
}
public class Extra_Lecture
{
    public string Brand;
    public string speakerinfo;
    public static Extra_Lecture GetExtraInfo(int id)
    {
        Darili_LinqDataContext ctx = new Darili_LinqDataContext();
        var quary = (from entry in ctx.Event_LectureEx
                    where entry.event_id == id
                    select entry);
        if (quary.Count() >0)
        {
            return new Extra_Lecture
            {
                Brand = quary.First().Brand,
                speakerinfo = quary.First().speakerinf
            };

        }
        else return null;
    }
    
}

    }