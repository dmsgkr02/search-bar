import React from 'react';
import styled from 'styled-components';

type Props = {
  changeFocus: React.FocusEventHandler<HTMLInputElement>;
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
};

// const regExp = /^[ㄱ-ㅎ가-힣a-zA-Z]+$/;

export default function SearchInputBox({ changeFocus, searchWord, setSearchWord }: Props) {
  const handleSearchWord = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  return (
    <Container>
      <ImageDiv>검색</ImageDiv>
      <Input
        type="text"
        onFocus={changeFocus}
        onBlur={changeFocus}
        placeholder="질환명을 입력해 주세요"
        value={searchWord}
        onChange={event => handleSearchWord(event)}
      />
      <Button>검색</Button>
    </Container>
  );
}

const Container = styled.div`
  background: white;
  padding: 5px;
  border-radius: 30px;
  width: 100%;
  height: 60px;
  display: flex;
`;

const ImageDiv = styled.div`
  flex-basis: 30px;
  border-radius: 30px;
  border: 1px solid black;
`;

const Input = styled.input`
  border-radius: 30px;
  border: none;
  color: rgba(0, 0, 0, 0.8);
  height: 40px;
  height: 100%;
  padding: 0 10px;
  flex: 1;
`;
const Button = styled.button`
  border-radius: 30px;
  background-color: lightblue;
  flex-basis: 60px;
  border: none;
  color: white;
  cursor: pointer;
`;
