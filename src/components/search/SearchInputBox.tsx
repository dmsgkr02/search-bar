import React from 'react';
import styled from 'styled-components';
import Glasses from './glasses.svg';

type Props = {
  changeFocus: React.FocusEventHandler<HTMLInputElement>;
  searchWord: string;
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  onKeyListener: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function SearchInputBox({
  changeFocus,
  searchWord,
  setSearchWord,
  onKeyListener,
}: Props) {
  const handleSearchWord = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };

  return (
    <Container>
      <ImageDiv>
        <Image src={Glasses} alt="돋보기 이미지" />
      </ImageDiv>
      <Input
        type="text"
        onFocus={changeFocus}
        onBlur={changeFocus}
        placeholder="질환명을 입력해 주세요"
        value={searchWord}
        onChange={event => handleSearchWord(event)}
        onKeyDown={event => onKeyListener(event)}
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
`;

const Input = styled.input`
  border-radius: 30px;
  border: none;
  color: rgba(0, 0, 0, 0.8);
  height: 40px;
  height: 100%;
  padding: 0 10px;
  flex: 1;
  outline: none;
`;
const Button = styled.button`
  border-radius: 30px;
  background-color: lightblue;
  flex-basis: 60px;
  border: none;
  color: white;
  cursor: pointer;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
