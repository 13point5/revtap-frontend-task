import React from "react";
import { Layout, Typography } from "antd";

import { CustomersView, ChartsContainer } from "./components";

import rawData from "./fixtures/data2.json";

function App() {
  return (
    <Layout style={{ padding: "2rem" }}>
      <Typography.Title level={1} style={{ textAlign: "center" }}>
        RevTap Task
      </Typography.Title>

      <ChartsContainer />

      <CustomersView data={rawData.customers} />
    </Layout>
  );
}

export default App;
