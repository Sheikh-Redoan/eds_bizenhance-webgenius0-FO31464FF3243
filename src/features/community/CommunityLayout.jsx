import React from 'react';
import { Outlet } from 'react-router-dom';

export const CommunityLayout = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Outlet />
    </div>
  );
};

export default CommunityLayout;
