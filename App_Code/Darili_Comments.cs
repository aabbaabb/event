using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Web;
using Darili_api;
using System.Xml;
using System.Xml.Linq;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

/// <summary>
///Darili_Comments 的摘要说明
/// </summary>
/// 
namespace Darili_api
{
    public class Comment
    {
        public int id { get; set; }
        public int Event_id { get; set; }
        public int User_Id;
        public string content;
        public DateTime time;
        #region 构造函数
        public static implicit operator Comment(Event_Comments value)
        {
            return new Comment(value.id, value.Comment_EventId, value.Comment_Maker, value.Comment_Detail,value.Comment_PublishTime);
        }
        public static implicit operator Event_Comments(Comment value)
        {
            return new Event_Comments
            {
                Comment_EventId = value.Event_id,
                Comment_Detail = value.content,
                Comment_Maker = value.User_Id,
                id = value.id,
                Comment_PublishTime = value.time

            };
        }
        public Comment()
        {
        }
        public Comment(int _id, int _Event_id, int
     _Comment_Maker, string _Comment_Detail)
        {
            id = _id;
            Event_id = _Event_id;
            User_Id = _Comment_Maker;
            content = _Comment_Detail;
            time = DateTime.Now;
        }
        public Comment(int _id, int _Event_id, int
    _Comment_Maker, string _Comment_Detail,DateTime publishtime)
        {
            id = _id;
            Event_id = _Event_id;
            User_Id = _Comment_Maker;
            content = _Comment_Detail;
            time = publishtime;
        }
        public Comment(int _Event_id, int _Comment_Maker, string _Comment_Detail)
        {

            Event_id = _Event_id;
            User_Id = _Comment_Maker;
            content = _Comment_Detail;
            time = DateTime.Now;
        }

        #endregion
    }
    public class Darili_Comments
    {
        public Darili_Comments()
        {
            //
            //TODO: 在此处添加构造函数逻辑
            //
        }
        public static Comment[] GetCommentsById(int id)
        {
            CommentDataContext ctx = new CommentDataContext();
            var quary = from entry in ctx.Event_Comments
                        where entry.Comment_EventId == id
                        orderby entry.Comment_PublishTime descending
                        select entry;
            var list = quary.ToList();
            List<Comment> result = new List<Comment>();
            foreach (var e in list)
                result.Add(e);
            return result.ToArray();



        }
        public static int MakeComment(int Maker, int Event_Id, string Detail)
        {
            Event_Comments comm = new Comment(Event_Id, Maker, Detail);
            try
            {
                CommentDataContext ctx = new CommentDataContext();

                ctx.Event_Comments.InsertOnSubmit(comm);
                ctx.SubmitChanges();
            }
            catch (Exception e)
            {
                throw e;

            }
            return comm.id;
        }
        public static bool DeleteComment(int id)
        {
            try
            {
                CommentDataContext ctx = new CommentDataContext();
                var quary = from entry in ctx.Event_Comments
                            where entry.id == id
                            select entry;
                foreach (var entry in quary)
                {
                    ctx.Event_Comments.DeleteOnSubmit(entry);
                }
                ctx.SubmitChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }

        }

    }
}