import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { Paper, PaperCategory } from '../atoms/paperAtoms';

const BASE_URL = 'http://export.arxiv.org/api/query';

// 医疗AI相关的搜索关键词
const MEDICAL_AI_KEYWORDS = [
  'medical AND artificial intelligence',
  'healthcare AND machine learning',
  'clinical AND deep learning',
  'medical image AND AI',
  'radiology AND machine learning',
  'pathology AND artificial intelligence',
  'drug discovery AND AI',
  'surgery AND robot AND AI',
  'disease diagnosis AND machine learning'
];

// 论文分类映射函数
function categorizeByContent(title: string, summary: string): PaperCategory[] {
  const text = (title + ' ' + summary).toLowerCase();
  const categories: PaperCategory[] = [];
  
  if (/imaging|image|radiology|x-ray|ct|mri|ultrasound|scan/i.test(text)) {
    categories.push('医学影像');
  }
  
  if (/pathology|histology|tissue|microscopy|biopsy/i.test(text)) {
    categories.push('病理学');
  }
  
  if (/drug|molecule|pharmaceutical|medication|discovery|compound/i.test(text)) {
    categories.push('药物研发');
  }
  
  if (/surgery|surgical|robot|operation|minimally invasive|procedure/i.test(text)) {
    categories.push('手术辅助');
  }
  
  if (/diagnosis|diagnostic|predict|prognosis|screening/i.test(text)) {
    categories.push('辅助诊断');
  }
  
  if (/cancer|diabetes|alzheimer|covid|disease|disorder|syndrome/i.test(text)) {
    categories.push('具体疾病研究');
  }
  
  // 如果没有归入任何类别，归为"其他"
  if (categories.length === 0) {
    categories.push('其他');
  }
  
  return categories;
}

// 将arXiv条目转换为统一的Paper格式
function transformArxivEntry(entry: any): Paper {
  // 解析作者数组
  const authors = Array.isArray(entry.author) 
    ? entry.author.map((a: any) => a.name) 
    : [entry.author.name];
  
  // 简化DOI提取
  let doi = '';
  if (entry.doi) {
    doi = entry.doi;
  } else if (entry.link && Array.isArray(entry.link)) {
    const doiLink = entry.link.find((l: any) => l.title && l.title.includes('doi'));
    if (doiLink) {
      doi = doiLink.href;
    }
  }
  
  // 创建论文对象
  const paper: Paper = {
    id: entry.id || Math.random().toString(36).substr(2, 9),
    title: entry.title.replace(/\n/g, ' ').trim(),
    authors,
    abstract: entry.summary.replace(/\n/g, ' ').trim(),
    categories: categorizeByContent(entry.title, entry.summary),
    publicationDate: entry.published || new Date().toISOString(),
    url: Array.isArray(entry.link) ? entry.link[0].href : entry.link.href,
    doi,
    simplifiedSummary: '', // 这部分可以通过后续的AI处理生成
    significanceAnalysis: '', // 这部分可以通过后续的AI处理生成
  };
  
  return paper;
}

// 获取最新医疗AI相关论文
export async function fetchLatestMedicalAIPapers(maxResults = 50): Promise<Paper[]> {
  try {
    // 并行获取所有关键词相关的论文
    const queries = MEDICAL_AI_KEYWORDS.map(keyword => 
      axios.get(BASE_URL, {
        params: {
          search_query: `all:${keyword}`,
          sortBy: 'submittedDate',
          sortOrder: 'descending',
          max_results: Math.ceil(maxResults / MEDICAL_AI_KEYWORDS.length)
        }
      })
    );
    
    const responses = await Promise.all(queries);
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "_",
      isArray: (name: string) => ['entry', 'author', 'link'].includes(name),
    });
    
    // 合并所有响应结果
    const allPapers: Paper[] = [];
    const paperIds = new Set<string>(); // 用于去重
    
    for (const response of responses) {
      const result = parser.parse(response.data);
      const entries = result.feed.entry || [];
      
      for (const entry of entries) {
        if (!paperIds.has(entry.id)) {
          paperIds.add(entry.id);
          allPapers.push(transformArxivEntry(entry));
        }
      }
    }
    
    // 按发布日期排序
    return allPapers.sort((a, b) => 
      new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
    );
  } catch (error) {
    console.error('Error fetching papers from arXiv:', error);
    return [];
  }
}

// 使用关键词搜索论文
export async function searchPapersByKeyword(keyword: string, maxResults = 20): Promise<Paper[]> {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        search_query: `all:${keyword}`,
        sortBy: 'relevance',
        max_results: maxResults
      }
    });
    
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "_",
      isArray: (name: string) => ['entry', 'author', 'link'].includes(name),
    });
    
    const result = parser.parse(response.data);
    const entries = result.feed.entry || [];
    
    return entries.map(transformArxivEntry);
  } catch (error) {
    console.error('Error searching papers:', error);
    return [];
  }
} 