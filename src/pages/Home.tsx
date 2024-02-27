import React from 'react';

import DefaultLayout from '../layout/DefaultLayout';
import { useRead } from '../hooks/rest'


const Home: React.FC = () => {
  const { data } = useRead('jobs')
  return (
    <DefaultLayout>
      <h1>{ JSON.stringify(data, null, 2) }</h1>
    </DefaultLayout>
  );
};

export default Home;
