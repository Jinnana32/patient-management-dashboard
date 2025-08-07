import React from 'react';
import Button from '../ui/Button';

type Props = {
  page: number;
  onPageChange: (p: number) => void;
  hasNext: boolean;
};

const Pagination = React.memo(({ page, onPageChange, hasNext }: Props) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <Button
        variant="secondary"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </Button>
      <span className="text-sm">Page {page}</span>
      <Button
        variant="secondary"
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNext}
      >
        Next
      </Button>
    </div>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;
