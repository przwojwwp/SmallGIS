import React from 'react';

interface FilterSortProps {
  filter: string;
  setFilter: (filter: string) => void;
  sort: 'asc' | 'desc';
  setSort: (sort: 'asc' | 'desc') => void;
}

const FilterSort: React.FC<FilterSortProps> = ({ filter, setFilter, sort, setSort }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filtruj zadania"
        className="p-2 border rounded mr-2"
      />
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as 'asc' | 'desc')}
        className="p-2 border rounded"
      >
        <option value="asc">Sortuj rosnąco</option>
        <option value="desc">Sortuj malejąco</option>
      </select>
    </div>
  );
};

export default FilterSort;
