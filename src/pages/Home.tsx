import React from 'react';
import { SearchContextProvider } from '../context/SearchContext';
import SearchForm from '../components/SearchForm';

export default function HomeRe() {
  return (
    <SearchContextProvider>
      <SearchForm />
    </SearchContextProvider>
  );
}
