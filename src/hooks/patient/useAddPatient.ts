import { useMutation } from '@apollo/client';
import { GET_PATIENTS } from '../../graphql/queries';
import { ADD_PATIENT } from '../../graphql/mutations';
import type { Patient } from '../../types';

export const useAddPatient = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (patient: Patient) => void;
  onError?: (e: unknown) => void;
} = {}) => {
  const [mutate, { loading, error }] = useMutation(ADD_PATIENT, {
    onError,
    refetchQueries: [{ query: GET_PATIENTS }],
    onCompleted: (data) => {
      if (onSuccess) onSuccess(data.addPatient);
    },
  });

  const addPatient = async (input: Omit<Patient, 'id'>) => {
    try {
      const res = await mutate({ variables: { input } });
      return res.data?.addPatient;
    } catch (err) {
      if (onError) onError(err);
      return null;
    }
  };

  return { addPatient, loading, error };
};
