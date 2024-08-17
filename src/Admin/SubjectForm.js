import React, { useState } from 'react';
import axios from 'axios';

function SubjectForm({ setSubjects }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSubject = { name, description };
      const response = await axios.post('http://localhost:5000/api/subjects', newSubject);
      setSubjects((prevSubjects) => [...prevSubjects, response.data]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding subject', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">Add Subject</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter subject name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter subject description"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600"
      >
        Add Subject
      </button>
    </form>
  );
}

export default SubjectForm;
