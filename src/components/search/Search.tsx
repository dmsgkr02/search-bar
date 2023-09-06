import React from 'react';
import { styled } from 'styled-components';
import SearchBar from './SearchBar';

type Props = {
  searchTitle: string;
};

export default function Search({ searchTitle }: Props) {
  return (
    <SearchContainer>
      <h2>{searchTitle}</h2>
      <SearchBar />
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  width: 100%;
  height: 500px;
  background-color: skyblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;
`;
