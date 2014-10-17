<%@ Page Language="C#" AutoEventWireup="true" CodeFile="User_Initialize.aspx.cs" Inherits="User_Initialize" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
        真实姓名<br />
        <asp:TextBox ID="TextBox2" runat="server"></asp:TextBox>
        手机号码<br />
        <asp:Button ID="Button1" runat="server" onclick="Button1_Click" Text="初始化" />
&nbsp;已初始化：<asp:Label ID="Label1" runat="server" Text="Label"></asp:Label>
        已登录：<asp:Label ID="Label2" runat="server" Text="Label"></asp:Label>
&nbsp;更新状态：<asp:Label ID="Label3" runat="server" Text="Label"></asp:Label>
    
    </div>
    </form>
</body>
</html>
