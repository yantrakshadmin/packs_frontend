import React from 'react';

export default [
  {
    title: 'Sales Order ID',
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: 'Owner Name',
    key: 'owner_name',
    render: (text, record) => {
      return record.owner.first_name + ' ' + record.owner.last_name;
    },
  },
  {
    title: 'Delivery Required On',
    key: 'delivery_required_on',
    render: (text, record) => {
      const date = record.delivery_required_on;
      return date.slice(0, 10);
    },
  },
];
