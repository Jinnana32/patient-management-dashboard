import React from 'react';
import Spinner from '../../../components/ui/Spinner';
import type { Patient } from '../../../types';

type PatientTableProps = {
  patients: Patient[];
  isLoading?: boolean;
};

const PatientTable: React.FC<PatientTableProps> = React.memo(
  ({ patients, isLoading = false }) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Gender</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Date of Birth</th>
              <th className="px-4 py-2">Last Visit</th>
            </tr>
          </thead>
          <tbody>
            {!patients || isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  <Spinner size="lg" color="green" />
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{patient.name}</td>
                  <td className="px-4 py-2">{patient.gender}</td>
                  <td className="px-4 py-2">{patient.age}</td>
                  <td className="px-4 py-2 capitalize">{patient.status}</td>
                  <td className="px-4 py-2">{patient.email}</td>
                  <td className="px-4 py-2">{patient.phone}</td>
                  <td className="px-4 py-2">{patient.dateOfBirth}</td>
                  <td className="px-4 py-2">{patient.lastVisit}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
);

PatientTable.displayName = 'PatientTable';

export default PatientTable;
