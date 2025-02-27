import React from 'react';

interface FilterSortProps {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  query: string;
  setQuery: (query: string) => void;
}

const FilterSort: React.FC<FilterSortProps> = ({ filterStatus, setFilterStatus, query, setQuery }) => {
  return (
    <div className="flex flex-col space-y-3 border-t pt-3 mt-3 text-gray-600 text-sm">
      {/* Pole wyszukiwania */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      />

      {/* Filtry statusu */}
      <div className="flex space-x-2">
        <button
          onClick={() => setFilterStatus('All')}
          className={`flex-1 px-2 py-1 border rounded text-center ${
            filterStatus === 'All' ? 'border-gray-500 bg-gray-200' : 'border-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterStatus('Active')}
          className={`flex-1 px-2 py-1 border rounded text-center ${
            filterStatus === 'Active' ? 'border-gray-500 bg-gray-200' : 'border-gray-300'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilterStatus('Completed')}
          className={`flex-1 px-2 py-1 border rounded text-center ${
            filterStatus === 'Completed' ? 'border-gray-500 bg-gray-200' : 'border-gray-300'
          }`}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default FilterSort;
