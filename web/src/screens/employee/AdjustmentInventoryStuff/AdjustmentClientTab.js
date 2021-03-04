import React, {useState, useEffect} from 'react';
import {AdjustmentClientForm} from 'forms/adjustmentClientInventory.form';
import AdjustmentClientTable from './AdjustmentClientTable';
import {Table, Row, Col, Spin} from 'antd';
import {useAPI} from 'common/hooks/api';

const ExpandTable = (props) => {
  const {data: table, loading, reload} = useAPI('clientadjust/');
  const {data: clients} = useAPI('/clients/', {});
  const {data: kits} = useAPI('/kits/', {});

  return (
    <>
      <AdjustmentClientForm clients={clients} kits={kits} reload={reload} />
      <AdjustmentClientTable data={table} loading={loading} />
    </>
  );
};

export default ExpandTable;
