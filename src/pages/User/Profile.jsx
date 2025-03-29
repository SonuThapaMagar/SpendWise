import React, { useCallback } from "react";
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
  Flex,
} from "antd";
import { UserOutlined, EditOutlined, LockOutlined } from "@ant-design/icons";
import { useUser } from "../../context API/user.context";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../utils/toastify.util";
import bannerImage from "../../assets/Bg.jpg";
import axios from "axios";

const { Title, Text } = Typography;

const Profile = React.memo(() => {
  const { user, setUser, fetchUserData } = useUser();
  const navigate = useNavigate();
  const [editForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [state, setState] = React.useState({ modalType: null, loading: false });

  React.useEffect(() => {
    if (user?.id && !user.username) fetchUserData(user.id);
  }, [user?.id, fetchUserData]);

  const handleModal = useCallback((type) => {
    setState((prev) => ({ ...prev, modalType: type }));
    if (type === "edit") {
      editForm.setFieldsValue({
        username: user?.username,
        email: user?.email,
        contact: user?.contact || "",
      });
    } else if (type === "password") {
      passwordForm.resetFields();
    } else {
      editForm.resetFields();
      passwordForm.resetFields();
    }
  }, [user, editForm, passwordForm]);

  const handleEditProfile = useCallback(
    async (values) => {
      console.log("handleEditProfile called with values:", values); // Debug log
      setState((prev) => ({ ...prev, loading: true }));
      try {
        const updatedFields = {
          username: values.username,
          email: values.email,
          contact: values.contact,
        };
        await axios.put(`http://localhost:4000/users/${user.id}`, {
          ...user,
          ...updatedFields,
        });
        setUser(updatedFields);
        handleModal(null);
        showSuccessToast("Profile updated successfully!");
      } catch (error) {
        showErrorToast("Failed to update profile");
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [user, setUser, handleModal]
  );

  const handleChangePassword = useCallback(
    async (values) => {
      console.log("handleChangePassword called with values:", values); // Debug log
      setState((prev) => ({ ...prev, loading: true }));
      try {
        if (values.newPassword !== values.confirmPassword) {
          throw new Error("New password and confirm password do not match!");
        }
        const updatedFields = { password: values.newPassword };
        await axios.put(`http://localhost:4000/users/${user.id}`, {
          ...user,
          ...updatedFields,
        });
        handleModal(null);
        showSuccessToast("Password changed successfully! Please log in again.");
        setUser(null);
        localStorage.removeItem("user");
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        showErrorToast(error.message || "Failed to change password");
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    },
    [user, setUser, navigate, handleModal]
  );

  const handleEditSubmit = useCallback(() => {
    console.log("handleEditSubmit called"); // Debug log
    editForm.submit();
  }, [editForm]);

  const handlePasswordSubmit = useCallback(() => {
    console.log("handlePasswordSubmit called"); // Debug log
    passwordForm.submit();
  }, [passwordForm]);

  return (
    <div style={{ padding: 24, background: "#f0f2f5" }}>
      <div
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 150,
          borderRadius: "8px 8px 0 0",
          marginBottom: 80,
        }}
      />
      <Row gutter={[24, 24]} style={{ marginTop: -120 }}>
        <Col xs={24} sm={8} md={6}>
          <Card
            style={{
              borderRadius: 8,
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
              marginLeft: 12,
            }}
          >
            <Avatar
              size={100}
              src={user?.profileImage}
              icon={<UserOutlined />}
              style={{ border: "2px solid #1890ff", marginBottom: 16 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={16} md={18}>
          <Card
            style={{
              borderRadius: 8,
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              marginRight: 24,
            }}
          >
            <Title level={4} style={{ marginBottom: 16 }}>
              {user?.username || "Username"}
            </Title>
            <Text type="secondary" strong style={{ display: "block", marginBottom: 4 }}>
              Email:
            </Text>
            <Text style={{ display: "block", fontSize: 16, marginBottom: 16 }}>
              {user?.email || "No email provided"}
            </Text>
            {user?.contact && (
              <>
                <Text type="secondary" strong style={{ display: "block", marginBottom: 4 }}>
                  Contact:
                </Text>
                <Text style={{ display: "block", fontSize: 16, marginBottom: 24 }}>
                  {user?.contact}
                </Text>
              </>
            )}
            <Flex gap={16}>
              <Button
                type="primary"
                icon={<EditOutlined />}
                style={{ backgroundColor: "#6875f5", height: 50 }}
                onClick={() => handleModal("edit")}
                loading={state.loading}
              >
                Edit Profile
              </Button>
              <Button
                type="primary"
                icon={<LockOutlined />}
                style={{ backgroundColor: "#6dbaa1", height: 50 }}
                onClick={() => handleModal("password")}
              >
                Change Password
              </Button>
            </Flex>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Edit Profile"
        open={state.modalType === "edit"}
        onOk={handleEditSubmit}
        onCancel={() => handleModal(null)}
        confirmLoading={state.loading}
        okText="Update"
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
              { required: true, type: "email", message: "Please input a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="contact" label="Contact">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Change Password"
        open={state.modalType === "password"}
        onOk={handlePasswordSubmit}
        onCancel={() => handleModal(null)}
        confirmLoading={state.loading}
        okText="Update Password"
      >
        <Form form={passwordForm} layout="vertical" onFinish={handleChangePassword}>
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              { required: true, message: "Please input your current password!" },
              { validator: (_, value) => (value === user?.password ? Promise.resolve() : Promise.reject(new Error("Current password is incorrect!"))) },
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
                  return value === getFieldValue("newPassword")
                    ? Promise.resolve()
                    : Promise.reject(new Error("Passwords do not match!"));
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
});

export default Profile;