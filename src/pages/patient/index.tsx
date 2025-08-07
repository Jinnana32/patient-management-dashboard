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
import { useAddPatient } from '../../hooks/patient/useAddPatient';

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

  const { addPatient, loading: addPatientLoading } = useAddPatient({
    onSuccess: () => {
      alert('Patient added successfully');
    },
    onError: () => {
      alert('Error adding patient');
    },
  });

  console.log('🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌');
  console.log(':', addPatientLoading);

  const patients = useMemo(() => data?.patients ?? [], [data?.patients]);
  const isLoading = loading || addPatientLoading;

  if (error) return <p>Error fetching patients.</p>;

  const handleAddPatient = (patient: Patient) => addPatient(patient);

  return (
    <>
      <div className="flex gap-4">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={isLoading}
        />
        <FilterDropdown value={filter} onChange={setFilter} options={options} />
        <Button onClick={() => setIsModalOpen(true)}>Add Patient</Button>
      </div>
      <Divider />
      <PatientTable patients={patients} isLoading={loading} />
      {!loading && (
        <Pagination
          page={page}
          onPageChange={setPage}
          hasNext={patients.length === DEFAULT_PAGE_LIMIT}
        />
      )}

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
