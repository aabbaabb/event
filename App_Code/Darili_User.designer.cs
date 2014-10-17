﻿#pragma warning disable 1591
//------------------------------------------------------------------------------
// <auto-generated>
//     此代码由工具生成。
//     运行时版本:4.0.30319.34011
//
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.Linq;
using System.Data.Linq.Mapping;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;



[global::System.Data.Linq.Mapping.DatabaseAttribute(Name="Darili")]
public partial class Darili_UserDataContext : System.Data.Linq.DataContext
{
	
	private static System.Data.Linq.Mapping.MappingSource mappingSource = new AttributeMappingSource();
	
  #region 可扩展性方法定义
  partial void OnCreated();
  partial void InsertEvent_Users(Event_Users instance);
  partial void UpdateEvent_Users(Event_Users instance);
  partial void DeleteEvent_Users(Event_Users instance);
  #endregion
	
	public Darili_UserDataContext() : 
			base(global::System.Configuration.ConfigurationManager.ConnectionStrings["416ConnectionString"].ConnectionString, mappingSource)
	{
		OnCreated();
	}
	
	public Darili_UserDataContext(string connection) : 
			base(connection, mappingSource)
	{
		OnCreated();
	}
	
	public Darili_UserDataContext(System.Data.IDbConnection connection) : 
			base(connection, mappingSource)
	{
		OnCreated();
	}
	
	public Darili_UserDataContext(string connection, System.Data.Linq.Mapping.MappingSource mappingSource) : 
			base(connection, mappingSource)
	{
		OnCreated();
	}
	
	public Darili_UserDataContext(System.Data.IDbConnection connection, System.Data.Linq.Mapping.MappingSource mappingSource) : 
			base(connection, mappingSource)
	{
		OnCreated();
	}
	
	public System.Data.Linq.Table<Event_Users> Event_Users
	{
		get
		{
			return this.GetTable<Event_Users>();
		}
	}
}

[global::System.Data.Linq.Mapping.TableAttribute(Name="dbo.Event_Users")]
public partial class Event_Users : INotifyPropertyChanging, INotifyPropertyChanged
{
	
	private static PropertyChangingEventArgs emptyChangingEventArgs = new PropertyChangingEventArgs(String.Empty);
	
	private int _User_Id;
	
	private string _User_NickName;
	
	private string _User_CellPhone;
	
	private string _User_Realname;
	
	private System.Nullable<System.DateTime> _User_LastLoginTime;
	
	private string _User_Stuno;
	
	private string _User_Token;
	
    #region 可扩展性方法定义
    partial void OnLoaded();
    partial void OnValidate(System.Data.Linq.ChangeAction action);
    partial void OnCreated();
    partial void OnUser_IdChanging(int value);
    partial void OnUser_IdChanged();
    partial void OnUser_NickNameChanging(string value);
    partial void OnUser_NickNameChanged();
    partial void OnUser_CellPhoneChanging(string value);
    partial void OnUser_CellPhoneChanged();
    partial void OnUser_RealnameChanging(string value);
    partial void OnUser_RealnameChanged();
    partial void OnUser_LastLoginTimeChanging(System.Nullable<System.DateTime> value);
    partial void OnUser_LastLoginTimeChanged();
    partial void OnUser_StunoChanging(string value);
    partial void OnUser_StunoChanged();
    partial void OnUser_TokenChanging(string value);
    partial void OnUser_TokenChanged();
    #endregion
	
	public Event_Users()
	{
		OnCreated();
	}
	
	[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_User_Id", DbType="Int NOT NULL", IsPrimaryKey=true)]
	public int User_Id
	{
		get
		{
			return this._User_Id;
		}
		set
		{
			if ((this._User_Id != value))
			{
				this.OnUser_IdChanging(value);
				this.SendPropertyChanging();
				this._User_Id = value;
				this.SendPropertyChanged("User_Id");
				this.OnUser_IdChanged();
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_User_NickName", DbType="NVarChar(50) NOT NULL", CanBeNull=false)]
	public string User_NickName
	{
		get
		{
			return this._User_NickName;
		}
		set
		{
			if ((this._User_NickName != value))
			{
				this.OnUser_NickNameChanging(value);
				this.SendPropertyChanging();
				this._User_NickName = value;
				this.SendPropertyChanged("User_NickName");
				this.OnUser_NickNameChanged();
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_User_CellPhone", DbType="NChar(20)")]
	public string User_CellPhone
	{
		get
		{
			return this._User_CellPhone;
		}
		set
		{
			if ((this._User_CellPhone != value))
			{
				this.OnUser_CellPhoneChanging(value);
				this.SendPropertyChanging();
				this._User_CellPhone = value;
				this.SendPropertyChanged("User_CellPhone");
				this.OnUser_CellPhoneChanged();
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_User_Realname", DbType="NChar(10)")]
	public string User_Realname
	{
		get
		{
			return this._User_Realname;
		}
		set
		{
			if ((this._User_Realname != value))
			{
				this.OnUser_RealnameChanging(value);
				this.SendPropertyChanging();
				this._User_Realname = value;
				this.SendPropertyChanged("User_Realname");
				this.OnUser_RealnameChanged();
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_User_LastLoginTime", DbType="DateTime")]
	public System.Nullable<System.DateTime> User_LastLoginTime
	{
		get
		{
			return this._User_LastLoginTime;
		}
		set
		{
			if ((this._User_LastLoginTime != value))
			{
				this.OnUser_LastLoginTimeChanging(value);
				this.SendPropertyChanging();
				this._User_LastLoginTime = value;
				this.SendPropertyChanged("User_LastLoginTime");
				this.OnUser_LastLoginTimeChanged();
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_User_Stuno", DbType="NChar(11)")]
	public string User_Stuno
	{
		get
		{
			return this._User_Stuno;
		}
		set
		{
			if ((this._User_Stuno != value))
			{
				this.OnUser_StunoChanging(value);
				this.SendPropertyChanging();
				this._User_Stuno = value;
				this.SendPropertyChanged("User_Stuno");
				this.OnUser_StunoChanged();
			}
		}
	}
	
	[global::System.Data.Linq.Mapping.ColumnAttribute(Storage="_User_Token", CanBeNull=false)]
	public string User_Token
	{
		get
		{
			return this._User_Token;
		}
		set
		{
			if ((this._User_Token != value))
			{
				this.OnUser_TokenChanging(value);
				this.SendPropertyChanging();
				this._User_Token = value;
				this.SendPropertyChanged("User_Token");
				this.OnUser_TokenChanged();
			}
		}
	}
	
	public event PropertyChangingEventHandler PropertyChanging;
	
	public event PropertyChangedEventHandler PropertyChanged;
	
	protected virtual void SendPropertyChanging()
	{
		if ((this.PropertyChanging != null))
		{
			this.PropertyChanging(this, emptyChangingEventArgs);
		}
	}
	
	protected virtual void SendPropertyChanged(String propertyName)
	{
		if ((this.PropertyChanged != null))
		{
			this.PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
		}
	}
}
#pragma warning restore 1591
