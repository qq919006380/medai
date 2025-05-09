# AI医疗藏经阁 - 医疗AI科研进展速递平台

## 产品需求文档 (PRD)

### 产品概述
AI医疗藏经阁是一款专注于医疗人工智能领域的科研进展速递平台，旨在为医疗AI领域的科研工作者、医生、医学生以及对医疗科技感兴趣的普通大众提供最新的医疗AI科研动态。

### 目标用户
- 医疗AI领域的科研工作者
- 对医疗AI感兴趣的医生、医学生
- 关注医疗科技发展的普通大众

### 用户痛点
- 医疗AI是跨学科交叉领域，相关论文分散在不同平台，不易全面掌握最新进展
- 缺乏一个专门针对医疗AI的科研动态聚合平台
- 专业论文阅读门槛高，普通人难以理解最新研究的意义和应用价值

### 解决方案
开发一款医疗AI进展速递平台，通过智能爬虫自动从arXiv、PubMed等权威平台抓取医疗AI最新论文，并按研究方向分类整理，根据用户兴趣个性化推荐内容，同时提供论文精要和通俗解读。

### 核心功能

#### 1. 智能文献抓取与分类
- 自动从arXiv、PubMed、Nature、Science等平台抓取医疗AI相关最新论文
- 使用NLP技术对论文进行自动分类（影像、病理、药物、手术、辅助诊断、疾病等）
- 提取关键元数据（作者、机构、发表日期、引用量等）

#### 2. 个性化推荐与内容展示
- 用户可设置感兴趣的研究方向、疾病类型、技术领域等标签
- 根据用户阅读历史和标签偏好，智能推荐相关论文
- 提供论文精要总结、研究意义解读、通俗科普版本
- 支持收藏、分享、评论功能

#### 3. 社区互动
- 专家点评与论文解读
- 用户讨论与问答
- 研究方向热度榜单
- 领域专家推荐

### 技术架构

#### 前端技术栈
- 框架: Next.js (App Router)
- UI组件库: shadcn/ui
- 样式: Tailwind CSS
- 状态管理: Jotai

#### 后端技术栈
- 数据库: Vercel Neon (PostgreSQL)
- API: Next.js API Routes
- 爬虫服务: Python (Beautiful Soup/Scrapy)
- AI处理: OpenAI API/HuggingFace

### 数据模型设计

#### 用户 (User)
- id: UUID
- name: String
- email: String
- password: String (hashed)
- interests: String[] (研究方向标签)
- created_at: DateTime
- updated_at: DateTime

#### 论文 (Paper)
- id: UUID
- title: String
- authors: String[]
- abstract: String
- publication_date: DateTime
- source: String (arXiv/PubMed等)
- url: String
- pdf_url: String
- categories: String[] (影像/病理/药物等)
- keywords: String[]
- citations: Number
- created_at: DateTime
- updated_at: DateTime

#### 摘要/解读 (Summary)
- id: UUID
- paper_id: UUID (关联论文)
- technical_summary: String (专业摘要)
- simplified_summary: String (通俗解读)
- significance: String (意义解读)
- created_at: DateTime
- updated_at: DateTime

#### 收藏 (Bookmark)
- id: UUID
- user_id: UUID
- paper_id: UUID
- created_at: DateTime

### 页面设计

#### 1. 首页
- 导航栏（首页、分类、我的收藏、设置）
- 热门论文推荐
- 最新论文列表（分页展示）
- 快速筛选器（研究方向、时间范围）

#### 2. 论文详情页
- 论文基本信息（标题、作者、发表日期等）
- 专业摘要与通俗解读并列展示
- 原文链接与PDF下载
- 相关论文推荐
- 用户评论与讨论区

#### 3. 分类页面
- 研究方向分类导航
- 按分类筛选的论文列表
- 二级筛选（时间、热度、引用量等）

#### 4. 个人中心
- 兴趣标签管理
- 收藏论文列表
- 阅读历史
- 账户设置

### 开发路线图

#### 第一阶段：MVP (2周)
- 基础项目搭建
- 用户认证系统实现
- 首页与论文详情页面基础实现
- 手动添加少量论文数据用于展示

#### 第二阶段：核心功能 (4周)
- 爬虫服务实现，自动抓取论文
- 论文分类算法实现
- 个性化推荐系统基础版
- 收藏与基础社交功能

#### 第三阶段：功能完善 (4周)
- AI摘要与解读系统实现
- 高级搜索与筛选功能
- 社区互动功能完善
- 性能优化与缓存系统

#### 第四阶段：上线与迭代 (持续)
- 产品上线与市场推广
- 用户反馈收集与产品迭代
- 高级功能开发（专家解读、学术趋势分析等）

### 衡量指标
- 日活跃用户数 (DAU)
- 用户停留时间
- 论文收藏率
- 用户回访率
- 内容更新频率
- 用户反馈评分

### 商业模式展望
- 基础功能免费，高级功能付费订阅
- 机构版本（为科研机构、医院提供定制服务）
- 学术会议与活动推广
- 医疗AI行业报告发布

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# medai
