import React from 'react';
import {dateFormatter} from '../helpers/dateFomatter';

export const outwardDocketColumn = [
  {
    title: 'Transaction Number',
    dataIndex: 'transaction_no',
    key: 'transaction_no',
  },
  // {
  //   title:'Quantity Parts',
  //   dataIndex:'quantity_parts',
  //   key:'quantity_parts'
  // },{
  //   title:'Quantity Kit',
  //   dataIndex:'quantity_kit',
  //   key:'quantity_kit'
  // },
  {
    title: 'Transporter',
    dataIndex: 'transporter_name',
    key: 'transporter_name',
  },
  {
    title: 'Vehicle Details',
    dataIndex: 'vehicle_details',
    key: 'vehicle_details',
  },
  {
    title: 'Invoice Number',
    dataIndex: 'invoice_number',
    key: 'invoice_number',
  },
];
