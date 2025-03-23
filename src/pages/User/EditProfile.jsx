import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useUser } from "../../context API/user.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { Title } = Typography;

const EditProfile = () => {
  const { user, setUser } = useUser();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.username,
        email: user.email,
        contact: user.contact,
      });
    }
  }, [user, form]);

  const onFinish = async (values) => {
    try {
      // Update the user data on the server
      const response = await axios.patch(
        `http://localhost:4000/users/${user.id}`,
        values
      );

      // Update the user data in the context and localStorage
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));

      // Show success message
      message.success("Profile updated successfully!");

      // Redirect back to the profile page
      navigate("/users/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <Card
      title="Edit Profile"
      style={{
        width: "100%",
        maxWidth: 800,
        margin: "0 auto",
        border: "1px solid #f0f0f0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        {/* Username Field */}
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        {/* Email Field */}
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        {/* Contact Field */}
        <Form.Item
          name="contact"
          label="Contact"
          rules={[
            { required: true, message: "Please enter your contact number!" },
          ]}
        >
          <Input placeholder="Enter your contact number" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditProfile;
