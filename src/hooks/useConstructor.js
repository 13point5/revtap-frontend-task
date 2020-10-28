const { useRef } = require("react");

const useConstructor = (constructor = () => {}) => {
  const hasRun = useRef(false);

  if (!hasRun.current) {
    hasRun.current = true;

    constructor();
  }
};

export default useConstructor;
