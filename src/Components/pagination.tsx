import { useTranslations } from "next-intl";

function Pagination({
  handlePage,
  page,
  totalPages,
  isSeries,
}: {
  handlePage: (page: number) => void;
  page: number;
  totalPages: number;
  isSeries: boolean;
}) {
  const t = useTranslations("Pagination");
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(totalPages - 1, page + delta);
      i++
    ) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex justify-center items-center space-x-2 py-8 flex-wrap gap-2">
      <button
        onClick={() => handlePage(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t("Previous")}
      </button>

      {getPageNumbers().map((pageNumber, index) => (
        <button
          key={index}
          onClick={() =>
            typeof pageNumber === "number" ? handlePage(pageNumber) : null
          }
          disabled={pageNumber === "..."}
          className={`px-4 py-2 rounded-lg ${
            pageNumber === page
              ? isSeries
                ? "bg-blue-600 text-white"
                : "bg-red-600 text-white"
              : pageNumber === "..."
              ? "bg-gray-800 text-white cursor-default"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => handlePage(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t("Next")}
      </button>
    </div>
  );
}
export default Pagination;
