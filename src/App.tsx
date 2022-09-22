import { Select } from "./Select";
import { useState } from "react";

type option = {
  label: string;
  value: string;
};

const options = [
  { label: "First", value: "1" },
  { label: "Second", value: "2" },
  { label: "Third", value: "3" },
  { label: "Fourth", value: "4" },
  { label: "Fifth", value: "5" },
];
function App() {
  const [value, setValue] = useState<option | null>(options[0]);
  return (
    <>
      <Select options={options} value={value} onChange={(o) => setValue(o)} />
    </>
  );
}

export default App;
