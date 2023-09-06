import React, { useEffect, useState } from 'react';
import useToggle from '../../hooks/useToggle';
import SearchInputBox from './SearchInputBox';
import SearchWordBox from './SearchWordBox';
import styled from 'styled-components';

export default function SearchBar() {
  const { toggle: isFocus, changeToggle: changeFocus } = useToggle(false);
  const [searchWord, setSearchWord] = useState('');

  return (
    <Container>
      <SearchInputBox
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        changeFocus={changeFocus}
      />
      {isFocus && <SearchWordBox searchWord={searchWord} />}
    </Container>
  );
}

const Container = styled.div`
  width: 600px;
`;
