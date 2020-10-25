import React from "react";
import { render } from "@testing-library/react";

import BarChart from "./BarChart";

it("renders correctly when there is no data", () => {
  const { queryByTestId } = render(<BarChart data={[]} />);

  expect(queryByTestId("barchart-empty")).toBeTruthy();
});

it("renders correctly when there are few data points", () => {
  const data = [
    {
      date: "2020-09-06",
      amount: 60,
      count: 5,
    },
    {
      date: "2020-09-09",
      amount: 35,
      count: 12,
    },
    {
      date: "2020-09-012",
      amount: 72,
      count: 92,
    },
    {
      date: "2020-09-20",
      amount: 125,
      count: 45,
    },
  ];

  const component = render(<BarChart data={data} />);
  expect(component).toMatchSnapshot();
});
