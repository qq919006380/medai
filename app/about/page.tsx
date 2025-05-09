import Link from "next/link";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/app/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
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
        
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6">关于AI医疗藏经阁</h1>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>项目愿景</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  AI医疗藏经阁是一个实时推送医疗人工智能领域最新研究进展的平台，旨在为医疗AI研究者、医生、学生和对医疗科技感兴趣的人群提供精准、分类清晰的学术前沿信息。
                </p>
                <p>
                  在当今医疗AI快速发展的时代，研究成果分散在不同的学术平台和期刊中，研究者常常难以全面追踪领域最新进展。我们希望通过AI医疗藏经阁，为所有关注医疗AI发展的人提供一个集中、便捷的信息获取渠道。
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>主要功能</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>实时抓取医疗AI领域最新论文</li>
                  <li>智能分类到不同医疗AI领域</li>
                  <li>提供个性化推荐</li>
                  <li>支持自定义关键词追踪</li>
                  <li>论文通俗解读与研究意义分析</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>技术实现</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  AI医疗藏经阁基于以下技术栈开发:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>前端框架: Next.js</li>
                  <li>UI组件库: shadcn</li>
                  <li>CSS框架: Tailwind CSS</li>
                  <li>状态管理: Jotai</li>
                  <li>数据来源: arXiv API</li>
                </ul>
                <div className="mt-4">
                  <a 
                    href="https://github.com/yourusername/ai-medical-archive" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    访问项目GitHub
                  </a>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>联系我们</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  如果您有任何问题、建议或合作意向，请通过以下方式联系我们:
                </p>
                <p className="mt-2">
                  邮箱: contact@aimedicalarchive.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 