"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { useAtom } from "jotai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { customKeywordsAtom } from "@/app/atoms/paperAtoms";

export function KeywordTrackInput() {
  const [newKeyword, setNewKeyword] = useState("");
  const [keywords, setKeywords] = useAtom(customKeywordsAtom);

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddKeyword} className="flex space-x-2">
        <Input
          type="text"
          placeholder="添加关键词..."
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit" variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      <div className="flex flex-wrap gap-2">
        {keywords.length === 0 ? (
          <p className="text-sm text-muted-foreground">添加关键词以追踪特定主题</p>
        ) : (
          keywords.map((keyword) => (
            <Badge
              key={keyword}
              variant="secondary"
              className="px-2 py-1 flex items-center group"
            >
              {keyword}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 ml-1 p-0 opacity-60 group-hover:opacity-100"
                onClick={() => handleRemoveKeyword(keyword)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">删除</span>
              </Button>
            </Badge>
          ))
        )}
      </div>
    </div>
  );
} 