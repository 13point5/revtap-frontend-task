const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const oldDataPath = path.resolve(__dirname, "../fixtures/data.json");
const newDataPath = path.resolve(__dirname, "../fixtures/data2.json");

const getCustomerNames = (data) => {
  const { customers } = data;

  const names = customers.map((customer) => customer.firstName);

  return names;
};

const getProducts = (data) => {
  const { orders } = data;

  const products = orders.map((order) => order.product);

  return products;
};

const seedOrders = (yearMonth) => {
  const oldData = JSON.parse(fs.readFileSync(oldDataPath));

  const newData = { ...oldData };

  const [year, month] = yearMonth.split("-");
  const numOfDays = new Date(year, month, 0).getDate();

  const names = getCustomerNames(oldData);
  const products = getProducts(oldData);

  for (let day = 1; day <= numOfDays; day += 1) {
    const newOrder = {
      id: uuid(),
      created: `${yearMonth}-${String(day).padStart(2, 0)}`,
      customer: names[day],
      product: products[day],
      price: `${(Math.random() * 1000 + 100).toFixed(0)}`,
    };

    newData.orders.push(newOrder);
  }

  fs.writeFileSync(newDataPath, JSON.stringify(newData));

  console.log(`Seeded data for ${yearMonth}`);
};

seedOrders("2020-02");
