import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const TeacherCard = ({ teacher }) => {
  return (
    <div className="teacher-card bg-white p-4 rounded-lg shadow-md">
      <img src={`https://elearning-backend-gcsf.onrender.com${teacher.photo}`} alt="Uploaded" className="w-full h-40 object-cover rounded-md" />
      <h2 className="text-xl font-semibold mt-4">{teacher.name}</h2>
      <p className="text-gray-600 mt-2">{teacher.description}</p>
      <p className="text-gray-800 mt-2">Rating: {<StarRating rating={teacher.rating} />}</p>
      <h3 className="text-lg font-semibold mt-4">Subjects:</h3>
      <Link
        to={`/teacher/${teacher._id}`}
        className="mt-4 inline-block text-blue-500 hover:underline"
      >
        View Profile
      </Link>
      <ul className="list-disc list-inside">
        {Array.isArray(teacher.subjects) && teacher.subjects.length > 0 ? (
          teacher.subjects.map((subject) => (
            <li key={subject._id}>{subject.name}</li>
          ))
        ) : (
          <li>No subjects available</li>
        )}
      </ul>
    </div>
  );
};

export default TeacherCard;
