import Button from '../ui/Button';

type Props = {
  page: number;
  onPageChange: (p: number) => void;
  hasNext: boolean;
};

const Pagination = ({ page, onPageChange, hasNext }: Props) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <Button
        className="px-4 py-2 bg-gray-200 rounded"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </Button>
      <span className="text-sm">Page {page}</span>
      <Button
        className="px-4 py-2 bg-gray-200 rounded"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNext}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
