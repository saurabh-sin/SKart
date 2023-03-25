import React from 'react';
import Avatar from 'react-avatar';
import './review.css';

const Review = ({ reviews, date }) => {
  console.log(reviews);
  return (
    <>
      <section id='testimonials'>
        {/* <!--heading---> */}
        <div className='testimonial-heading'>
          <span>Comments</span>
          <h4>Customers Says</h4>
        </div>
        {/* <!--testimonials-box-container------> */}
        <div className='testimonial-box-container'>
          {reviews.map((review) => {
            return (
              <div className='testimonial-box'>
                {/* <!--top-------------------------> */}
                <div className='box-top'>
                  {/* <!--profile-----> */}
                  <div className='profile'>
                    {/* <!--img----> */}
                    <div className='profile-img'>
                      {/* <img src={review.user.username} /> */}
                      <Avatar name={review.user.username} size={50} />
                    </div>
                    {/* <!--name-and-username--> */}
                    <div className='name-user'>
                      <strong>{review.user.username}</strong>
                      <span>@{review.user.email.split('@')[0]}</span>
                      <span>{date.split('T')[0]}</span>
                    </div>
                  </div>
                  {/* <!--reviews------> */}

                  <div className='reviews'>
                    {new Array(review.star).fill().map(() => {
                      return '⭐';
                    })}
                    {new Array(5 - review.star).fill().map(() => {
                      return '';
                    })}

                    {/* <!--Empty star--> */}
                  </div>
                </div>
                {/* <!--Comments----------------------------------------> */}
                <div className='client-comment'>
                  <p>{review.review}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Review;
