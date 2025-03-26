import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Logo from "../assets/spend.png";
import {
  DashboardOutlined,
  UserOutlined,
  DollarOutlined,
  BarChartOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Typography, Avatar, Divider } from "antd";
import { showSuccessToast } from "../utils/toastify.util";
import { useUser } from "../context API/user.context";
import { useMediaQuery } from "react-responsive";
import "../App.css";

const { Header, Sider, Content } = Layout;
const { Text, Title } = Typography;

const AdminLayout = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(isMobile);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const { user, logout } = useUser();

  useEffect(() => {
    if (!user || user.role !== "admin") {
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
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin/dashboard"),
    },
    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: "User Management",
      onClick: () => navigate("/admin/users"),
    },
    {
      key: "/admin/expenses",
      icon: <DollarOutlined />,
      label: "Expense Overview",
      onClick: () => navigate("/admin/expenses"),
    },
    {
      key: "/admin/budgets",
      icon: <DollarOutlined />,
      label: "Budget Overview",
      onClick: () => navigate("/admin/budgets"),
    },
    {
      key: "/admin/reports",
      icon: <BarChartOutlined />,
      label: "Reports & Analytics",
      onClick: () => navigate("/admin/reports"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: handleLogoutClick,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={isMobile ? 0 : 80}
        width={250}
        theme="light"
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          boxShadow: "2px 0 8px 0 rgba(29, 35, 41, 0.05)",
          overflow: "hidden",
        }}
      >
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-start"
          } gap-2 p-6`}
          style={{
            padding: collapsed ? "24px 0" : "24px 0 24px 24px",
          }}
        >
          <img
            src={Logo}
            alt="SpendWise Logo"
            className={collapsed ? "w-10" : "w-12"}
            style={{
              marginTop: "18px",
              marginLeft: collapsed ? "0" : "20px",
            }}
          />
          {!collapsed && (
            <Text strong className="text-[#6875F5] text-xl font-poppins">
              SpendWise Admin
            </Text>
          )}
        </div>

        <div className="flex flex-col items-center gap-3 mb-6 px-4">
          <Avatar
            size={collapsed ? "medium" : "large"}
            icon={<UserOutlined />}
            className="bg-[#1890ff]"
          />
          {!collapsed && (
            <Text strong className="text-[#1F2A44] text-base text-center">
              {user?.username || "Admin"}
            </Text>
          )}
        </div>

        <Divider className="mx-4 my-0 border-[#e8e8e8]" />

        <div style={{ height: "calc(100vh - 220px)", overflowY: "auto" }}>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            className="custom-menu border-0 px-2 md:px-4"
          />
        </div>
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? (isMobile ? 0 : 80) : 250,
          transition: "margin-left 0.2s",
          minHeight: "100vh",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: "#E0E7FF",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            height: "64px",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          {isMobile && (
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
          )}
          <Title level={4} style={{ margin: 0, color: "#1F2A44" }}>
            Admin Dashboard
          </Title>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "calc(100vh - 112px)",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;