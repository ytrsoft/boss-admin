import DataTable from '../components/DataTable'

import React from 'react';

const Addresses: React.FC = (props: any) => {
  return (
    <DataTable name={props.name} />
  );
};

export default Addresses;
