import { Navbar } from "@/app/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Calendar, User, ExternalLink } from "lucide-react";
import { ClientBookmarkButton, ClientShareButton } from "./client-components";

// Define the Paper interface
interface Paper {
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

// Use the correct prop types for Next.js 15
export default async function Page({
  params,
}: {
  params: Promise<{ paperId: string }>;
}) {
  // Await the params - this is required in Next.js 15
  const { paperId } = await params;
  
  // Fetch paper data 
  const paper = await fetchPaperById(paperId);
  
  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (!paper) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 container py-12">
          <div className="flex justify-center items-center h-96">
            <p className="text-muted-foreground">论文未找到或正在加载中...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container py-6">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              返回主页
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧主内容 */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex space-x-2 mb-2">
                {paper.categories.map((category: string) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{paper.title}</h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(paper.publicationDate)}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {paper.authors.join(', ')}
                </div>
              </div>
              
              <div className="flex space-x-2 mb-8">
                <a href={paper.url} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-1">
                    <ExternalLink className="h-4 w-4" />
                    查看原文
                  </Button>
                </a>
                <ClientBookmarkButton paperId={paperId} />
                <ClientShareButton paper={paper} />
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-semibold mb-4">论文摘要</h2>
              <p className="leading-relaxed whitespace-pre-line">
                {paper.abstract}
              </p>
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">相关链接</h2>
              <ul className="space-y-2">
                <li>
                  <a 
                    href={paper.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    arXiv原文链接
                  </a>
                </li>
                {paper.doi && (
                  <li>
                    <a 
                      href={`https://doi.org/${paper.doi}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      DOI: {paper.doi}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* 右侧边栏 */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-4">通俗解读</h2>
                {paper.simplifiedSummary ? (
                  <p className="text-sm">{paper.simplifiedSummary}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">该论文暂无通俗解读</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-semibold mb-4">研究意义与应用</h2>
                {paper.significanceAnalysis ? (
                  <p className="text-sm">{paper.significanceAnalysis}</p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    该论文的研究意义与应用分析正在生成中...
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper function for fetching paper data
async function fetchPaperById(paperId: string): Promise<Paper | null> {
  try {
    // Replace with your actual data fetching logic
    // For example, fetch from an API or database
    const response = await fetch(`/api/papers/${paperId}`);
    if (!response.ok) throw new Error('Failed to fetch paper');
    return await response.json();
  } catch (error) {
    console.error('Error fetching paper:', error);
    return null;
  }
} 