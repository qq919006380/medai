"use client";

import { useAtom } from "jotai";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { selectedCategoriesAtom, PaperCategory } from "@/app/atoms/paperAtoms";

// 所有可用的论文分类
const allCategories: PaperCategory[] = [
  '医学影像',
  '病理学',
  '药物研发',
  '手术辅助',
  '辅助诊断',
  '具体疾病研究',
  '其他'
];

export function CategoryTabs() {
  const [selectedCategories, setSelectedCategories] = useAtom(selectedCategoriesAtom);

  const handleCategoryToggle = (category: PaperCategory) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleAllCategories = () => {
    if (selectedCategories.length === allCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([...allCategories]);
    }
  };

  return (
    <div className="w-full overflow-auto py-4">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex w-full h-auto flex-wrap justify-start bg-transparent p-0 gap-2">
          <TabsTrigger 
            value="all"
            onClick={handleAllCategories}
            className={`rounded-full px-3 py-1 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground ${
              selectedCategories.length === allCategories.length || selectedCategories.length === 0
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            全部
          </TabsTrigger>
          
          {allCategories.map(category => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() => handleCategoryToggle(category)}
              className={`rounded-full px-3 py-1 h-auto ${
                selectedCategories.includes(category)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
              }`}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
} 