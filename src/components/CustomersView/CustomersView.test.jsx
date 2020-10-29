import React from "react";
import renderer from "react-test-renderer";
import DataContext from "../../contexts/DataContext";

import CustomersView from "./CustomersView";

it("renders correctly when there are few data points", () => {
  const data = {
    customers: [
      {
        id: "0153012d-1fbd-49f2-a6c3-ddad138c2d3b",
        firstName: "Florine",
        lastName: "Deckow",
        email: "Maximo_Ullrich@hotmail.com",
        created: "2020-04-29T20:07:16.125Z",
        orders: 2,
      },
      {
        id: "bf7f4255-3832-4499-b445-063307b8a59b",
        firstName: "Lavada",
        lastName: "Cronin",
        email: "Cicero.Douglas9@hotmail.com",
        created: "2020-04-29T06:43:36.299Z",
        orders: 2,
      },
      {
        id: "ab560f63-18db-4925-8cbc-4703a4f70655",
        firstName: "Jeremy",
        lastName: "Reichert",
        email: "Marisa65@gmail.com",
        created: "2020-04-25T19:19:55.187Z",
        orders: 1,
      },
      {
        id: "32418bc6-aec2-4166-ac67-fc7a6107a1c5",
        firstName: "Norval",
        lastName: "Corkery",
        email: "Stuart.Schmitt27@gmail.com",
        created: "2020-04-26T06:24:50.824Z",
        orders: 1,
      },
    ],
  };

  const tree = renderer
    .create(
      <DataContext.Provider value={{ rawData: data }}>
        <CustomersView />
      </DataContext.Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
