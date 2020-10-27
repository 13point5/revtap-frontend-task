import React, { useCallback, useMemo, useState } from "react";
import moment from "moment";

import { Row, Col, Typography, DatePicker, Space } from "antd";

import BarChart from "../BarChart";
import LineChart from "../LineChart";
import ExportData from "../ExportData";

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

  const handleDateChange = useCallback((_, dateString) => {
    setYearMonth(dateString);
  }, []);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Typography.Title level={4}>Actions</Typography.Title>

        <Row gutter={16} align="middle">
          <Col>
            <Space size="middle">
              <DatePicker
                picker="month"
                defaultValue={moment(yearMonth, dateFormat)}
                format={dateFormat}
                onChange={handleDateChange}
              />

              <ExportData orders={orders} yearMonth={yearMonth} />
            </Space>
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
