import _ from "lodash";

const formatOrders = (orders, yearMonth) => {
  const yearMonthOrders = orders.filter((order) =>
    order.created.includes(yearMonth)
  );

  const dateWiseOrders = _.groupBy(
    yearMonthOrders,
    (order) => order.created.split("T")[0]
  );

  const formattedData = [];

  const [year, month] = yearMonth.split("-");
  const numOfDays = new Date(year, month, 0).getDate();

  for (let day = 1; day <= numOfDays; day += 1) {
    const date = `${yearMonth}-${String(day).padStart(2, 0)}`;

    if (!dateWiseOrders[date]) {
      formattedData.push({
        date,
        amount: 0,
        count: 0,
        rawOrders: [],
      });
    } else {
      const currOrders = dateWiseOrders[date];

      const amount = currOrders.reduce((prev, curr) => {
        return prev + Number(curr.price);
      }, 0);

      formattedData.push({
        date,
        amount,
        count: currOrders.length,
        rawOrders: dateWiseOrders[date],
      });
    }
  }

  return formattedData;
};

export default formatOrders;
