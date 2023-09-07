import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { Sick } from '../types';
import { httpClient } from '../api/Http';
import { MAXIMUM_ITEM, ARROW_DOWN, ARROW_UP, DEBOUNCE_TERM } from '../constant';
import { useDebounce } from '../hooks/useDebounce';

const SearchContext = createContext<{
  isFocus: boolean;
  searchWord: string;
  keyword: Sick[];
  activeIndex: number;
  inputValue: string;
}>({
  isFocus: false,
  searchWord: '',
  keyword: [],
  activeIndex: -1,
  inputValue: '',
});

const SearchContextChange = createContext<{
  changeFocus: React.FocusEventHandler<HTMLInputElement>;
  changeSearchWord: React.ChangeEventHandler<HTMLInputElement>;
  changeActiveIndex: React.KeyboardEventHandler<HTMLInputElement>;
}>({
  changeFocus: () => {},
  changeSearchWord: () => {},
  changeActiveIndex: () => {},
});

export const useSearchContext = () => useContext(SearchContext);
export const useSearchContextChange = () => useContext(SearchContextChange);

export function SearchContextProvider({ children }: { children: ReactNode }) {
  const [isFocus, setFocus] = useState(false);
  const [searchWord, setSearchWord] = useState('');
  const [inputValue, setInputValue] = useState(searchWord);
  const [keyword, setKeyword] = useState<Sick[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debouncedValue = useDebounce(searchWord, DEBOUNCE_TERM);

  useEffect(() => {
    setActiveIndex(-1);
  }, [keyword, setActiveIndex]);

  useEffect(() => {
    const getData = async () => {
      if (debouncedValue.length === 0) {
        return setKeyword([]);
      }

      const result = await httpClient.getDataByQuery(debouncedValue);
      setKeyword(result.slice(0, MAXIMUM_ITEM));
    };

    getData();
  }, [debouncedValue]);

  const changeFocus = useCallback(() => {
    setFocus(prev => !prev);
  }, [setFocus]);

  const changeSearchWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSearchWord(event.target.value);
  };

  const changeActiveIndex = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (keyword.length === 0) return;
      switch (event.key) {
        case ARROW_UP: {
          event.preventDefault();
          setActiveIndex(prevIndex => {
            const newIndex = prevIndex === -1 ? keyword.length - 1 : prevIndex - 1;
            const newSearchText = newIndex === -1 ? searchWord : keyword[newIndex].sickNm;
            setInputValue(newSearchText);
            return newIndex;
          });
          break;
        }
        case ARROW_DOWN: {
          event.preventDefault();
          setActiveIndex(prevIndex => {
            const newIndex = prevIndex === keyword.length - 1 ? -1 : prevIndex + 1;
            const newSearchText = newIndex === -1 ? searchWord : keyword[newIndex].sickNm;
            setInputValue(newSearchText);
            return newIndex;
          });
          break;
        }
        default: {
          break;
        }
      }
    },
    [keyword],
  );

  return (
    <SearchContext.Provider value={{ isFocus, searchWord, keyword, activeIndex, inputValue }}>
      <SearchContextChange.Provider value={{ changeFocus, changeSearchWord, changeActiveIndex }}>
        {children}
      </SearchContextChange.Provider>
    </SearchContext.Provider>
  );
}
