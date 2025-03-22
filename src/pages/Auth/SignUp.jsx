import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import Logo from "/src/assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context API/user.context";
import { showSuccessToast, showErrorToast } from "../../utils/toastify.util";

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useUser();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const onFinish = async (values) => {
    try {
      // Calling the signup function from context
      await signup(values);
      showSuccessToast("Signup successful! Please login.");

      navigate("/login");
    } catch (error) {
      showErrorToast("An error occurred !");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-loginBackground p-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        <img src={Logo} alt="Logo" className="mx-auto w-24 h-24 " />
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
          Sign Up
        </h2>
        <Form
          name="login"
          initialValues={{
            remember: true,
          }}
          style={{
            maxWidth: 360,
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
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
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
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                color: "white",
                padding: "1rem 1.5rem",
                borderRadius: "0.5rem",
                fontSize: "large",
                fontFamily: "Nunito, sans-serif",
              }}
            >
              Sign Up
            </Button>
            <p className="text-center mt-4">
              Already have an account?
              <span
                onClick={handleLoginClick}
                className="text-blue-500 ml-1 cursor-pointer"
              >
                Login now!
              </span>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
