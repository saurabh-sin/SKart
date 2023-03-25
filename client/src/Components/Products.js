import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { popularProducts } from '../data';
import Product from './Product';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(
          cat
            ? `https://gskartbygs.herokuapp.com/api/products?category=${cat}`
            : 'https://gskartbygs.herokuapp.com/api/products'
        );

        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [cat, filters, products]);

  useEffect(() => {
    if (sort == 'newest') {
      setFilteredProducts((prev) => {
        return [...prev].sort((a, b) => a.createdAt - b.createdAt);
      });
    } else if (sort == 'asc') {
      setFilteredProducts((prev) => {
        return [...prev].sort((a, b) => a.price - b.price);
      });
    } else {
      setFilteredProducts((prev) => {
        return [...prev].sort((a, b) => b.price - a.price);
      });
    }
  }, [sort]);

  // console.log(filteredProducts);
  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 12)
            .map((item) => <Product item={item} key={item._id} />)}
    </Container>
  );
};

export default Products;
