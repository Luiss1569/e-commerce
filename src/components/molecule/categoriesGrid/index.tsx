import { memo } from "react";
import CategoryItem, { CategoryItemSkeleton } from "../../atom/category";
import Category from "@/interfaces/category";
import ScrollTouch from "react-indiana-drag-scroll";
import { useSelector } from "react-redux";
import { rootState } from "@/store/reducers";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  categories: Category[];
  loading?: boolean;
}

const CategoriesGrid: React.FC<Props> = ({ categories, loading }) => {
  const selectedCategory = useSelector(
    (state: rootState) => state.products.category,
  );

  return (
    <ScrollTouch vertical={false} hideScrollbars={false}>
      <div className="flex flex-1 snap-x p-3 gap-3">
        {categories.map(category => (
          <CategoryItem
            key={category.id}
            category={category}
            isSelected={category.id === selectedCategory}
          />
        ))}

        {!categories.length && (
          <>
            {loading ? (
              <>
                <CategoryItemSkeleton />
                <CategoryItemSkeleton />
                <CategoryItemSkeleton />
                <CategoryItemSkeleton />
                <CategoryItemSkeleton />
                <CategoryItemSkeleton />
                <CategoryItemSkeleton />
                <CategoryItemSkeleton />
                <CategoryItemSkeleton />
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-indigo-500">
                  Nenhuma categoria encontrada
                </h2>
              </div>
            )}
          </>
        )}
      </div>
    </ScrollTouch>
  );
};

export default memo(CategoriesGrid);
