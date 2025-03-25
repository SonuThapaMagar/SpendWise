import React, { useState, useEffect, useContext } from "react";
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
import { Button, Layout, Menu, theme, Typography, Avatar } from "antd";
import { showSuccessToast } from "../utils/toastify.util";
import { useUser } from "../context API/user.context";
import { useMediaQuery } from "react-responsive";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

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
    // If user is not logged in, redirect to landing page
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
        collapsedWidth={isMobile ? 0 : 80}
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
            padding: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: "8px",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "50px", height: "auto" }}
          />
          {!collapsed && (
            <Text strong style={{ color: "#6875F5", fontSize: "1rem" }}>
              SpendWise
            </Text>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
            padding: isMobile ? "0 16px" : "0",
          }}
        >
          <Avatar
            size="large"
            icon={<UserOutlined />}
            style={{ backgroundColor: "#1890ff" }}
          />
          {!collapsed && (
            <Text strong style={{ fontSize: "16px", textAlign: "center" }}>
              {user?.username || "Username"}
            </Text>
          )}
        </div>

        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{
            borderRight: 0,
            padding: isMobile ? "0 4px" : "0 16px",
          }}
          className="custom-menu"
          // className={`custom-menu ${isMobile ? "mobile-menu" : ""}`}
        />
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 230,
          transition: "margin-left 0.2s",
          minHeight: "100vh",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            height: "64px",
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
            margin: "16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: "calc(100vh - 96px)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
