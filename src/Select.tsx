import { useEffect, useState } from "react";
import styles from "./select.module.css";
type SelectOption = {
  label: string;
  value: string;
};
type SelectProps = {
  options: SelectOption[];
  value?: SelectOption | null;
  onChange: (value: SelectOption | null) => void;
};
export function Select({ options, value, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  useEffect(() => {
    setHighlightedIndex(0);
  }, [isOpen]);
  function clearOptions() {
    onChange(null);
  }

  function selectOption(option: SelectOption) {
    onChange(option);
  }

  function isOptionSelected(option: SelectOption) {
    return option === value;
  }

  return (
    <div
      onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      onBlur={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>{value?.label}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, i) => (
          <li
            onMouseEnter={() => setHighlightedIndex(i)}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            key={option.value}
            className={`${styles.option}
            ${isOptionSelected(option) ? styles.selected : ""}
            ${i === highlightedIndex ? styles.highlighted : ""}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
