import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeacherCard from './TeacherCard';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('https://elearning-backend-gcsf.onrender.com/api/teachers');
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="teacher-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {teachers.map((teacher) => (
        <TeacherCard key={teacher._id} teacher={teacher} />
      ))}
    </div>
  );
}

export default TeacherList;
