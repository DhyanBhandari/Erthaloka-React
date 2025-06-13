import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Layout = ({ children }) => (
  <div
    className="min-h-screen w-full text-white bg-fixed bg-cover bg-center"
    style={{ backgroundImage: "url('/bg.jepg')" }}
  >
    <Navigation />
    <main className="bg-black/70 backdrop-blur-md rounded-xl m-4 p-4">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
