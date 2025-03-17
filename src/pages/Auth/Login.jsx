import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, message } from "antd";
import Logo from "/src/assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ login }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  // const handleUsernameChange = (e) => {
  //   setUser({ ...user, username: e.target.value });
  // };

  // const handlePasswordChange = (e) => {
  //   setUser({ ...user, password: e.target.value });
  // };

  const onFinish = async (values) => {
    const { username, password } = values;

    try {
      setLoading(true);

      // Fetch users from JSON server
      const response = await axios.get("http://localhost:4000/users", {
        params: { username, password },
      });

      if (response.data.length > 0) {
        const user = response.data[0];

        // Save user to local storage
        localStorage.setItem("user", JSON.stringify(user));

        // Set user role (admin or user)
        const role =
          username === "admin" && password === "admin" ? "admin" : "user";
        login(role); // Use the login function passed as a prop

        message.success("Login successful!");
        navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      } else {
        message.error("Invalid username or password");
      }
    } catch (error) {
      message.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        <img src={Logo} alt="Logo" className="mx-auto w-24 h-24 rounded-full" />
        <h2 className="text-2xl font-semibold text-center mb-4 text-[#050C9C]">
          Login
        </h2>
        <Form
          name="login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a href="">Forgot password</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 mb-4"
              loading={loading}
            >
              Login
            </Button>

            <p className="text-center mt-4">
              Don't have an account?
              <span
                onClick={handleSignUpClick}
                className="text-blue-500 ml-1 cursor-pointer"
              >
                Sign Up now!
              </span>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
