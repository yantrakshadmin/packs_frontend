import moment from 'moment';

export const TestInventoryDetailColumn = [
  {
    title: 'Transaction Quantity',
    key: 'transaction_quantity',
    dataIndex: 'transaction_quantity',
  },
  {
    title: 'Balance Quantity',
    key: 'balance_quantity',
    dataIndex: 'balance_quantity',
  },
  {
    title: 'Type',
    key: 'type',
    dataIndex: 'type',
  },
];

export const TestSC2InventoryDetailColumn = [
  // {
  //   title: 'Client',
  //   key: 'client',
  //   dataIndex: 'client',
  // },
  // {
  //   title: 'Product',
  //   key: 'product',
  //   dataIndex: 'product',
  // },
  {
    title: 'Date',
    key: 'date',
    dataIndex: 'date',
    render: (date) => moment(date).format('L'),
  },
  {
    title: 'Transaction Quantity',
    key: 'transaction_quantity',
    dataIndex: 'transaction_quantity',
  },
  {
    title: 'Balance Quantity',
    key: 'balance_quantity',
    dataIndex: 'balance_quantity',
  },
  {
    title: 'Type',
    key: 'type',
    dataIndex: 'type',
  },
];
