"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { Navbar } from "./components/layout/Navbar";
import { CategoryTabs } from "./components/layout/CategoryTabs";
import { SortOptions } from "./components/layout/SortOptions";
import { PaperCard } from "./components/ui/PaperCard";
import { KeywordTrackInput } from "./components/ui/KeywordTrackInput";
import { papersAtom, filteredPapersAtom } from "./atoms/paperAtoms";
import { fetchLatestMedicalAIPapers } from "./lib/arxiv";

export default function Home() {
  const [papers, setPapers] = useAtom(papersAtom);
  const [filteredPapers] = useAtom(filteredPapersAtom);

  useEffect(() => {
    const loadPapers = async () => {
      const fetchedPapers = await fetchLatestMedicalAIPapers(50);
      setPapers(fetchedPapers);
    };

    loadPapers();
  }, [setPapers]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container pt-6 pb-12">
        <div className="flex flex-col md:flex-row gap-6">
          {/* 左侧边栏 */}
          <aside className="w-full md:w-1/4 space-y-6">
            <div className="p-4 border rounded-lg">
              <h2 className="text-lg font-semibold mb-4">关键词追踪</h2>
              <KeywordTrackInput />
            </div>
          </aside>

          {/* 主内容区 */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">最新论文</h1>
              <SortOptions />
            </div>
            
            <CategoryTabs />
            
            {papers.length === 0 ? (
              <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">正在加载论文...</p>
              </div>
            ) : filteredPapers.length === 0 ? (
              <div className="flex items-center justify-center h-96">
                <p className="text-muted-foreground">没有找到符合条件的论文</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                {filteredPapers.map((paper) => (
                  <PaperCard key={paper.id} paper={paper} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
