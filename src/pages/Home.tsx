import React from 'react';
import Search from '../components/search/Search';
import { SEARCH_TITLE } from '../constant';

export default function Home() {
  return <Search searchTitle={SEARCH_TITLE} />;
}
