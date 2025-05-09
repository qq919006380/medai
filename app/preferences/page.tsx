"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/app/components/layout/Navbar";
import { KeywordTrackInput } from "@/app/components/ui/KeywordTrackInput";
import { CategoryTabs } from "@/app/components/layout/CategoryTabs";

export default function PreferencesPage() {
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
          <h1 className="text-3xl font-bold mb-6">偏好设置</h1>
          
          <Tabs defaultValue="categories" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="categories">兴趣分类</TabsTrigger>
              <TabsTrigger value="keywords">自定义关键词</TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories">
              <Card>
                <CardHeader>
                  <CardTitle>兴趣分类</CardTitle>
                  <CardDescription>
                    选择您感兴趣的医疗AI领域分类，我们将根据您的偏好为您推荐相关论文。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">选择您感兴趣的类别</h3>
                      <CategoryTabs />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>保存偏好</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="keywords">
              <Card>
                <CardHeader>
                  <CardTitle>自定义关键词</CardTitle>
                  <CardDescription>
                    添加您想要追踪的特定关键词，我们将优先推送包含这些关键词的论文。
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">管理关键词</h3>
                      <KeywordTrackInput />
                      <p className="text-sm text-muted-foreground mt-2">
                        提示：添加的关键词越精确，推荐结果越准确。例如："肺癌AI诊断"、"医学图像分割"等。
                      </p>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>保存关键词</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
} 