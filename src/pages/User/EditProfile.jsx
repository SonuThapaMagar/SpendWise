import React, { useEffect ,useState} from "react";
import { Form, Input, Button, Card, Typography, message, Spin } from "antd";
import { useUser } from "../../context API/user.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

const EditProfile = () => {
  const { user, setUser } = useUser();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        contact: user.contact || "", // Handle potential undefined
      });
    } else {
      // If no user, redirect to profile
      navigate("/users/profile");
    }
  }, [user, form, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Use PUT instead of PATCH for full updates
      const response = await axios.put(
        `http://localhost:4000/users/${user.id}`,
        { ...user, ...values } // Merge existing user data with updates
      );

      // Update context without causing full reload
      setUser(prev => ({
        ...prev,
        ...response.data
      }));

      message.success("Profile updated successfully!");
      navigate("/users/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title={<Title level={4}>Edit Profile</Title>}
      style={{
        maxWidth: 800,
        margin: "16px auto",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: 600, margin: "0 auto" }}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Invalid email format" }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="contact"
            label="Contact"
            rules={[{ required: true, message: "Please enter contact" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Changes
            </Button>
            <Button 
              style={{ marginLeft: 8 }} 
              onClick={() => navigate("/users/profile")}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};

export default EditProfile;