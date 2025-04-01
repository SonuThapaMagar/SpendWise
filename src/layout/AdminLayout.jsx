import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Logo from "../assets/spend.png";
import {
  DashboardOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Typography, Avatar, Divider } from "antd";
import { showSuccessToast } from "../utils/toastify.util";
import { useAdmin } from "../context API/admin.context"; // Changed from useUser
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
  const { users, isAdminLoggedIn, logoutAdmin } = useAdmin(); // Updated to useAdmin

  // Find the current admin user from the users list (assuming username is stored)
  const adminUser = users.find((u) => u.role === "admin") || {
    username: "Admin",
  };

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isAdminLoggedIn) {
      console.log("Admin not logged in, redirecting to /admin/login");
      navigate("/admin/login");
    }
  }, [isAdminLoggedIn, navigate]);

  const handleLogoutClick = () => {
    logoutAdmin();
    showSuccessToast("Logout Successful!");
    navigate("/admin/login");
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
      key: "/admin/reports",
      icon: <BarChartOutlined />,
      label: "Reports & Analytics",
      onClick: () => navigate("/admin/reports"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: (e) => {
        e.domEvent.preventDefault();
        handleLogoutClick();
      },
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={isMobile ? 0 : 60}
        width={isMobile ? 200 : 250}
        theme="light"
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
          boxShadow: "2px 0 8px 0 rgba(29, 35, 41, 0.05)",
          overflow: "hidden",
        }}
      >
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-start"
          } gap-2 p-4 sm:p-6`}
        >
          <img
            src={Logo}
            alt="SpendWise Logo"
            className={collapsed ? "w-8 sm:w-10" : "w-10 sm:w-12"}
            style={{
              marginTop: "18px",
              marginLeft: collapsed ? "0" : "20px",
            }}
          />
          {!collapsed && (
            <Text
              strong
              className="text-[#6875F5] text-lg sm:text-xl font-poppins"
            >
              SpendWise Admin
            </Text>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-2 sm:px-4">
          <Avatar
            size={collapsed ? "small" : isMobile ? "medium" : "large"}
            icon={<UserOutlined />}
            className="bg-[#1890ff]"
          />
          {!collapsed && (
            <>
              <Text
                strong
                className="text-[#1F2A44] text-sm sm:text-base text-center"
              >
                {adminUser.username}
              </Text>
              
            </>
          )}
        </div>

        <Divider className="mx-2 sm:mx-4 my-0 border-[#e8e8e8]" />

        <div
          style={{
            height: "calc(100vh - 200px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            className="custom-menu border-0 px-1 sm:px-2 md:px-4"
            style={{
              color: "#6B7280",
              borderRight: 0,
            }}
          />
        </div>
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? (isMobile ? 0 : 60) : isMobile ? 200 : 250,
          transition: "margin-left 0.2s",
          minHeight: "100vh",
        }}
      >
        <Header
          style={{
            padding: "0 16px",
            background: "#F9FAFB",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            height: "64px",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <Button
            type="button"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCollapsed(!collapsed);
            }}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          />
          <Title
            level={4}
            style={{
              margin: "0 8px",
              color: "#1F2A44",
              fontSize: isMobile ? "16px" : "20px",
            }}
          >
            Admin Dashboard
          </Title>
        </Header>
        <Content
          style={{
            margin: isMobile ? "16px 8px" : "24px 16px",
            padding: isMobile ? 16 : 24,
            minHeight: "calc(100vh - 96px)",
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
