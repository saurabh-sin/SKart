import React from 'react';
import Annoucements from '../Components/Annoucements';
import Navbar from '../Components/Navbar';
import NewsLetter from '../Components/NewsLetter';
import Footer from '../Components/Footer';
import './order.css';
import { Link, useLocation, useParams } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const products = location.state?.data;
  const { query } = useParams();

  //   console.log(products);

  return (
    <div>
      <Navbar />
      <Annoucements />
      {products.length == 0 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            background: 'orange',
            padding: '16px',

            borderRadius: '4px',
          }}
        >
          No Results found! 😥 Pls Do check your query!
        </div>
      ) : (
        <div id='wrap'>
          <h4 className='search-heading'>Search Results: {query}</h4>
          <div id='columns' className='columns_4'>
            {products.map((product) => {
              return (
                <figure key={product._id}>
                  <img src={product.img} alt='product' />
                  <figcaption>{product.title}</figcaption>
                  <span className='price'>${product.price}</span>
                  <p>{product.desc.slice(0, 30)}...</p>
                  <Link className='button' to={`/product/${product._id}`}>
                    Buy Now
                  </Link>
                </figure>
              );
            })}
          </div>
        </div>
      )}

      <NewsLetter />
      <Footer />
    </div>
  );
};

export default SearchResults;
