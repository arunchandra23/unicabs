import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-4 text-center">
      &copy; {new Date().getFullYear()} Uni Cabs Services. All rights reserved.
    </footer>
  );
};

export default Footer;
