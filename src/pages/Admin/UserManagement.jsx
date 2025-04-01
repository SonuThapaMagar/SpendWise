import { useState, useEffect, useMemo } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Typography,
  Spin,
  Modal,
  Form,
  Input,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAdmin } from "../../context API/admin.context";
import { showErrorToast, showSuccessToast } from "../../utils/toastify.util";

const { Text } = Typography;

const UserManagement = () => {
  const { users, loading, deleteUser, updateUser, fetchAdminData } = useAdmin();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!users.length) {
      fetchAdminData();
    }
  }, [fetchAdminData, users.length]);


  const handleEdit = async () => {
    try {
      const values = await form.validateFields();
      await updateUser(selectedUser.id, values);
      showSuccessToast("User updated successfully");
      setIsEditModalVisible(false);
    } catch (error) {
      showErrorToast("Failed to update user");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUser.id);
      showSuccessToast("User deleted successfully");
      setIsDeleteModalVisible(false);
    } catch (error) {
      showErrorToast("Failed to delete user");
    }
  };

  const showEditModal = (user) => {
    setSelectedUser(user);
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      contact: user.contact || "",
    });
    setIsEditModalVisible(true);
  };

  const columns = [
    {
      title: "#",
      render: (_, __, index) => <Text strong>{index + 1}</Text>,
    },
    {
      title: "Username",
      dataIndex: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <Text className="text-gray-600">{text}</Text>,
    },
    {
      title: "Contact",
      dataIndex: "contact",
      render: (text) => text || "N/A",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            className="text-blue-600 hover:text-blue-800"
            onClick={() => showEditModal(record)}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            className="text-red-600 hover:text-red-800"
            onClick={() => {
              setSelectedUser(record);
              setIsDeleteModalVisible(true);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-[#F0F5FF]">
      <Card
        title={<span className="text-md sm:text-2xl font-semibold">User Management</span>}
        className="shadow-md rounded-lg"
      >
        <Spin spinning={loading}>
          <Table
            columns={columns}
            dataSource={users}
            scroll={{ x: "max-content" }}
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "50"],
              showTotal: (total) => `Total ${total} users`,
            }}
            rowKey="id"
            className="w-full"
          />
        </Spin>
      </Card>

      {/* Edit User Modal */}
      <Modal
        title="Edit User"
        open={isEditModalVisible}
        onOk={handleEdit}
        onCancel={() => setIsEditModalVisible(false)}
        okText="Save"
        cancelText="Cancel"
        confirmLoading={loading}
        okButtonProps={{ className: "bg-blue-600 hover:bg-blue-700" }}
      >
        <Form form={form} layout="vertical" name="edit_user_form">
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter the username" }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter the email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item name="contact" label="Contact">
            <Input placeholder="Enter contact (optional)" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Deletion"
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        confirmLoading={loading}
        okText="Yes"
        cancelText="No"
        okButtonProps={{ danger: true, className: "bg-red-600 hover:bg-red-700" }}
      >
        <p>
          Are you sure you want to delete{" "}
          <Text strong>{selectedUser?.username}</Text>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};

export default UserManagement;