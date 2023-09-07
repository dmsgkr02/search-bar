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
      if (result.length > MAXIMUM_ITEM) {
        setKeyword(result.slice(0, MAXIMUM_ITEM));
      } else {
        setKeyword(result);
      }
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
      switch (event.key) {
        case ARROW_UP: {
          if (keyword.length > 0) {
            setActiveIndex(prev => {
              if (prev === -1) {
                setInputValue(keyword[keyword.length - 1].sickNm);
                return keyword.length - 1;
              }
              if (prev === 0) {
                setInputValue(searchWord);
              } else {
                setInputValue(keyword[prev - 1].sickNm);
              }
              return prev - 1;
            });
          }
          break;
        }
        case ARROW_DOWN: {
          setActiveIndex(prev => {
            if (prev >= keyword.length - 1) {
              setInputValue(searchWord);
              return -1;
            }
            setInputValue(keyword[prev + 1].sickNm);
            return prev + 1;
          });
          break;
        }
        default: {
          break;
        }
      }
    },
    [setActiveIndex, keyword, setInputValue, searchWord],
  );

  return (
    <SearchContext.Provider value={{ isFocus, searchWord, keyword, activeIndex, inputValue }}>
      <SearchContextChange.Provider value={{ changeFocus, changeSearchWord, changeActiveIndex }}>
        {children}
      </SearchContextChange.Provider>
    </SearchContext.Provider>
  );
}
