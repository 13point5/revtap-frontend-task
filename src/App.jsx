import React, { useState, useEffect, createRef } from "react";
import { Layout, Timeline, Typography } from "antd";

import { CustomersView, ChartsContainer } from "./components";

import rawData from "./fixtures/data2.json";
import DataContext from "./contexts/DataContext";
// import useConstructor from "./hooks/useConstructor";

const items = [
  { id: "bar-chart", label: "Bar Chart" },
  { id: "line-chart", label: "Line Chart" },
  { id: "customers-view", label: "Customers View" },
];

// eslint-disable-next-line
function buildThresholdList() {
  const thresholds = [];
  const numSteps = 20;

  for (let i = 1.0; i <= numSteps; i += 1) {
    const ratio = i / numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

function App() {
  const [activeItem, setActiveItem] = useState(items[0].id);
  // const [prevRatio, setPrevRatio] = useState(0);

  const tableRef = createRef();
  const barChartRef = createRef();
  const lineChartRef = createRef();

  const refs = {
    "bar-chart": barChartRef,
    "line-chart": lineChartRef,
    "customers-view": tableRef,
  };

  useEffect(() => {
    const observerConfig = {
      // threshold: buildThresholdList(),
      threshold: [0.6, 0.8, 1],
    };

    const observer = new IntersectionObserver((entries) => {
      let maxTarget = entries[0];

      // if (maxTarget.isIntersecting && maxTarget.intersectionRatio >= 0.6) {
      //   setActiveItem(items[0].id);
      // }

      entries.forEach((entry) => {
        console.log(
          `${entry.target.id} :>> `,

          entry.isIntersecting,
          entry.intersectionRatio
        );

        if (entry.intersectionRatio > maxTarget.intersectionRatio) {
          maxTarget = { ...entry };
        }
      });

      console.log("maxTarget :>> ", maxTarget);

      if (maxTarget.target) setActiveItem(maxTarget?.target?.id);

      // if (!maxTarget.target) setActiveItem(items[0].id);
      // else setActiveItem(maxTarget?.target?.id);
    }, observerConfig);

    observer.observe(tableRef.current);
    observer.observe(barChartRef.current);
    observer.observe(lineChartRef.current);

    return () => observer.disconnect();
  }, []);

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
            id="rComponents"
          >
            <ChartsContainer
              lineChartRef={lineChartRef}
              barChartRef={barChartRef}
            />

            <div>
              <CustomersView ref={tableRef} />
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
                const isActiveItem = item.id === activeItem;
                const color = isActiveItem ? "blue" : "black";
                return (
                  <Timeline.Item
                    color={isActiveItem ? "blue" : "gray"}
                    onClick={() => {
                      setActiveItem(item.id);

                      refs[item.id].current.scrollIntoView({
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

export default App;
