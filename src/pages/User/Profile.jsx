import React from "react";
import { Card, Row, Col, Button, Avatar, Typography, Divider } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { useUser } from "../../context API/user.context";

const { Title, Text } = Typography;

const Profile = () => {
  // Getting the user from user.context
  const { user } = useUser();

  return (
    <Card
      title="My Profile"
      style={{
        width: "100%",
        maxWidth: 800,
        margin: "0 auto",
        border: "1px solid #f0f0f0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row gutter={[24, 24]}>
        {/* Left Column: Profile Image */}
        <Col xs={24} sm={8} md={6}>
          <Avatar
            size={150}
            // src={user?.profileImage} // Uncomment if profile image is available
            icon={<UserOutlined />}
            style={{
              display: "block",
              margin: "0 auto",
              border: "2px solid #1890ff",
              padding: "8px",
              backgroundColor: "#f0f0f0",
            }}
          />
        </Col>

        {/* Right Column: User Info */}
        <Col xs={24} sm={16} md={18}>
          <Title level={4} style={{ marginBottom: 16 }}>
            {user?.username || "Username"}
          </Title>

          <Divider style={{ margin: "16px 0" }} />

          {/* Email Section */}
          <div style={{ marginBottom: 16 }}>
            <Text type="secondary" strong style={{ display: "block", marginBottom: 4 }}>
              Email:
            </Text>
            <Text style={{ display: "block", fontSize: "16px" }}>
              {user?.email || "No email provided"}
            </Text>
          </div>

          {/* Contact Section */}
          <div style={{ marginBottom: 24 }}>
            <Text type="secondary" strong style={{ display: "block", marginBottom: 4 }}>
              Contact:
            </Text>
            <Text style={{ display: "block", fontSize: "16px" }}>
              {user?.contact || "No contact provided"}
            </Text>
          </div>

          {/* Edit Button */}
          <Button
            type="primary"
            icon={<EditOutlined />}
            style={{ width: "100%", maxWidth: 200 }}
          >
            Edit Profile
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default Profile;