import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StarRating from './StarRating';

function TeacherProfile() {
  const { id } = useParams(); 
  const [teacher, setTeacher] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`https://elearning-backend-gcsf.onrender.com/api/teachers/${id}`);
        setTeacher(response.data);
      } catch (error) {
        setError('Teacher not found');
        console.error('Error fetching teacher data', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://elearning-backend-gcsf.onrender.com/api/teachers/${id}/comments`);
        setComments(response.data);
      } catch (error) {
        setError('Comments not found');
        console.error('Error fetching comments', error);
      }
    };

    fetchTeacher();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(`https://elearning-backend-gcsf.onrender.com/api/teachers/${id}/comments`, {
        text: newComment,
      });
      setComments((prevComments) => [...prevComments, response.data]);
      setNewComment(''); // Clear the comment input field after submission
    } catch (error) {
      console.error('Error posting comment', error);
    }
  };

  if (error) return <p>{error}</p>;
  if (!teacher) return <p>Loading...</p>;

  // Log the image URL to the console outside JSX
  console.log(teacher.photo ? `https://elearning-backend-gcsf.onrender.com${teacher.photo}` : '/path/to/default/image.jpg');

  return (
    <div className="teacher-profile p-6">
      <div className="teacher-details flex">
        <div className="flex-shrink-0">
          <img
            src={teacher.photo ? `https://elearning-backend-gcsf.onrender.com${teacher.photo}` : '/path/to/default/image.jpg'}
            alt={teacher.name}
            className="w-full h-auto max-w-sm object-cover rounded-md"
          />
        </div>
        <div className="ml-6">
          <h1 className="text-3xl font-semibold">{teacher.name}</h1>
          <p className="text-gray-600 mt-2">{teacher.description}</p>
          <div className="text-gray-800 mt-4">
            <StarRating rating={teacher.rating} /> 
          </div>
        </div>
      </div>

      <div className="comments-section mt-8">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment._id} className="bg-gray-100 p-4 rounded-md shadow">
              {comment.text}
            </li>
          ))}
        </ul>

        <form onSubmit={handleCommentSubmit} className="mt-6">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default TeacherProfile;