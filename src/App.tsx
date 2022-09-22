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
  const [value, setValue] = useState<option | undefined>(options[0]);
  const [values, setValues] = useState<option[]>([]);
  return (
    <>
      <Select
        multiple={false}
        options={options}
        value={value}
        onChange={(o) => setValue(o)}
      />
      <Select
        multiple={true}
        options={options}
        value={values}
        onChange={(o) => setValues(o)}
      />
    </>
  );
}

export default App;
