import React, { useCallback, useContext, useMemo, useState } from "react";
import moment from "moment";

import { Row, Col, Typography, DatePicker, Space } from "antd";

import BarChart from "../BarChart";
import LineChart from "../LineChart";
import ExportData from "../ExportData";

// import rawData from "../../fixtures/data2.json";
import formatOrders from "../../utils/formatOrders";
import DataContext from "../../contexts/DataContext";

const dateFormat = "YYYY-MM";
const cardStyes = {
  style: { height: "100%" },
  bodyStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

// eslint-disable-next-line
function ChartsContainer({ lineChartRef, barChartRef }) {
  const { rawData } = useContext(DataContext);
  const [yearMonth, setYearMonth] = useState(moment().format(dateFormat));

  const orders = useMemo(() => formatOrders(rawData.orders, yearMonth), [
    yearMonth,
    rawData.orders,
  ]);

  const handleDateChange = useCallback((_, dateString) => {
    setYearMonth(dateString);
  }, []);

  return (
    <>
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
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <BarChart ref={barChartRef} data={orders} {...cardStyes} />
        </Col>
        <Col span={24}>
          <LineChart ref={lineChartRef} data={orders} {...cardStyes} />
        </Col>
      </Row>
    </>
  );
}

export default ChartsContainer;
