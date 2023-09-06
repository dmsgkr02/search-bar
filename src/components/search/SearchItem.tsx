import React from 'react';

type Props = {
  word: string;
  active: boolean;
};

export default function SearchItem({ word, active }: Props) {
  return (
    <div>
      {word}
      {active && `:::::선택됨`}
    </div>
  );
}
