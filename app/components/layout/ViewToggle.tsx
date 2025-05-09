"use client";

import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList } from "lucide-react";
import { viewModeAtom } from "@/app/atoms/paperAtoms";

export function ViewToggle() {
  const [viewMode, setViewMode] = useAtom(viewModeAtom);

  const toggleViewMode = () => {
    setViewMode(viewMode === 'list' ? 'grid' : 'list');
  };

  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={toggleViewMode}
        className="flex items-center space-x-1"
      >
        {viewMode === 'list' ? (
          <>
            <LayoutList className="h-4 w-4" />
            <span>列表视图</span>
          </>
        ) : (
          <>
            <LayoutGrid className="h-4 w-4" />
            <span>网格视图</span>
          </>
        )}
      </Button>
    </div>
  );
} 