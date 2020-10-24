import { Layout, Row, Col, Typography } from "antd";
import React, { useMemo } from "react";

import BarChart from "./components/BarChart";
import CustomersView from "./components/CustomersView";
import LineChart from "./components/LineChart";

import rawData from "./fixtures/data.json";
import formatOrders from "./utils/formatOrders";

function App() {
  const orders = useMemo(() => formatOrders(rawData.orders), [rawData.orders]);

  return (
    <Layout style={{ padding: "2rem" }}>
      <Typography.Title level={1} style={{ textAlign: "center" }}>
        RevTap Task
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col span={12} key="barchart">
          <BarChart data={orders} />
        </Col>
        <Col span={12} key="linechart">
          <LineChart data={orders} />
        </Col>

        <Col span={24} key="customers table">
          <CustomersView data={rawData.customers} />
        </Col>
      </Row>
    </Layout>
  );
}

export default App;
