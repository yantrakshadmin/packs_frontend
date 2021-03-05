import React, {useState, useEffect} from 'react';
import {AdjustmentClientForm} from 'forms/adjustmentClientInventory.form';
import AdjustmentClientTable from './AdjustmentClientTable';
import {Table, Row, Col, Spin} from 'antd';
import {useAPI} from 'common/hooks/api';
import {useTableSearch} from 'hooks/useTableSearch';
import {retrieveAdjustmentClients} from 'common/api/auth';

const ExpandTable = (props) => {
  //const {data: table, loading, reload} = useAPI('clientadjust/');

  const {filteredData, loading, reload} = useTableSearch({
    searchVal: props.searchVal,
    retrieve: retrieveAdjustmentClients,
  });

  const {data: clients} = useAPI('/clients/', {});
  const {data: kits} = useAPI('/kits/', {});

  return (
    <>
      <AdjustmentClientForm clients={clients} kits={kits} reload={reload} />
      <AdjustmentClientTable data={filteredData || []} loading={loading} />
    </>
  );
};

export default ExpandTable;
