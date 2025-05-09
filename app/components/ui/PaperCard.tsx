"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, BookOpen, ExternalLink, Bookmark, Share2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Paper } from "@/app/atoms/paperAtoms";

interface PaperCardProps {
  paper: Paper;
}

export function PaperCard({ paper }: PaperCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter();
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // 截断作者列表
  const formatAuthors = (authors: string[]) => {
    if (authors.length <= 3) return authors.join(', ');
    return `${authors.slice(0, 3).join(', ')} 等`;
  };

  // 处理点击事件
  const handleOriginalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(paper.url, '_blank', 'noopener,noreferrer');
  };

  const handleDetailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/paper/${paper.id}`);
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-1">
          <div className="flex space-x-2">
            {paper.categories.map(category => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(paper.publicationDate)}
          </div>
        </div>
        <Link href={`/paper/${paper.id}`} onClick={(e) => handleDetailClick(e)}>
          <CardTitle className="text-lg hover:underline cursor-pointer line-clamp-2">
            {paper.title}
          </CardTitle>
        </Link>
        <div className="text-sm text-muted-foreground pt-1">
          {formatAuthors(paper.authors)}
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {paper.abstract}
        </p>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
            <span className="sr-only">收藏</span>
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">分享</span>
          </Button>
        </div>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 gap-1 text-xs"
            onClick={handleDetailClick}
          >
            <BookOpen className="h-4 w-4" />
            阅读详情
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 gap-1 text-xs"
            onClick={handleOriginalClick}
          >
            <ExternalLink className="h-4 w-4" />
            原文
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 