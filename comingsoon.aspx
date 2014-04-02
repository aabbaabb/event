<%@ Page Language="C#" AutoEventWireup="true" CodeFile="comingsoon.aspx.cs" Inherits="comingsoon" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "
http://www.w3.org/TR/html4/loose.dtd">
<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/comingsoonstyle.css">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">

    <title></title>
</head>
<body background = "img/cs-bg.png">
    <form id="form1" runat="server">
    <div id="container">
		<div >
			<h4>想率先成为风尚引领者？</h4>
		</div>
		<div>
			<h5>留下邮箱，我们将在第一时间与你分享。</h5>
		</div>
        <asp:TextBox ID="form_text" runat="server" CssClass="form_text"></asp:TextBox>
        <asp:Button ID="form_try"
            runat="server" CssClass="form_try" onclick="form_try_Click1" />
	    
	    <br />
        <br />
        <asp:Label ID="Label1" runat="server" Font-Names="Arial" Font-Size="12pt" 
            ForeColor="#FF3300"></asp:Label>
	</div>
    </form>
</body>
</html>
