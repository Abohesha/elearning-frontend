import React from 'react';
import ManageTeachers from './ManageTeachers';
import ManageSubjects from './ManageSubjects';
import ManageCarouselItems from './ManageCarouselItems';

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Manage Teachers</h2>
          <ManageTeachers />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Manage Subjects</h2>
          <ManageSubjects />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Manage Carousel Items</h2>
          <ManageCarouselItems />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
