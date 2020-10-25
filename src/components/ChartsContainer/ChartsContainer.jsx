import React, { useMemo, useState } from "react";
import moment from "moment";

import { Row, Col, Typography, DatePicker, Button, Space, Select } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import CsvDownload from "react-json-to-csv";

import BarChart from "../BarChart";
import LineChart from "../LineChart";
import VarParent from "../VarParent";

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

const ExportDataParents = {
  json: React.Fragment,
  csv: CsvDownload,
};

const RestProps = (orders) => ({
  json: null,
  csv: {
    style: {
      border: "none",
      outline: "none",
      padding: 0,
    },
    data: orders,
  },
});

const ExportDataButtonProps = (orders, yearMonth) => ({
  csv: null,
  json: {
    href: `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(orders)
    )}`,
    download: `orders-${yearMonth}.json`,
  },
});

function ChartsContainer() {
  const [dataFormat, setDataFormat] = useState("json");
  const [yearMonth, setYearMonth] = useState(moment().format(dateFormat));

  const orders = useMemo(() => formatOrders(rawData.orders, yearMonth), [
    yearMonth,
  ]);

  const handleDateChange = (_, dateString) => {
    setYearMonth(dateString);
  };

  const handleDataFormatChange = (newDataFormat) => {
    setDataFormat(newDataFormat);
  };

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

              <VarParent
                parent={ExportDataParents[dataFormat]}
                {...RestProps(orders)[dataFormat]}
              >
                <Button
                  type="primary"
                  icon={<ExportOutlined />}
                  {...ExportDataButtonProps(orders, yearMonth)[dataFormat]}
                >
                  Export Orders Data
                </Button>
              </VarParent>

              <Select
                defaultValue="json"
                style={{ width: 80 }}
                value={dataFormat}
                onChange={handleDataFormatChange}
              >
                <Select.Option value="json">JSON</Select.Option>
                <Select.Option value="csv">CSV</Select.Option>
              </Select>
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
