// src/components/Admin/ManageTeachers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherForm from './TeacherForm';

function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/teachers');
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching the teachers', error);
      }
    };

    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/teachers/${id}`);
      setTeachers(teachers.filter((teacher) => teacher._id !== id));
    } catch (error) {
      console.error('Error deleting teacher', error);
    }
  };

  return (
    <div>
      <TeacherForm setTeachers={setTeachers} />
      <ul className="mt-6 space-y-4">
        {teachers.map((teacher) => (
          <li
            key={teacher._id}
            className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow"
          >
            <div>
              <p className="text-lg font-semibold">{teacher.name}</p>
              <p className="text-sm text-gray-600">{teacher.description}</p>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(teacher._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageTeachers;
