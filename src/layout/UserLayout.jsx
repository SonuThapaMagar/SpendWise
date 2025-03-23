import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
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
import { UserContext } from "../context API/user.context";

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const isLogin = localStorage.getItem("is_login");

    if (isLogin !== "1" || !user) {
      // Redirecting to landing page if not logged in
      navigate("/");
    }
  }, [navigate, user]);

  const handleLogoutClick = () => {
    localStorage.setItem("is_login", 0);
    showSuccessToast("Logout Successful!");
    navigate("/login");
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
    <Layout style={{ minHeight: "100vh" }}>
      {/* Fixed Sider */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
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

      {/* Content with padding to account for the fixed Sider */}
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200, // Adjust based on collapsed state
          transition: "margin-left 0.2s",
          minHeight: "100vh",
        }}
      >
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            height:"80px",
            alignItems: "center",
            justifyContent: "space-between",
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

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ textAlign: "right" }}>
              <Text
                strong
                style={{
                  display: "block",
                  fontSize: "16px",
                  lineHeight: "0",
                   marginTop: "2rem"
                }}
              >
                {user?.username || "Username"}
              </Text>
              <Text
                type="secondary"
                style={{ fontSize: "14px", lineHeight: "0",
                }}
              >
                {user?.email || "Email"}
              </Text>
            </div>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{ backgroundColor: "#1890ff" }}
            />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
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
