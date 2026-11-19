"use client";

import { useState } from "react";
import { TagAutocomplete } from "@/components/upload/TagAutocomplete";

type UploadTagsFieldProps = {
  availableTags: readonly string[];
};

export function UploadTagsField({ availableTags }: UploadTagsFieldProps) {
  const [value, setValue] = useState("");

  return (
    <TagAutocomplete
      availableTags={availableTags}
      label="Tags separadas por virgula"
      onChange={setValue}
      value={value}
    />
  );
}