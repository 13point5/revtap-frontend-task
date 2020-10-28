import React from "react";

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

import orderProptyes from "../../propTypes/orders";

const BarChartView = React.forwardRef(({ data, ...restProps }, ref) => {
  return (
    <div ref={ref} id="bar-chart">
      <Card title="Orders Count" {...restProps}>
        {data.length > 0 ? (
          <BarChart data={data} width={800} height={450}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        ) : (
          <Empty data-testid="barchart-empty" />
        )}
      </Card>
    </div>
  );
});

BarChartView.propTypes = {
  data: orderProptyes.isRequired,
};

export default BarChartView;
