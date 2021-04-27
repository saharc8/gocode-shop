import { useState } from "react";

const initialValue = "Hey";
let flg = true;

const Toggle = () => {
  const [value, setValue] = useState(initialValue);

  function changeValue() {
    if (flg) {
      setValue("");
      flg = !flg;
    } else {
      setValue(initialValue);
      flg = !flg;
    }
  }

  return (
    <div>
      <button onClick={() => changeValue()}>click me</button>
      <div>{value}</div>
    </div>
  );
};

export default Toggle;
