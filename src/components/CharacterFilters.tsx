import { ChangeEvent } from 'react';

interface CharacterFiltersProps {
  searchName: string;
  statusFilter: string;
  onSearchChange: (_value: string) => void;
  onStatusChange: (_value: string) => void;
}

export default function CharacterFilters({
  searchName,
  statusFilter,
  onSearchChange,
  onStatusChange,
}: CharacterFiltersProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(e.target.value);
  };

  return (
    <div className="mb-4 space-y-3">
      <div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchName}
          onChange={handleSearchChange}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-colors duration-200 focus:border-rick-green focus:outline-none focus:ring-2 focus:ring-rick-green/20"
        />
      </div>
      <div>
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm transition-colors duration-200 focus:border-rick-green focus:outline-none focus:ring-2 focus:ring-rick-green/20"
        >
          <option value="">All statuses</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
    </div>
  );
}
