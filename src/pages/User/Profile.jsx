import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Avatar,
  Typography,
  Modal,
  Form,
  Input,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  CameraOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useUser } from "../../context API/user.context";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../utils/toastify.util";
import bannerImage from "../../assets/Bg.jpg";
import axios from "axios";

const { Title, Text } = Typography;

const Profile = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [editForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:4000/users/${user.id}`
          );
          setUser(response.data);
          // Only set form values if the modal is open
          if (editModalVisible) {
            editForm.setFieldsValue({
              username: response.data.username,
              email: response.data.email,
              contact: response.data.contact || "",
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          showErrorToast("Failed to fetch user data");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserData();
  }, [user?.id, setUser, editModalVisible, editForm]);

  const handleEditProfile = async (values) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:4000/users/${user.id}`,
        {
          ...user,
          username: values.username,
          email: values.email,
          contact: values.contact,
        }
      );
      setUser(response.data);
      setEditModalVisible(false);
      showSuccessToast("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      showErrorToast("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (values) => {
    try {
      setLoading(true);
      if (values.newPassword !== values.confirmPassword) {
        showErrorToast("New password and confirm password do not match!");
        return;
      }

      // Update the password in JSON Server
      const response = await axios.put(
        `http://localhost:4000/users/${user.id}`,
        {
          ...user,
          password: values.newPassword,
        }
      );

      setUser(response.data);
      setPasswordModalVisible(false);
      showSuccessToast("Password changed successfully! Please log in again.");

      // Clear user from context and localStorage (logout)
      setUser(null);
      localStorage.removeItem("user");

      // Redirect to login page
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error changing password:", error);
      showErrorToast("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const showEditModal = () => {
    setEditModalVisible(true);
    // Set form values after the modal is opened
    setTimeout(() => {
      editForm.setFieldsValue({
        username: user?.username,
        email: user?.email,
        contact: user?.contact || "",
      });
    }, 0); // Defer to ensure the form is rendered
  };

  const showPasswordModal = () => {
    setPasswordModalVisible(true);
    // Reset form fields after the modal is opened
    setTimeout(() => {
      passwordForm.resetFields();
    }, 0); // Defer to ensure the form is rendered
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    editForm.resetFields();
  };

  const handlePasswordModalCancel = () => {
    setPasswordModalVisible(false);
    passwordForm.resetFields();
  };

  return (
    <div style={{ padding: 24, background: "#f0f2f5" }}>
      {/* Cover Image Section */}
      <div
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: 150,
          borderRadius: "8px 8px 0 0",
          position: "relative",
          marginBottom: 80,
        }}
      >
        <Button
          type="primary"
          icon={<CameraOutlined />}
          style={{
            position: "absolute",
            right: 16,
            top: 16,
            backgroundColor: "#6875F5",
            width: "auto",
            height: 50,
          }}
        >
          Change Cover
        </Button>
      </div>

      {/* Profile Content */}
      <Row gutter={[24, 24]} style={{ marginTop: -120 }}>
        {/* Left Column: Profile Photo */}
        <Col xs={24} sm={8} md={6}>
          <Card
            style={{
              borderRadius: 8,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              marginLeft: "12px",
            }}
          >
            <Avatar
              size={100}
              src={user?.profileImage}
              icon={<UserOutlined />}
              style={{
                border: "2px solid #1890ff",
                marginBottom: 16,
              }}
            />
          </Card>
        </Col>

        {/* Right Column: User Info */}
        <Col xs={24} sm={16} md={18}>
          <Card
            style={{
              borderRadius: 8,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginRight: "24px",
            }}
          >
            <Title level={4} style={{ marginBottom: 16 }}>
              {user?.username || "Username"}
            </Title>

            {/* Email Section */}
            <div style={{ marginBottom: 16 }}>
              <Text
                type="secondary"
                strong
                style={{ display: "block", marginBottom: 4 }}
              >
                Email:
              </Text>
              <Text style={{ display: "block", fontSize: "16px" }}>
                {user?.email || "No email provided"}
              </Text>
            </div>

            {/* Contact Section */}
            {user?.contact && (
              <div style={{ marginBottom: 24 }}>
                <Text
                  type="secondary"
                  strong
                  style={{ display: "block", marginBottom: 4 }}
                >
                  Contact:
                </Text>
                <Text style={{ display: "block", fontSize: "16px" }}>
                  {user?.contact}
                </Text>
              </div>
            )}

            {/* Buttons */}
            <div style={{ display: "flex", gap: 16 }}>
              <Button
                type="primary"
                icon={<EditOutlined />}
                style={{
                  backgroundColor: "#6875f5",
                  height: 50,
                }}
                onClick={showEditModal}
                loading={loading}
              >
                Edit Profile
              </Button>
              <Button
                type="primary"
                icon={<LockOutlined />}
                style={{
                  backgroundColor: "#6dbaa1",
                  height: 50,
                }}
                onClick={showPasswordModal}
              >
                Change Password
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Edit Profile Modal */}
      <Modal
        title="Edit Profile"
        open={editModalVisible}
        onOk={() => editForm.submit()}
        onCancel={handleEditModalCancel}
        confirmLoading={loading}
        okText="Update"
        cancelText="Cancel"
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditProfile}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="contact" label="Contact">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        title="Change Password"
        open={passwordModalVisible}
        onOk={() => passwordForm.submit()}
        onCancel={handlePasswordModalCancel}
        confirmLoading={loading}
        okText="Update Password"
        cancelText="Cancel"
      >
        <Form form={passwordForm} layout="vertical" onFinish={handleChangePassword}>
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              { required: true, message: "Please input your current password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value === user?.password) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Current password is incorrect!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please input your new password!" },
              { min: 6, message: "Password must be at least 6 characters long!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;