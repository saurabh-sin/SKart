import styled from 'styled-components';
import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import { mobile } from '../responsive';

const Container = styled.div`
  height: 60vh;
  background-color: #2979ff;
  display: flex;
  flex-direction: column;
  justify-content: center !important;
  align-items: center !important;
  color: #fff;
`;
const Title = styled.h1`
  font-size: 70px;
  ${mobile({ fontSize: '60px' })}
  margin-bottom: 20px;
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  /* border: 1px solid lightgray; */
`;

const Input = styled.input`
  border: none !important;
  flex: 8;
  padding: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none !important;
  background-color: #eee;
  cursor: pointer;
  /* color: #fff; */
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
`;

const NewsLetter = () => {
  return (
    <Container>
      <Title>NewsLetter</Title>
      <Desc>Get Timely Updates from Us!</Desc>
      <InputContainer>
        <Input placeholder='Your Email Address' />
        <Button>
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default NewsLetter;
