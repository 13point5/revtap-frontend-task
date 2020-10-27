import { string, number, arrayOf, shape } from "prop-types";

const ordersPropType = arrayOf(
  shape({
    date: string,
    amount: number,
    count: number,
    rawOrders: arrayOf(
      shape({
        id: string,
        created: string,
        customer: string,
        product: string,
        price: string,
      })
    ),
  })
);

export default ordersPropType;
