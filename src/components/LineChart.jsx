import React from "react";
import PropTypes from "prop-types";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card } from "antd";

function LineChartView({ data }) {
  return (
    <Card title="Orders Total Price">
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          dataKey="count"
          stroke="#8884d8"
          dot={{ r: 5 }}
          activeDot={{ r: 8 }}
          strokeWidth={3}
        />
      </LineChart>
    </Card>
  );
}

LineChartView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      amount: PropTypes.number,
      count: PropTypes.number,
    })
  ).isRequired,
};

export default LineChartView;
