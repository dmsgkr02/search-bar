import React, { useEffect } from 'react';
import styled from 'styled-components';
import SearchItem from './SearchItem';
import { cacheApiServer } from '../../api/CacheApiServer';
import { Sick } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';

type Props = {
  searchWord: string;
  recommendKeyword: [];
  setRecommendKeyword: React.Dispatch<React.SetStateAction<[]>>;
  activeIndex: number;
};

const MAXIMUM_ITEM = 10;
const DEBOUNCE_TERM = 1000;

export default function SearchWordBox({
  searchWord,
  setRecommendKeyword,
  recommendKeyword,
  activeIndex,
}: Props) {
  const debouncedValue = useDebounce(searchWord, DEBOUNCE_TERM);

  useEffect(() => {
    const getData = async () => {
      const data = await cacheApiServer.getDataByQuery(debouncedValue);
      if (data.length > MAXIMUM_ITEM) {
        setRecommendKeyword(data.slice(0, MAXIMUM_ITEM));
      } else {
        setRecommendKeyword(data);
      }
    };

    getData();
  }, [debouncedValue, setRecommendKeyword]);

  return (
    <Container>
      <ContentDiv>
        <Title>추천 검색어</Title>
        {recommendKeyword.map((keyword: Sick, index) => {
          return (
            <SearchItem key={keyword.sickCd} word={keyword.sickNm} active={activeIndex === index} />
          );
        })}
      </ContentDiv>
    </Container>
  );
}

const Container = styled.div`
  background: white;
  margin-top: 10px;
  border-radius: 30px;
`;

const ContentDiv = styled.div`
  border-radius: 30px 30px 0 0;
  border: 1px solid lightgray;
  padding: 10px 0 0 0;
`;

const Title = styled.div`
  padding: 10px 20px;
`;
