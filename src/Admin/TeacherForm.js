import React, { useState } from 'react';
import axios from 'axios';

function TeacherForm({ setTeachers }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null); 
  const [rating, setRating] = useState(0);

  // Add the handleImageUpload function here
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Uploaded image URL:', response.data.imageUrl); // Log the image URL
      setPhoto(response.data.imageUrl); // Set the photo URL
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTeacher = { name, description, photo, rating }; // Include the photo URL

    try {
      const response = await axios.post('http://localhost:5000/api/teachers', newTeacher);
      setTeachers((prevTeachers) => [...prevTeachers, response.data]);
      setName('');
      setDescription('');
      setPhoto(null);  // Reset photo after submission
      setRating(0);
    } catch (error) {
      console.error('Error adding teacher', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">Add Teacher</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter teacher name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter teacher description"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Photo</label>
        <input
          type="file"
          className="mt-1 block w-full"
          onChange={handleImageUpload}  // Handle file upload
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <input
          type="number"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          placeholder="Enter teacher rating"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600"
      >
        Add Teacher
      </button>
    </form>
  );
}

export default TeacherForm;