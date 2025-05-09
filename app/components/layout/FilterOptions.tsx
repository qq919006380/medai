"use client";

import { SortOptions } from "./SortOptions";
import { ViewToggle } from "./ViewToggle";

export function FilterOptions() {
  return (
    <div className="flex items-center justify-between border rounded-lg bg-background p-2 mb-4">
      <div className="flex space-x-2">
        <SortOptions />
        <div className="h-6 border-r border-border" />
        <ViewToggle />
      </div>
    </div>
  );
} 