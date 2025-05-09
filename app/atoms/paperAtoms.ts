import { atom } from 'jotai';

export type PaperCategory = 
  | '医学影像'
  | '病理学'
  | '药物研发'
  | '手术辅助'
  | '辅助诊断'
  | '具体疾病研究'
  | '其他';

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  categories: PaperCategory[];
  publicationDate: string;
  url: string;
  doi?: string;
  simplifiedSummary?: string;
  significanceAnalysis?: string;
}

// 默认论文数据状态
export const papersAtom = atom<Paper[]>([]);

// 用户选择的分类
export const selectedCategoriesAtom = atom<PaperCategory[]>([]);

// 用户自定义关键词
export const customKeywordsAtom = atom<string[]>([]);

// 排序方式：按热度或按时间
export type SortMethod = 'hot' | 'date';
export const sortMethodAtom = atom<SortMethod>('date');

// 视图模式：列表或网格
export type ViewMode = 'list' | 'grid';
export const viewModeAtom = atom<ViewMode>('list');

// 搜索查询
export const searchQueryAtom = atom<string>('');

// 过滤后的论文列表
export const filteredPapersAtom = atom((get) => {
  const papers = get(papersAtom);
  const selectedCategories = get(selectedCategoriesAtom);
  const customKeywords = get(customKeywordsAtom);
  const sortMethod = get(sortMethodAtom);
  const searchQuery = get(searchQueryAtom);
  
  // 首先应用分类筛选
  let filtered = papers;
  
  if (selectedCategories.length > 0) {
    filtered = filtered.filter(paper => 
      paper.categories.some(category => selectedCategories.includes(category))
    );
  }
  
  // 应用自定义关键词筛选
  if (customKeywords.length > 0) {
    filtered = filtered.filter(paper => {
      const paperText = `${paper.title} ${paper.abstract}`.toLowerCase();
      return customKeywords.some(keyword => 
        paperText.includes(keyword.toLowerCase())
      );
    });
  }
  
  // 应用搜索查询
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(paper => 
      paper.title.toLowerCase().includes(query) || 
      paper.abstract.toLowerCase().includes(query) ||
      paper.authors.some(author => author.toLowerCase().includes(query))
    );
  }
  
  // 应用排序
  if (sortMethod === 'date') {
    filtered = [...filtered].sort((a, b) => 
      new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
    );
  } else {
    // 这里可以根据热度算法排序，暂时使用简单的按日期排序
    filtered = [...filtered].sort((a, b) => 
      new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
    );
  }
  
  return filtered;
}); 