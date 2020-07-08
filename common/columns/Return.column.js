export default [
  {
    title: 'Transaction No.',
    key: 'transaction_no',
    dataIndex: 'transaction_no',
  },
  {
    title: 'Transaction Type',
    key: 'transaction_type',
    dataIndex: 'transaction_type',
  },
  {
    title: 'Transaction Date',
    key: 'transaction_date',
    render: (text, record) => {
      return record.transaction_date.slice(0, 10).toString();
    },
  },
  {
    title: 'Vehicle Number',
    key: 'vehicle_number',
    dataIndex: 'vehicle_number',
  },
  {
    title: 'Transport By',
    key: 'transport_by',
    dataIndex: 'transport_by',
  },
];
