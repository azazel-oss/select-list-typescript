import { Select } from "./Select";
import { useState } from "react";
import "./App.css";

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
  const [value, setValue] = useState<option | undefined>(options[0]);
  const [values, setValues] = useState<option[]>([]);
  return (
    <div className="d-flex">
      <Select
        title="Single Select"
        multiple={false}
        options={options}
        value={value}
        onChange={(o) => setValue(o)}
      />
      <Select
        title="Multi Select"
        multiple={true}
        options={options}
        value={values}
        onChange={(o) => setValues(o)}
      />
    </div>
  );
}

export default App;
