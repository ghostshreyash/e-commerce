// components/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ user, onLogout }) => {
  return (
    <div className="flex flex-col min-h-screen">
    
      <Navbar user={user} onLogout={onLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
