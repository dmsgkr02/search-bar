import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchItem from './SearchItem';
import { cacheApiServer } from '../../api/CacheApiServer';
import { Sick } from '../../types';

type Props = {
  searchWord: string;
};

const MAXIMUM_ITEM = 10;

export default function SearchWordBox({ searchWord }: Props) {
  const [recommendKeyword, setRecommendKeyword] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await cacheApiServer.getDataByQuery(searchWord);
      if (data.length > MAXIMUM_ITEM) {
        setRecommendKeyword(data.slice(0, MAXIMUM_ITEM));
      } else {
        setRecommendKeyword(data);
      }
    };

    getData();
  }, [searchWord]);

  return (
    <Container>
      <ContentDiv>
        {recommendKeyword.map((keyword: Sick) => {
          return <SearchItem key={keyword.sickCd} word={keyword.sickNm} />;
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
  padding: 10px;
  border: 1px solid red;
  border-radius: 30px;
`;

const Hr = styled.hr`
  border: 1px solid lightgray;
  width: 100%;
`;
