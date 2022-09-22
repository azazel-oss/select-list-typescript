import { useEffect, useState } from "react";
import styles from "./select.module.css";
type SelectOption = {
  label: string;
  value: string;
};
type SingleSelectProps = {
  multiple: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};
type SelectProps = {
  title: string;
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);
export function Select({
  title,
  multiple,
  options,
  value,
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  useEffect(() => {
    setHighlightedIndex(0);
  }, [isOpen]);
  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }

  function selectOption(option: SelectOption) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      onChange(option);
    }
  }

  function isOptionSelected(option: SelectOption) {
    return option === value;
  }

  return (
    <div>
      <h2>{title}</h2>
      <div
        onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
        onBlur={() => setIsOpen((prevIsOpen) => false)}
        tabIndex={0}
        className={styles.container}
      >
        <span className={styles.value}>
          {multiple
            ? value.map((element) => (
                <button
                  key={element.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(element);
                  }}
                  className={styles["option-badge"]}
                >
                  {element.label}
                  <span className={styles["remove-btn"]}>&times;</span>
                </button>
              ))
            : value?.label}
        </span>
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
    </div>
  );
}
