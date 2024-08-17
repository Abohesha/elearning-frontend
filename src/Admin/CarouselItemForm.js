import React, { useState } from 'react';
import axios from 'axios';

function CarouselItemForm({ setCarouselItems }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = async () => {
    if (!image) return '';
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data.imageUrl;  // Return the uploaded image URL
    } catch (error) {
      console.error('Error uploading image', error);
      return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await handleImageUpload();
    if (!imageUrl) return;

    try {
      const newItem = { title, description, imageUrl };
      const response = await axios.post('http://localhost:5000/api/carousel-items', newItem);
      setCarouselItems((prevItems) => [...prevItems, response.data]);
      setTitle('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Error adding carousel item', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">Add Carousel Item</h3>
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
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600"
      >
        Add Carousel Item
      </button>
    </form>
  );
}

export default CarouselItemForm;
