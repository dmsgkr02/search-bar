import React from 'react';
import { useSearchContext } from '../context/SearchContext';
import { Sick } from '../types';
import { styled } from 'styled-components';

export default function SearchList() {
  const { isFocus, keyword, activeIndex } = useSearchContext();

  return (
    <>
      {isFocus && keyword.length > 0 && (
        <Container>
          추천검색어
          <Ul>
            {keyword.map((sick: Sick, index: number) => {
              return (
                <Li key={sick.sickCd} $active={activeIndex === index}>
                  {sick.sickNm}
                </Li>
              );
            })}
          </Ul>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  width: 700px;
  border: 1px solid black;
  background-color: white;
  margin-top: 10px;
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0px;
`;
const Li = styled.li<{ $active?: boolean }>`
  border: 1px solid red;
  padding: 5px;
  border: 1px solid ${props => (props.$active ? 'white' : 'lightgray')};
  background: ${props => (props.$active ? 'lightgray' : 'white')};
`;
