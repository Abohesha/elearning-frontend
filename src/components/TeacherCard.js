import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const TeacherCard = ({ teacher }) => {
  // Ensure the image URL is correctly formed
  const imageUrl = teacher.photo && teacher.photo.startsWith('http')
    ? teacher.photo
    : `https://elearning-backend-gcsf.onrender.com${teacher.photo}`;

  console.log('TeacherCard Image URL:', imageUrl); // Log the image URL to confirm it's correct

  return (
    <div className="teacher-card bg-white p-4 rounded-lg shadow-md">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={teacher.name} 
          className="w-full h-40 object-cover rounded-md" 
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center">
          <span>No Image Available</span>
        </div>
      )}
      <h2 className="text-xl font-semibold mt-4">{teacher.name}</h2>
      {/*<p className="text-gray-800 mt-2">Rating: <StarRating rating={teacher.rating} /></p>*/}
      <h3 className="text-lg font-semibold mt-4">Subjects:</h3>
      <ul className="list-disc list-inside">
        {Array.isArray(teacher.subjects) && teacher.subjects.length > 0 ? (
          teacher.subjects.map((subject) => (
            <li key={subject._id}>{subject.name}</li>
          ))
        ) : (
          <li>No subjects available</li>
        )}
      </ul>
      <Link
        to={`/teacher/${teacher._id}`}
        className="mt-4 inline-block text-blue-500 hover:underline"
      >
        View Profile
      </Link>
    </div>
  );
};

export default TeacherCard;