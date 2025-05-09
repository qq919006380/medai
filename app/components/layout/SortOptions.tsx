"use client";

import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { SortDesc, SortAsc, Flame } from "lucide-react";
import { sortMethodAtom, SortMethod } from "@/app/atoms/paperAtoms";

export function SortOptions() {
  const [sortMethod, setSortMethod] = useAtom(sortMethodAtom);

  const toggleSortMethod = () => {
    setSortMethod(sortMethod === 'date' ? 'hot' : 'date');
  };

  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant={sortMethod === 'date' ? "outline" : "default"}
        size="sm" 
        onClick={toggleSortMethod}
        className={`flex items-center space-x-1 transition-all duration-300 ${
          sortMethod === 'hot' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700' : ''
        }`}
      >
        {sortMethod === 'date' ? (
          <>
            <SortDesc className="h-4 w-4 text-primary" />
            <span>按日期排序</span>
          </>
        ) : (
          <>
            <Flame className="h-4 w-4 text-amber-400 animate-pulse" />
            <span>按热度排序</span>
          </>
        )}
      </Button>
    </div>
  );
} 