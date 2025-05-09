"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { atom } from "jotai";

// 创建时间范围的atom
export const timeRangeAtom = atom<{
  startDate: Date | null;
  endDate: Date | null;
}>({
  startDate: null,
  endDate: null,
});

export function TimeRangeFilter() {
  const [timeRange, setTimeRange] = useAtom(timeRangeAtom);
  const [isOpen, setIsOpen] = useState(false);
  
  const clearTimeRange = () => {
    setTimeRange({ startDate: null, endDate: null });
  };
  
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };
  
  const hasActiveFilter = timeRange.startDate || timeRange.endDate;

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleFilter}
        className={`flex items-center space-x-1 ${hasActiveFilter ? 'text-primary' : ''}`}
      >
        <Calendar className={`h-4 w-4 ${hasActiveFilter ? 'text-primary' : ''}`} />
        <span>时间筛选</span>
        {hasActiveFilter && (
          <span className="flex h-2 w-2 rounded-full bg-primary ml-1"></span>
        )}
      </Button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 p-4 bg-background border rounded-lg shadow-md z-10 min-w-[260px]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium">筛选时间范围</span>
            {hasActiveFilter && (
              <Button variant="ghost" size="sm" onClick={clearTimeRange}>
                清除
              </Button>
            )}
          </div>
          
          {/* 这里可以添加日期选择器组件 */}
          <div className="text-sm text-muted-foreground">
            在这里添加日期选择器组件
          </div>
        </div>
      )}
    </div>
  );
} 