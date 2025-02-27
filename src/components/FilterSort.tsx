import React from 'react';

interface FilterSortProps {
  filter: string;
  setFilter: (filter: string) => void;
  sort: 'asc' | 'desc';
  setSort: (sort: 'asc' | 'desc') => void;
}

const FilterSort: React.FC<FilterSortProps> = ({ filter, setFilter, sort, setSort }) => {
  return (
    <div className="flex space-x-2 mb-4">
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filtruj zadania"
        className="flex-grow p-2 border rounded-lg focus:outline-none"
      />
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as 'asc' | 'desc')}
        className="p-2 border rounded-lg focus:outline-none"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default FilterSort;
