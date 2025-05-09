"use client";

import { SortOptions } from "./SortOptions";
import { ViewToggle } from "./ViewToggle";
import { TimeRangeFilter } from "./TimeRangeFilter";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAtom } from "jotai";
import { searchQueryAtom } from "@/app/atoms/paperAtoms";

export function AdvancedFilterBar() {
  const [inputValue, setInputValue] = useState("");
  const [_, setSearchQuery] = useAtom(searchQueryAtom);
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
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
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-1"
          >
            <Filter className="h-4 w-4" />
            <span>筛选</span>
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <div className="p-4 border rounded-lg bg-background">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-4">
              <SortOptions />
              <div className="h-6 border-r border-border" />
              <ViewToggle />
              <div className="h-6 border-r border-border" />
              <TimeRangeFilter />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 