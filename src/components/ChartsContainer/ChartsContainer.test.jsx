import React from "react";
import { render } from "@testing-library/react";

import ChartsContainer from "./ChartsContainer";

it("renders correctly", () => {
  expect(render(<ChartsContainer />)).toMatchSnapshot();
});
