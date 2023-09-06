import React from 'react';

type Props = {
  word: string;
};

export default function SearchItem({ word }: Props) {
  return <div>{word}</div>;
}
