const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const oldDataPath = path.resolve(__dirname, "../fixtures/data2.json");
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
    const orderCount = (Math.random() * 10 + 1).toFixed(0);

    for (let count = 0; count < orderCount; count += 1) {
      const newOrder = {
        id: uuid(),
        created: `${yearMonth}-${String(day).padStart(2, 0)}T00:00:00.000Z`,
        customer: names[(day + count) % names.length],
        product: products[(day + count) % products.length],
        price: `${(Math.random() * 1000 + 100).toFixed(0)}`,
      };

      newData.orders.push(newOrder);
    }
  }

  fs.writeFileSync(newDataPath, JSON.stringify(newData));

  console.log(`Seeded data for ${yearMonth}`);
};

for (let month = 1; month <= 12; month += 1) {
  if (month !== 4) seedOrders(`2020-${String(month).padStart(2, 0)}`);
}
