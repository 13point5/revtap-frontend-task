import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, Empty } from "antd";

import orderProptyes from "../../propTypes/orders";

function LineChartView({ data, ...restProps }) {
  return (
    <Card title="Orders Total Price" {...restProps}>
      {data.length > 0 ? (
        <LineChart width={800} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            dataKey="amount"
            stroke="#8884d8"
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
            strokeWidth={3}
          />
        </LineChart>
      ) : (
        <Empty data-testid="linechart-empty" />
      )}
    </Card>
  );
}

LineChartView.propTypes = {
  data: orderProptyes.isRequired,
};

export default LineChartView;
