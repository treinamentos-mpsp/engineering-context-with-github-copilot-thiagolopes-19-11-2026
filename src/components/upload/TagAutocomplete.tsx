"use client";

import { useId, useState } from "react";

type TagAutocompleteProps = {
  availableTags: readonly string[];
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function TagAutocomplete({ availableTags, label, value, onChange }: TagAutocompleteProps) {
  const inputId = useId();
  const listboxId = `${inputId}-listbox`;
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const commaIndex = value.lastIndexOf(",");
  const currentToken = value.slice(commaIndex + 1).trim().toLowerCase();
  const enteredTags = value.split(",").map((tag) => tag.trim().toLowerCase());
  const suggestions = currentToken
    ? availableTags.filter((tag) =>
      tag.toLowerCase().startsWith(currentToken) && !enteredTags.includes(tag.toLowerCase()),
    )
    : [];
  const showSuggestions = isOpen && suggestions.length > 0;

  function selectTag(tag: string) {
    const previousTags = commaIndex === -1 ? "" : value.slice(0, commaIndex).trimEnd();
    onChange(previousTags ? `${previousTags}, ${tag}` : tag);
    setIsOpen(false);
    setActiveIndex(-1);
  }

  return (
    <div className="tag-autocomplete">
      <label htmlFor={inputId}>{label}</label>
      <input
        aria-autocomplete="list"
        aria-activedescendant={showSuggestions && activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined}
        aria-controls={showSuggestions ? listboxId : undefined}
        aria-expanded={showSuggestions}
        autoComplete="off"
        id={inputId}
        name="tags"
        onBlur={() => {
          setIsOpen(false);
          setActiveIndex(-1);
        }}
        onChange={(event) => {
          onChange(event.target.value);
          setIsOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" && suggestions.length > 0) {
            event.preventDefault();
            setIsOpen(true);
            setActiveIndex((index) => Math.min(index + 1, suggestions.length - 1));
          } else if (event.key === "ArrowUp" && suggestions.length > 0) {
            event.preventDefault();
            setIsOpen(true);
            setActiveIndex((index) => index < 0 ? suggestions.length - 1 : Math.max(index - 1, 0));
          } else if (event.key === "Enter" && showSuggestions && activeIndex >= 0) {
            event.preventDefault();
            selectTag(suggestions[activeIndex]);
          } else if (event.key === "Escape") {
            setIsOpen(false);
            setActiveIndex(-1);
          } else if (event.key === "Tab") {
            setIsOpen(false);
            setActiveIndex(-1);
          }
        }}
        placeholder="wedding, portrait, outdoor..."
        role="combobox"
        type="text"
        value={value}
      />
      {showSuggestions ? (
        <ul className="tag-suggestions" id={listboxId} role="listbox">
          {suggestions.map((tag, index) => (
            <li
              aria-selected={index === activeIndex}
              id={`${listboxId}-option-${index}`}
              key={tag}
              onClick={() => selectTag(tag)}
              onMouseDown={(event) => event.preventDefault()}
              role="option"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}