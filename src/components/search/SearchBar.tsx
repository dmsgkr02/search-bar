import React, { useState } from 'react';
import useToggle from '../../hooks/useToggle';
import SearchInputBox from './SearchInputBox';
import SearchWordBox from './SearchWordBox';
import styled from 'styled-components';
import useKeyEvent from '../../hooks/useKeyEvent';

export default function SearchBar() {
  const { toggle: isFocus, changeToggle: changeFocus } = useToggle(false);
  const [searchWord, setSearchWord] = useState('');
  const [recommendKeyword, setRecommendKeyword] = useState<[]>([]);
  const [activeIndex, onKeyListener] = useKeyEvent(recommendKeyword.length - 1, isFocus);

  return (
    <Container>
      <SearchInputBox
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        changeFocus={changeFocus}
        onKeyListener={onKeyListener}
      />
      {isFocus && (
        <SearchWordBox
          searchWord={searchWord}
          recommendKeyword={recommendKeyword}
          setRecommendKeyword={setRecommendKeyword}
          activeIndex={activeIndex}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 600px;
`;
