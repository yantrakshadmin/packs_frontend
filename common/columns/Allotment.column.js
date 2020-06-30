export default [
  {
    title: 'Transaction No.',
    key: 'transaction_no',
    dataIndex: 'transaction_no',
  },
  {
    title: 'Parent Company',
    key: 'parent_name',
    dataIndex: 'parent_name',
  },
  {
    title: 'Transaction Date',
    key: 'dispatch_date',
    render: (text, record) => {
      return record.dispatch_date.slice(0, 10).toString();
    },
  },
  {
    title: 'Warehouse',
    key: 'warehouse_name',
    dataIndex: 'name',
  },
  {
    title: 'Model',
    key: 'model',
    dataIndex: 'model',
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
