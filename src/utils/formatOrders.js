import _ from "lodash";

const formatOrders = (orders) => {
  const dateWiseOrders = _.groupBy(
    orders,
    (order) => order.created.split("T")[0]
  );

  const formattedData = [];

  const orderDates = Object.keys(dateWiseOrders);

  orderDates.forEach((date) => {
    const currOrders = dateWiseOrders[date];

    const amount = currOrders.reduce((prev, curr) => {
      return prev + Number(curr.price);
    }, 0);

    formattedData.push({
      date,
      amount,
      count: currOrders.length,
    });
  });

  return formattedData;
};

export default formatOrders;
