import React from 'react';
import Annoucements from '../Components/Annoucements';
import Categories from '../Components/Categories';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import NewsLetter from '../Components/NewsLetter';
import Products from '../Components/Products';
import Slider from '../Components/Slider';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Annoucements />
      <Slider />
      <Categories />
      <Products />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
