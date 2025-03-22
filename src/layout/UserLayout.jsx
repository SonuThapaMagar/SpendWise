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
  LockOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Dropdown, Avatar } from "antd";
import { showSuccessToast } from "../utils/toastify.util";
import { UserContext } from "../context API/user.context";

const { Header, Sider, Content } = Layout;

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

  // Dropdown menu items
  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Edit Profile
      </Menu.Item>
      <Menu.Item key="password" icon={<LockOutlined />}>
        Change Password
      </Menu.Item>
      <Menu.Divider />
    </Menu>
  );

  return (
    <Layout style={{ maxHeight: "100vh" }}> 
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
      <Layout style={{ flex: 1 }}> {/* Ensure the inner layout is flexible */}
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
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
          {/* Profile Section */}
          <Dropdown menu={menu} trigger={["click"]}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Avatar
                // src={user.profilePhoto}
                icon={<UserOutlined />}
                style={{ marginRight: 8 }}
              />
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: "bold" }}>{user?.name}</div>
                {/* <div style={{ fontSize: "12px", color: "gray" }}>
                  {user?.email}
                </div> */}
              </div>
            </div>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            flex: 1, // Allow the content to grow and fill the available space
            overflow: "auto", // Add scroll only if content overflows
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