using System;
using System.Collections.Generic;
using System.Linq;
using Darili_api;
using System.Web;
using System.Web.Security;

/// <summary>
///Event_RoleControl 的摘要说明
/// </summary>
namespace Darili_api
{
    public class Event_RoleControl
    {
        public static bool IsOwner(int eid)
        {
            Darili_LinqDataContext ctx = new Darili_LinqDataContext();
            string NickName = HttpContext.Current.User.Identity.Name;
            var Publisher = ctx.EventMain.Where(P => P.Id == eid).Select(p => p.Publisher).First();
           
            return (Publisher == NickName || IsOrgManager(Publisher,NickName));

        }
        public Event_RoleControl()
        {
            //
            //TODO: 在此处添加构造函数逻辑
            //
        }
        public static bool IsAdmin(string NickName)
        {
            return Roles.IsUserInRole(NickName, "Admin");
        }
        public static bool OwnerOrAdmin(int eid)
        {
            return IsAdmin(HttpContext.Current.User.Identity.Name) || IsOwner(eid);
        }
        public static void RequireOrganization(string OrganizeName,string type)
        {
            if ((!HttpContext.Current.User.IsInRole("Blocked")))
            {
                Event_orgDataContext ctx = new Event_orgDataContext();
                Event_Org orga = new Event_Org
                {
                    NickName = HttpContext.Current.User.Identity.Name,
                    Org_Name = OrganizeName,
                    IsProved = false,
                    Type=type
                };
                ctx.Event_Org.InsertOnSubmit(orga);
                
                ctx.SubmitChanges();

            }
            else
            {
                HttpContext.Current.Response.StatusCode = 403;
                HttpContext.Current.Response.End();
            }
        }
        public  enum RoleControlLevel
        {
            AllAcceptable = -1,
            NeedOrganization = 1,
            AdminOnly = 2
        }
        public static bool IsOrg(string OrgName, string NickName)
        {
            Event_orgDataContext ctx = new Event_orgDataContext();
            var query = from entry in ctx.Event_Org
                        where entry.Org_Name == OrgName && entry.NickName == NickName&&entry.IsProved==true
                        select entry.id;
            return query.Count() > 0;
        }
        public static bool IsMonorOrg(string OrgName, string NickName)
        {
            Event_orgDataContext ctx = new Event_orgDataContext();
            var query = from entry in ctx.Event_MinorOrg
                        where entry.Org_Name == OrgName && entry.NickName == NickName
                        select entry.id;
            return query.Count() > 0;
        }
        public static bool IsOrgManager(string OrgName, string NickName)
        {
            return IsMonorOrg(OrgName, NickName) || IsOrg(OrgName, NickName);
        }
        public static bool AllowAccess(RoleControlLevel PermissionLevel)
        {
            switch (PermissionLevel)
            {
                case RoleControlLevel.AdminOnly:
                    return HttpContext.Current.User.IsInRole("Admin");
                case RoleControlLevel.NeedOrganization:
                    return HttpContext.Current.User.IsInRole("Admin") || HttpContext.Current.User.IsInRole("Organization")||HttpContext.Current.User.IsInRole("MinorOrg");
                case RoleControlLevel.AllAcceptable:
                    return true;
                default:
                    return HttpContext.Current.User.Identity.Name != "";
            }

        }
        public static Event_ViewControl.ViewLevel Viewlevel()
        {
            //创建活动时使用，默认为权限拥有者可以使用的最高等级
            if (HttpContext.Current.User.IsInRole("Admin"))
            {
                return Event_ViewControl.ViewLevel.PublicViewable;
            }
            else if (HttpContext.Current.User.IsInRole("Organization")||HttpContext.Current.User.IsInRole("MinorOrg"))
            {
                return Event_ViewControl.ViewLevel.PublicViewable;
            }
            else
            {
                return Event_ViewControl.ViewLevel.Internal;
            }
        }
       
    }
    public class Event_MinorOrg
    {
        public string NickName;
        public string OrgName;
    }
    public class Event_ViewControl
    {
        public Event_ViewControl()
        {
        }
        public enum ViewLevel : int
        {
            Locked = -3,
            Internal = -1,
            Closed = -4,
            InternalClosed=-5,
            PublicViewable = 1,
            HotEvent = 2,
            FixedTop = 999

        };
    }
}