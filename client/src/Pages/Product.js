import { Add, Remove } from '@mui/icons-material';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Annoucements from '../Components/Annoucements';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import NewsLetter from '../Components/NewsLetter';
import { useLocation } from 'react-router-dom';
import { mobile } from '../responsive';
import axios from 'axios';
import { addProduct } from '../reducers/cart';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Review from '../Components/Review';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({
    padding: '10px',
    flexDirection: 'column',
  })}
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 85vh;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.5);
  object-fit: cover;
  border-radius: 6px;
  ${mobile({
    height: '40vh',
  })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({
    padding: '10px',
  })}
`;
const Title = styled.h1`
  font-weight: 400;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-size: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({
    width: '100%',
  })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({
    width: '100%',
  })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;
const Button = styled.button`
  padding: 15px;
  color: #fff;
  background-color: #2979ff;
  cursor: pointer;
  border: none;
  font-weight: 500;
  font-size: 14px;
`;

const Product = () => {
  const location = useLocation();

  const [productdetails, setProductDetails] = useState({});
  const [reviews, setReviews] = useState([]);

  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('black');
  const [size, setSize] = useState('S');

  const dispatch = useDispatch();

  const id = location.pathname.split('/')[2];
  //console.log(id);
  let date = useRef();

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        const { data } = await axios.get(
          `https://gskartbygs.herokuapp.com/api/products/find/${id}`
        );
        //console.log(data);
        date.current = data.reviews?.updatedAt;
        setProductDetails(data.product);
        setReviews(data.reviews?.reviews || []);
      } catch (error) {
        console.log(error);
      }
    };

    getProduct(id);
  }, [id]);

  const handleQuantity = (action) => {
    if (action == 'add') setQuantity(quantity + 1);
    else {
      quantity > 1 && setQuantity(quantity - 1);
    }
  };

  const handleCart = () => {
    // console.log('done');

    dispatch(
      addProduct({
        ...productdetails,
        quantity,
        color,
        size,
      })
    );

    toast.success('Added to Cart!');
  };

  if (Object.keys(productdetails).length == 0) return <h1>Loading....</h1>;
  else
    return (
      <Container>
        <Navbar />
        <Annoucements />
        <Wrapper>
          <ImageContainer>
            <Image src={productdetails.img} />
          </ImageContainer>
          <InfoContainer>
            <Title>{productdetails.title}</Title>
            <Desc>{productdetails.desc}</Desc>
            <Price>$ {productdetails.price}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {productdetails.color.map((color) => (
                  <FilterColor
                    key={color}
                    color={color}
                    onClick={() => setColor(color)}
                  />
                ))}
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize onChange={(e) => setSize(e.target.value)}>
                  {productdetails.size.map((size) => (
                    <FilterSizeOption key={size}>{size}</FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <Remove onClick={() => handleQuantity('remove')} />
                <Amount>{quantity}</Amount>
                <Add onClick={() => handleQuantity('add')} />
              </AmountContainer>
              <Button onClick={handleCart}>Add to Cart</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
        {reviews.length == 0 ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              background: 'orange',
              padding: '16px',

              borderRadius: '4px',
              fontWeight: 'bold',
            }}
          >
            No Reviews Yet!
          </div>
        ) : (
          <Review reviews={reviews} date={date.current} />
        )}

        <NewsLetter />
        <Footer />
      </Container>
    );
};

export default Product;
