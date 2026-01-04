import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-paper-light">
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;
