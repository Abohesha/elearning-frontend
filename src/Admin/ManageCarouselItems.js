import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarouselItemForm from './CarouselItemForm';

function ManageCarouselItems() {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const response = await axios.get('https://elearning-backend-gcsf.onrender.com/api/carousel-items');
        setCarouselItems(response.data);
      } catch (error) {
        console.error('Error fetching the carousel items', error);
      }
    };

    fetchCarouselItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://elearning-backend-gcsf.onrender.com/api/carousel-items/${id}`);
      setCarouselItems(carouselItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting carousel item', error);
    }
  };

  return (
    <div>
      <CarouselItemForm setCarouselItems={setCarouselItems} />
      <ul className="mt-6 space-y-4">
        {carouselItems.map((item) => (
          <li
            key={item._id}
            className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow"
          >
            <div>
              <p className="text-lg font-semibold">{item.title}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageCarouselItems;
