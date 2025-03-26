import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Logo from "../assets/spend.png";
import {
  DashboardOutlined,
  MoneyCollectOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DollarOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Typography, Avatar, Divider } from "antd";
import { showSuccessToast } from "../utils/toastify.util";
import { useUser } from "../context API/user.context";
import { useMediaQuery } from "react-responsive";
// import "./App.css"

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

const UserLayout = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(isMobile);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const { user, logout } = useUser();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogoutClick = () => {
    logout();
    showSuccessToast("Logout Successful!");
    navigate("/login");
  };

  const menuItems = [
    {
      key: "/users/dashboard",
      icon: <DashboardOutlined style={{ fontSize: "18px" }} />,
      label: "Dashboard",
      onClick: () => navigate("/users/dashboard"),
    },
    {
      key: "/users/budget",
      icon: <MoneyCollectOutlined style={{ fontSize: "18px" }} />,
      label: "Budget",
      onClick: () => navigate("/users/budget"),
    },
    {
      key: "/users/expense",
      icon: <DollarOutlined style={{ fontSize: "18px" }} />,
      label: "Expense",
      onClick: () => navigate("/users/expense"),
    },
    {
      key: "/users/profile",
      icon: <UserOutlined style={{ fontSize: "18px" }} />,
      label: "My Profile",
      onClick: () => navigate("/users/profile"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined style={{ fontSize: "18px" }} />,
      label: "Logout",
      onClick: handleLogoutClick,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={isMobile ? 60 : 80}
        width={230}
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1,
          backgroundColor: "white",
          boxShadow: "2px 0 8px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            padding: "24px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: "8px",
          }}
        >
          <img
            src={Logo}
            alt="SpendWise Logo"
            style={{ width: collapsed ? "40px" : "50px", height: "auto" }}
          />
          {!collapsed && (
            <Text
              strong
              style={{
                color: "#6875F5",
                fontSize: "1.2rem",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              SpendWise
            </Text>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
            padding: isMobile ? "0 16px" : "0",
          }}
        >
          <Avatar
            size={collapsed ? "medium" : "large"}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#1890ff" }}
          />
          {!collapsed && (
            <Text
              strong
              style={{
                fontSize: "16px",
                textAlign: "center",
                color: "#1F2A44",
              }}
            >
              {user?.username || "Username"}
            </Text>
          )}
        </div>

        <Divider
          style={{ margin: "0 16px 16px 16px", borderColor: "#e8e8e8" }}
        />

        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{
            borderRight: 0,
            padding: isMobile ? "0 8px" : "0 16px",
            fontSize: "14px",
          }}
          className="custom-menu"
        />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? (isMobile ? 60 : 80) : 230,
          transition: "margin-left 0.2s",
          minHeight: "100vh",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: "#E0E7FF",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            height: "64px",
            position: "fixed",
            top: 0,
            left: collapsed ? (isMobile ? 60 : 80) : 230,
            right: 0,
            zIndex: 1,
            transition: "left 0.2s",
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
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          />
          <Title level={4} style={{ margin: 0, color: "#1F2A44" }}>
            Dashboard
          </Title>
        </Header>
        <Content
          className="mt-20 mx-4 p-6 bg-white rounded-lg overflow-y-auto"
          style={{
            // margin: "80px 16px 16px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: "calc(100vh - 96px)",
            maxHeight: "calc(100vh - 96px)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
