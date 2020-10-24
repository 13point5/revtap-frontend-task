import React, { useMemo, useState } from "react";
import moment from "moment";

import { Row, Col, Typography, DatePicker, Button } from "antd";
import { ExportOutlined } from "@ant-design/icons";

import BarChart from "../BarChart";
import LineChart from "../LineChart";

import rawData from "../../fixtures/data2.json";
import formatOrders from "../../utils/formatOrders";

const dateFormat = "YYYY-MM";
const cardStyes = {
  style: { height: "100%" },
  bodyStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

function ChartsContainer() {
  const [yearMonth, setYearMonth] = useState(moment().format(dateFormat));

  const orders = useMemo(() => formatOrders(rawData.orders, yearMonth), [
    yearMonth,
  ]);

  const handleDateChange = (_, dateString) => {
    setYearMonth(dateString);
  };

  console.log("orders :>> ", orders);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title level={4}>Actions</Typography.Title>

        <Row gutter={16} align="middle">
          <Col>
            <DatePicker
              picker="month"
              defaultValue={moment(yearMonth, dateFormat)}
              format={dateFormat}
              onChange={handleDateChange}
            />
          </Col>
          <Col>
            <Button type="primary" icon={<ExportOutlined />}>
              Export Orders Data
            </Button>
          </Col>
        </Row>
      </Col>

      <Col span={12}>
        <BarChart data={orders} {...cardStyes} />
      </Col>
      <Col span={12}>
        <LineChart data={orders} {...cardStyes} />
      </Col>
    </Row>
  );
}

export default ChartsContainer;
