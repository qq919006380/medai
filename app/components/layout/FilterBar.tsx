"use client";

import { SortOptions } from "./SortOptions";
import { ViewToggle } from "./ViewToggle";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAtom } from "jotai";
import { searchQueryAtom } from "@/app/atoms/paperAtoms";
import { Button } from "@/components/ui/button";

export function FilterBar() {
  const [inputValue, setInputValue] = useState("");
  const [_, setSearchQuery] = useAtom(searchQueryAtom);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4 mb-6">
      <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="搜索论文..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="ghost" size="icon">
          <Search className="h-4 w-4" />
          <span className="sr-only">搜索</span>
        </Button>
      </form>
      
      <div className="flex items-center space-x-4">
        <SortOptions />
        <div className="h-6 border-r border-border" />
        <ViewToggle />
      </div>
    </div>
  );
} 