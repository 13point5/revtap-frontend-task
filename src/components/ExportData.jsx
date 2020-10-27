import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";

import { Button, Select, Space } from "antd";
import { ExportOutlined } from "@ant-design/icons";

import CsvDownload from "react-json-to-csv";

import VarParent from "./VarParent";
import orderProptyes from "../propTypes/orders";

const varParents = {
  json: React.Fragment,
  csv: CsvDownload,
};

const varParentRestProps = (orders) => ({
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

const buttonProps = (orders, yearMonth) => ({
  csv: null,
  json: {
    href: `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(orders)
    )}`,
    download: `orders-${yearMonth}.json`,
  },
});

function ExportData({ orders, yearMonth }) {
  const [dataFormat, setDataFormat] = useState("json");

  const handleDataFormatChange = useCallback((newDataFormat) => {
    setDataFormat(newDataFormat);
  }, []);

  return (
    <Space size="middle">
      <VarParent
        parent={varParents[dataFormat]}
        {...varParentRestProps(orders)[dataFormat]}
      >
        <Button
          type="primary"
          icon={<ExportOutlined />}
          {...buttonProps(orders, yearMonth)[dataFormat]}
        >
          Export Orders Data
        </Button>
      </VarParent>

      <Select
        defaultValue={dataFormat}
        style={{ width: 80 }}
        value={dataFormat}
        onChange={handleDataFormatChange}
      >
        <Select.Option value="json">JSON</Select.Option>
        <Select.Option value="csv">CSV</Select.Option>
      </Select>
    </Space>
  );
}

ExportData.propTypes = {
  orders: orderProptyes.isRequired,
  yearMonth: PropTypes.string.isRequired,
};

export default ExportData;
