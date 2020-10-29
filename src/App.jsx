import React, { useEffect, useRef, useState } from "react";
import { Col, Layout, Row, Typography } from "antd";

import { CustomersView, ChartsContainer, SectionNav } from "./components";

import rawData from "./fixtures/data2.json";
import DataContext from "./contexts/DataContext";

const items = [
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
];

function App() {
  const hasRun = useRef(false);
  const itemRefs = useRef({});
  const observer = useRef();
  const [activeItem, setActiveItem] = useState({
    id: null,
    ratio: 0,
  });

  const constructor = () => {
    items.forEach((item) => {
      itemRefs.current[item.id] = {
        ref: React.createRef(),
        id: item.id,
        ratio: 0,
      };
    });

    const intersectionHandler = (entries) => {
      entries.forEach((entry) => {
        itemRefs.current[entry.target.id].ratio = entry.intersectionRatio;
      });

      let activeEntry = itemRefs.current[items[0].id];

      Object.values(itemRefs.current).forEach((itemRef) => {
        if (itemRef.ratio > activeEntry.ratio) {
          activeEntry = itemRef;
        }
      });

      if (activeEntry.ratio > activeItem.ratio) {
        setActiveItem(activeEntry);
      }
    };

    observer.current = new IntersectionObserver(intersectionHandler, {
      threshold: new Array(101).fill(0).map((_, i) => i * 0.01),
    });
  };

  if (!hasRun.current) {
    constructor();
    hasRun.current = true;
  }

  useEffect(() => {
    Object.values(itemRefs.current).forEach((itemRef) =>
      observer.current.observe(itemRef.ref.current)
    );

    return () => observer.current.disconnect();
  }, []);

  return (
    <Layout style={{ padding: "2rem" }}>
      <Typography.Title level={1} style={{ textAlign: "center" }}>
        RevTap Task
      </Typography.Title>

      <DataContext.Provider value={{ rawData }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Row style={{ width: "50%" }}>
            <Col span={24}>
              <ChartsContainer
                barChartRef={itemRefs.current["bar-chart"].ref}
                lineChartRef={itemRefs.current["line-chart"].ref}
              />
            </Col>

            <Col span={24}>
              <CustomersView ref={itemRefs.current["customers-view"].ref} />
            </Col>
          </Row>

          <SectionNav>
            {items.map((item) => {
              const isActiveItem = item.id === activeItem.id;

              return (
                <SectionNav.Item
                  active={isActiveItem}
                  onClick={() => {
                    itemRefs.current[item.id].ref.current.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                >
                  {item.label}
                </SectionNav.Item>
              );
            })}
          </SectionNav>
        </div>
      </DataContext.Provider>
    </Layout>
  );
}

export default App;
