import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubjectForm from './SubjectForm';

function ManageSubjects() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/subjects');
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching the subjects', error);
      }
    };

    fetchSubjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/subjects/${id}`);
      setSubjects(subjects.filter((subject) => subject._id !== id));
    } catch (error) {
      console.error('Error deleting subject', error);
    }
  };

  return (
    <div>
      <SubjectForm setSubjects={setSubjects} />
      <ul className="mt-6 space-y-4">
        {subjects.map((subject) => (
          <li
            key={subject._id}
            className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow"
          >
            <div>
              <p className="text-lg font-semibold">{subject.name}</p>
              <p className="text-sm text-gray-600">{subject.description}</p>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(subject._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageSubjects;
