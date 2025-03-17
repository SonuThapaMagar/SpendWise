import React from "react";
import { Typography } from "antd";
import { Button, ConfigProvider, Flex } from "antd";
import { useResponsive } from "antd-style";
const { Title } = Typography;

const Budget = () => {
  return (
    <>
      <Title level={3}>Budgets</Title>
      <ConfigProvider componentSize={xxl ? "middle" : "small"}>
        <Flex vertical gap="small">
          <Flex gap="small" wrap>
            <Button color="primary" variant="text">
              Add Budget
            </Button>
          </Flex>
        </Flex>
      </ConfigProvider>
    </>
  );
};

export default Budget;
