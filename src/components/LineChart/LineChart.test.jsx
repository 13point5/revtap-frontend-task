import React from "react";
import renderer from "react-test-renderer";

import LineChart from "./LineChart";

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
  const tree = renderer.create(<LineChart data={data} />).toJSON();
  expect(tree).toMatchSnapshot();
});
