import DataTable from '../components/DataTable'

import React from 'react';

const Companies: React.FC = (props: any) => {
  return (
    <DataTable name={props.name} />
  );
};

export default Companies;