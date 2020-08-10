export default [
  {
    title: 'Transaction No.',
    key: 'transaction_no',
    dataIndex: 'transaction_no',
  },
  {
    title: 'Receiver Client',
    key: 'receiver_client',
    dataIndex: 'receiver_client',
  },
  {
    title: 'Warehouse',
    key: 'warehouse',
    dataIndex: 'warehouse',
  },
  {
    title: 'Flow',
    key: 'flow',
    dataIndex: 'flow',
  },
  {
    title: 'Transaction Date',
    key: 'transaction_date',
    render: (text, record) => {
      return record.transaction_date.slice(0, 10).toString();
    },
  },
  {
    title: 'Transport By',
    key: 'transport_by',
    dataIndex: 'transport_by',
  },
];
