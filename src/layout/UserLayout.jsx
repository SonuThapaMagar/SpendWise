import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Logo from "../assets/logo-transparent.png";

import {
  DashboardOutlined,
  MoneyCollectOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DollarOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";

const { Header, Sider, Content } = Layout;

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem("is_login");
    const user = localStorage.getItem("user");

    if (isLogin !== "1" || !user) {
      // Redirect to landing page if not logged in
      navigate("/");
    }
  }, [navigate]);

  const handleLogoutClick = () => {
    localStorage.setItem("is_login", 0);
    navigate("/");
  };

  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/users/dashboard"),
    },
    {
      key: "2",
      icon: <MoneyCollectOutlined />,
      label: "Budget",
      onClick: () => navigate("/users/budget"),
    },
    {
      key: "3",
      icon: <DollarOutlined />,
      label: "Expense",
      onClick: () => navigate("/users/expense"),
    },
    {
      key: "4",
      icon: <UserOutlined />,
      label: "My Profile",
      onClick: () => navigate("/users/profile"),
    },
    {
      key: "5",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => handleLogoutClick(),
    },
  ];

  return (
    <Layout  style={{vh:100}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="demo-logo-vertical"
          style={{
            padding: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "50px", height: "auto" }}
          />
          <h2 style={{ color: "white", fontWeight: "bold", fontSize: "1rem" }}>
            SpendWise
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
        />
      </Sider>
      <Layout style={{ flex: 1 }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Render nested routes here */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;