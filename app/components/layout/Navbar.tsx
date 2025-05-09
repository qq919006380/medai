"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useAtom } from "jotai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchQueryAtom } from "@/app/atoms/paperAtoms";

export function Navbar() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [_, setSearchQuery] = useAtom(searchQueryAtom);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchValue);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="font-bold text-xl md:text-2xl">
            AI医疗藏经阁
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <form
            onSubmit={handleSearch}
            className={`relative ${
              isSearchExpanded ? "w-64 md:w-80" : "w-9 md:w-64"
            } transition-all duration-300 ease-in-out`}
          >
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer ${
                isSearchExpanded ? "" : "md:pointer-events-none"
              }`}
              onClick={() => !isSearchExpanded && setIsSearchExpanded(true)}
            />
            <Input
              type="search"
              placeholder="搜索论文..."
              className={`w-full ${
                isSearchExpanded
                  ? "pl-9 pr-4 h-9"
                  : "md:pl-9 md:pr-4 md:h-9 w-0 p-0 h-9 md:w-full"
              } focus:border-primary transition-all duration-300`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsSearchExpanded(true)}
              onBlur={() => searchValue === "" && setIsSearchExpanded(false)}
            />
          </form>

          <nav className="flex items-center gap-2">
            <Link href="/preferences">
              <Button variant="ghost" size="sm">
                偏好设置
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" size="sm">
                关于
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 