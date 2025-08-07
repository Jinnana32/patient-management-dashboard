import React, { useState } from 'react';
import Modal from '../../../components/ui/Modal';
import type { Patient } from '../../../types';
import Button from '../../../components/ui/Button';

type Props = {
  onSubmit: (patient: Patient) => void;
  onClose: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const defaultFormData = {
  name: '',
  age: 10,
  gender: 'male' as const,
  condition: '',
  status: 'active' as const,
  email: '',
  phone: '',
  dateOfBirth: '',
  lastVisit: '',
};

const AddPatientForm: React.FC<Props> = ({
  onSubmit,
  onClose,
  isOpen,
  setIsOpen,
}) => {
  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(defaultFormData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-semibold">Add New Patient</h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border rounded px-3 py-2"
          required
        />

        <input
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          className="w-full border rounded px-3 py-2"
          required
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          placeholder="Condition"
          className="w-full border rounded px-3 py-2"
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>

        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
          required
        />

        <input
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border rounded px-3 py-2"
          required
        />

        <input
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          placeholder="Date of Birth"
          className="w-full border rounded px-3 py-2"
          required
        />

        <div className="flex justify-end gap-2">
          <Button type="button" onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPatientForm;
