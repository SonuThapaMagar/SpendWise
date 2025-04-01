import React, { useCallback, useEffect, useState } from "react";
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
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { useUser } from "../../context API/user.context";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../utils/toastify.util";
import bannerImage from "../../assets/Bg.jpg";
import axios from "axios";

const { Title, Text } = Typography;

const Profile = React.memo(() => {
  const { user, fetchUserData } = useUser(); // Assuming fetchUserData exists in context
  const navigate = useNavigate();
  const [needsRefresh, setNeedsRefresh] = useState(false); // To trigger refresh after edit

  // Log user data for debugging
  useEffect(() => {
    console.log("User data:", user);
  }, [user]);

  // Refresh user data if available in context
  useEffect(() => {
    if (sessionStorage.getItem("profileEdited") === "true" && user?.id) {
      fetchUserData(user.id).then(() => {
        sessionStorage.removeItem("profileEdited"); 
      });
    }
  }, [user?.id, fetchUserData]);

  const handleEditClick = () => {
    sessionStorage.setItem("profileEdited", "true"); 
    navigate("/users/editProfile");
  };

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
            />useEffect
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
            <Text
              type="secondary"
              strong
              style={{ display: "block", marginBottom: 4 }}
            >
              Email:
            </Text>
            <Text style={{ display: "block", fontSize: 16, marginBottom: 16 }}>
              {user?.email || "No email provided"}
            </Text>
            <Text
              type="secondary"
              strong
              style={{ display: "block", marginBottom: 4 }}
            >
              Contact:
            </Text>
            <Text style={{ display: "block", fontSize: 16, marginBottom: 24 }}>
              {user?.contact || "No contact provided"}
            </Text>
            <Flex gap={16}>
              <Button
                type="primary"
                icon={<EditOutlined />}
                style={{ backgroundColor: "#6875f5", height: 50 }}
                onClick={handleEditClick}
              >
                Edit Profile
              </Button>
            </Flex>
          </Card>
        </Col>
      </Row>
    </div>
  );
});

export default Profile;
