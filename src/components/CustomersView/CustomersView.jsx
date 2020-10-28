import React, { useMemo, useContext } from "react";
// import PropTypes from "prop-types";
import { Table, Card } from "antd";

import DataContext from "../../contexts/DataContext";
// import useIntersect from "../../hooks/useIntersect";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
  },
  {
    title: "Orders",
    dataIndex: "orders",
    key: "orders",
  },
];

const CustomersView = React.forwardRef((props, ref) => {
  const { rawData } = useContext(DataContext);
  const data = rawData.customers;

  const tableData = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        key: item.id,
      })),
    [data]
  );

  return (
    <div id="customers-view" ref={ref}>
      <Card title="Customers" {...props}>
        <Table dataSource={tableData} columns={columns} />
      </Card>
    </div>
  );
});

export default CustomersView;
