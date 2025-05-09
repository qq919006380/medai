"use client";

import React, { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, Share2 } from "lucide-react";

// Paper interface for type checking
export interface Paper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  publicationDate: string;
  url: string;
  categories: string[];
  doi?: string;
  simplifiedSummary?: string;
  significanceAnalysis?: string;
}

export function ClientBookmarkButton({ paperId }: { paperId: string }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  return (
    <Button 
      variant="outline" 
      className="gap-1"
      onClick={() => setIsBookmarked(!isBookmarked)}
    >
      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
      {isBookmarked ? '已收藏' : '收藏'}
    </Button>
  );
}

export function ClientShareButton({ paper }: { paper: Paper }) {
  return (
    <Button 
      variant="outline" 
      className="gap-1"
      onClick={() => {
        if (navigator.share) {
          navigator.share({
            title: paper.title,
            text: `Check out this paper: ${paper.title}`,
            url: window.location.href,
          });
        } else {
          // Fallback for browsers that don't support navigator.share
          navigator.clipboard.writeText(window.location.href);
          alert('链接已复制到剪贴板');
        }
      }}
    >
      <Share2 className="h-4 w-4" />
      分享
    </Button>
  );
} 