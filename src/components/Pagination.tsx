import { usePagesBuilder } from "@/helpers/pagination-range";
import classNames from "classnames";

const Pagination = ({
  page,
  limit,
  total,
  fetchData,
}: {
  page: number;
  limit: number;
  total: number;
  fetchData: ({ currentPage }: { currentPage: number }) => Promise<void> | void;
}) => {
  if (total <= limit) return null;

  const classes =
    "flex items-center justify-center border rounded-1 text-sm font-sans text-gray-300 border-gray-500 w-8 h-8";

  const totalPages = Math.ceil(total / limit);
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  return (
    <div className="flex flex-wrap gap-1">
      <button
        disabled={isFirstPage}
        className={classNames(classes, {
          "opacity-50": isFirstPage,
        })}
        onClick={() => fetchData({ currentPage: page - 1 })}
      >
        &lt;
      </button>
      {usePagesBuilder(page, totalPages).map((item, i) => (
        <button
          key={i}
          disabled={page === item || !Number.isInteger(item)}
          className={classNames(classes, {
            "opacity-50": !Number.isInteger(item),
            "text-white border-green-500 bg-green-500": page === item,
          })}
          onClick={() => fetchData({ currentPage: Number(item) })}
        >
          {item}
        </button>
      ))}

      <button
        disabled={isLastPage}
        className={classNames(classes, {
          "opacity-50": isLastPage,
        })}
        onClick={() => fetchData({ currentPage: page + 1 })}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
