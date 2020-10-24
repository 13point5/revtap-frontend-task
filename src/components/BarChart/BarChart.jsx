import React from "react";
import PropTypes from "prop-types";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, Empty } from "antd";

function BarChartView({ data, ...restProps }) {
  return (
    <Card title="Orders Count" {...restProps}>
      {data.length > 0 ? (
        <BarChart data={data} width={800} height={400}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      ) : (
        <Empty />
      )}
    </Card>
  );
}

BarChartView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      amount: PropTypes.number,
      count: PropTypes.number,
    })
  ).isRequired,
};

export default BarChartView;
