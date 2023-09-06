import React from 'react';
import Glasses from './glasses.svg';
import styled from 'styled-components';

type Props = {
  word: string;
  active: boolean;
};

export default function SearchItem({ word, active }: Props) {
  return (
    <Container $active={active}>
      <Image src={Glasses} />
      {word}
    </Container>
  );
}

const Container = styled.div<{ $active?: boolean }>`
  display: flex;
  padding: 10px 0;
  background: ${props => (props.$active ? 'lightgray' : 'white')};
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  padding: 0 20px 0 10px;
`;
