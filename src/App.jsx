/* eslint-disable */
import React from "react";
import { Layout, Timeline, Typography } from "antd";

import { CustomersView, ChartsContainer } from "./components";

import rawData from "./fixtures/data2.json";
import DataContext from "./contexts/DataContext";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          id: "bar-chart",
          label: "Bar Chart",
        },
        {
          id: "line-chart",
          label: "Line Chart",
        },
        {
          id: "customers-view",
          label: "Customers View",
        },
      ],
      activeItem: {
        id: null,
        ratio: 0,
      },
    };

    this.itemRefs = {};

    this.state.items.forEach((item) => {
      this.itemRefs[item.id] = {
        ref: React.createRef(),
        id: item.id,
        ratio: 0,
      };
    });

    const intersectionHandler = (entries) => {
      entries.forEach((entry) => {
        this.itemRefs[entry.target.id].ratio = entry.intersectionRatio;
      });

      let activeEntry = this.itemRefs[this.state.items[0].id];

      Object.values(this.itemRefs).forEach((itemRef) => {
        if (itemRef.ratio > activeEntry.ratio) {
          activeEntry = itemRef;
        }
      });

      if (activeEntry.ratio > this.state.activeItem.ratio) {
        this.setState({ activeItem: activeEntry });
      }
    };

    this.observer = new IntersectionObserver(intersectionHandler, {
      threshold: new Array(101).fill(0).map((_, i) => i * 0.01),
    });
  }

  componentDidMount() {
    Object.values(this.itemRefs).forEach((itemRef) =>
      this.observer.observe(itemRef.ref.current)
    );
  }

  render() {
    const { items, activeItem } = this.state;

    return (
      <Layout style={{ padding: "2rem" }}>
        <Typography.Title level={1} style={{ textAlign: "center" }}>
          RevTap Task
        </Typography.Title>

        <DataContext.Provider value={{ rawData }}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <ChartsContainer
                barChartRef={this.itemRefs["bar-chart"].ref}
                lineChartRef={this.itemRefs["line-chart"].ref}
              />

              <div>
                <CustomersView ref={this.itemRefs["customers-view"].ref} />
              </div>
            </div>

            <div
              style={{
                width: "50%",
                top: 0,
                right: 0,
                position: "sticky",
              }}
            >
              <Timeline style={{ top: 0, right: 0, position: "sticky" }}>
                {items.map((item) => {
                  const isActiveItem = item.id === activeItem.id;
                  const color = isActiveItem ? "blue" : "black";

                  return (
                    <Timeline.Item
                      color={isActiveItem ? "blue" : "gray"}
                      onClick={() => {
                        this.itemRefs[item.id].ref.current.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                      style={{ color, cursor: "pointer" }}
                    >
                      {item.label}
                    </Timeline.Item>
                  );
                })}
              </Timeline>
            </div>
          </div>
        </DataContext.Provider>
      </Layout>
    );
  }
}

export default App;
