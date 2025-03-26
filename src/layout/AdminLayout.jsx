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
      navigate("/"); // Redirect non-admins to the homepage
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
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={isMobile ? 60 : 80}
        width={250}
        theme="light"
        className="h-screen fixed left-0 top-0 bottom-0 z-10 bg-white shadow-md"
      >
        <div
          className={`flex items-center ${
            collapsed ? "justify-center" : "justify-start"
          } gap-2 p-6`}
        >
          <img
            src={Logo}
            alt="SpendWise Logo"
            className={collapsed ? "w-10" : "w-12"}
            style={{
              marginTop:"18px",
              marginLeft:"20px"
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

        {/* Make the menu scrollable if it overflows */}
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
        className={`transition-all duration-200 ${
          collapsed ? (isMobile ? "ml-[60px]" : "ml-[80px]") : "ml-[230px]"
        } min-h-screen`}
      >
        <Header
          className="p-0 bg-[#E0E7FF] shadow-md flex items-center h-16 fixed top-0 z-10 transition-all duration-200"
          style={{
            background: colorBgContainer,
            left: collapsed ? (isMobile ? 60 : 80) : 250,
            right: 0,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg w-16 h-16"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          />
          <Title level={4} className="m-0 text-[#1F2A44]">
            Admin Dashboard
          </Title>
        </Header>
        <Content
          className="mt-20 mx-4 p-6 bg-white rounded-lg overflow-y-auto"
          style={{
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

export default AdminLayout;