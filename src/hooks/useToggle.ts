import { useState } from 'react';

export default function useFocus(defaultValue: boolean) {
  const [toggle, setToggle] = useState(defaultValue);

  const changeToggle = () => {
    setToggle(prev => !prev);
  };

  return {
    toggle,
    changeToggle,
  };
}
