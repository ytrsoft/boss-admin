import DataTable from '../components/DataTable'

import React from 'react';

const Jobs: React.FC = (props: any) => {
  return (
    <DataTable name={props.name} />
  );
};

export default Jobs;