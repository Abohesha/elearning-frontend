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

function CarouselItemForm({ setCarouselItems, onImageUploadSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setErrorMessage("Please select an image.");
      return;
    }

    if (!file.type.startsWith('image/')) {
      setErrorMessage("Only image files are allowed.");
      return;
    }

    setIsUploading(true);
    setErrorMessage('');

    const storageRef = ref(storage, `carousel-images/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(storageRef);

      console.log('Uploaded image URL:', fileUrl);
      setImage(fileUrl);
      setIsUploading(false);
      if (onImageUploadSuccess) {
        onImageUploadSuccess();
      }
      setSuccessMessage('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage('Error uploading image. Please try again.');
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      setErrorMessage("Please fill all fields and upload an image.");
      return;
    }

    const newItem = { title, description, imageUrl: image };

    try {
      const response = await axios.post('https://elearning-backend-gcsf.onrender.com/api/carousel-items', newItem);
      setCarouselItems((prevItems) => [...prevItems, response.data]);
      setTitle('');
      setDescription('');
      setImage(null);
      setSuccessMessage('Carousel item added successfully!');
    } catch (error) {
      console.error('Error adding carousel item', error);
      setErrorMessage('Error adding carousel item. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">Add Carousel Item</h3>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter carousel item title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter carousel item description"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
        <input
          type="file"
          className="mt-1 block w-full"
          onChange={handleImageUpload}
        />
        {isUploading && <p className="text-sm text-gray-500 mt-1">Uploading image...</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600"
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Add Carousel Item'}
      </button>
    </form>
  );
}

export default CarouselItemForm;