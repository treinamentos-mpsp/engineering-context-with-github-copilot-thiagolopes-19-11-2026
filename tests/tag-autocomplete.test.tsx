import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TagAutocomplete } from "../src/components/upload/TagAutocomplete";

const availableTags = ["portrait", "wedding", "wildlife"];

function ControlledTagAutocomplete() {
  const [value, setValue] = useState("");

  return (
    <TagAutocomplete
      availableTags={availableTags}
      label="Tags"
      onChange={setValue}
      value={value}
    />
  );
}

describe("TagAutocomplete", () => {
  it("sugere e seleciona uma tag após uma vírgula", async () => {
    const user = userEvent.setup();
    render(<ControlledTagAutocomplete />);

    const input = screen.getByRole("combobox", { name: "Tags" });
    await user.type(input, "portrait, WI");

    const option = screen.getByRole("option", { name: "wildlife" });
    await user.click(option);

    expect(input).toHaveValue("portrait, wildlife");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(input).toHaveAttribute("aria-expanded", "false");
  });

  it("fecha as sugestões quando o texto deixa de corresponder", async () => {
    const user = userEvent.setup();
    render(<ControlledTagAutocomplete />);

    const input = screen.getByRole("combobox", { name: "Tags" });
    await user.type(input, "w");

    expect(screen.getAllByRole("option").length).toBeGreaterThan(0);

    await user.type(input, "zzz");

    expect(input).toHaveValue("wzzz");
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(input).toHaveAttribute("aria-expanded", "false");
  });
});