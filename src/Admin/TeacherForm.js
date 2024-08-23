import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDQhSnpynkj54_LFAWLFenQhUbJ4xiW_v4",
  authDomain: "elearning-1a781.firebaseapp.com",
  projectId: "elearning-1a781",
  storageBucket: "elearning-1a781.appspot.com",
  messagingSenderId: "96253078189",
  appId: "1:96253078189:web:db49824200eddc9eec7424",
  measurementId: "G-CNJJD5QLHM"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function TeacherForm({ setTeachers }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null); 
  const [rating, setRating] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    // Create a storage reference from Firebase storage
    const storageRef = ref(storage, `images/${file.name}`);

    try {
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);

      // Get the download URL for the uploaded file
      const fileUrl = await getDownloadURL(storageRef);

      console.log('Uploaded image URL:', fileUrl);
      setPhoto(fileUrl); // Set the photo URL
      setIsUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTeacher = { name, description, photo, rating }; // Include the photo URL

    try {
      const response = await axios.post('https://elearning-backend-gcsf.onrender.com/api/teachers', newTeacher);
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
        {isUploading && <p className="text-sm text-gray-500 mt-1">Uploading image...</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <input
          type="number"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          placeholder="Enter teacher rating"
          min="0"
          max="5"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600"
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Add Teacher'}
      </button>
    </form>
  );
}

export default TeacherForm;