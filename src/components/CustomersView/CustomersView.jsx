import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

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

function CustomersView({ data }) {
  const tableData = useMemo(
    () =>
      data.map((item) => ({
        ...item,
        key: item.id,
      })),
    [data]
  );

  return <Table dataSource={tableData} columns={columns} />;
}

CustomersView.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      created: PropTypes.string,
      orders: PropTypes.number,
    })
  ).isRequired,
};

export default CustomersView;
