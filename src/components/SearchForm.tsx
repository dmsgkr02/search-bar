import React from 'react';
import { useSearchContext, useSearchContextChange } from '../context/SearchContext';
import SearchList from './SearchList';
import { styled } from 'styled-components';
import { SEARCH_TITLE } from '../constant';

export default function SearchForm() {
  const { inputValue } = useSearchContext();
  const { changeFocus, changeSearchWord, changeActiveIndex } = useSearchContextChange();

  const onEnter = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    alert(inputValue);
  };

  return (
    <Container>
      <Content>
        <h2>{SEARCH_TITLE}</h2>
        <Form onSubmit={onEnter}>
          <Input
            type="text"
            onFocus={changeFocus}
            onBlur={changeFocus}
            value={inputValue}
            onChange={changeSearchWord}
            onKeyDown={changeActiveIndex}
          />
          <Button type="submit">검색</Button>
        </Form>
        <SearchList />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 500px;
  background-color: skyblue;
`;

const Content = styled.div`
  width: 700px;
  margin: auto;
  padding-top: 100px;
`;

const Form = styled.form`
  width: 700px;
  height: 50px;
  display: flex;
  margin: auto;
`;

const Input = styled.input`
  flex: 5;
`;

const Button = styled.button`
  flex: 1;
`;
