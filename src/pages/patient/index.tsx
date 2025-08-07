import { useState, useMemo } from 'react';
import SearchBar from '../../components/shared/SearchBar';
import Divider from '../../components/shared/Divider';
import FilterDropdown from '../../components/shared/FilterDropdown';
import Pagination from '../../components/shared/Pagination';
import { useQuery } from '@apollo/client';
import { GET_PATIENTS } from '../../graphql/queries';
import { DEFAULT_PAGE_LIMIT } from '../../constants/pagination';
import { useDebounce } from '../../hooks/useDebounce';
import PatientTable from './components/PatientTable';
import AddPatientForm from './components/PatientFormModal';
import type { Patient } from '../../types';
import Button from '../../components/ui/Button';

const options = ['', 'active', 'inactive', 'pending'];

const PatientPage = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const { data, loading, error } = useQuery(GET_PATIENTS, {
    variables: {
      search: debouncedSearch,
      filter,
      offset: (page - 1) * DEFAULT_PAGE_LIMIT,
      limit: DEFAULT_PAGE_LIMIT,
    },
  });

  const patients = useMemo(() => data?.patients ?? [], [data?.patients]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching patients.</p>;

  function handleAddPatient(patient: Patient): void {
    console.log('🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶🌶');
    console.log('patient:', patient);
  }

  return (
    <>
      <div className="flex gap-4">
        <SearchBar value={search} onChange={setSearch} />
        <FilterDropdown value={filter} onChange={setFilter} options={options} />
        <Button onClick={() => setIsModalOpen(true)}>Add Patient</Button>
      </div>
      <Divider />
      <PatientTable patients={patients} />
      <Pagination
        page={page}
        onPageChange={setPage}
        hasNext={patients.length === DEFAULT_PAGE_LIMIT}
      />

      <AddPatientForm
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onSubmit={handleAddPatient}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default PatientPage;
