import moment from 'moment';

export default [
  {
    title: 'Transaction Date',
    key: 'dispatch_date',
    sorter: (a, b) => moment(a.dispatch_date).unix() - moment(b.dispatch_date).unix(),
    render: (text, record) => {
      return moment(record.dispatch_date).format('DD/MM/YYYY');
    },
  },
  {
    title: 'Warehouse',
    key: 'warehouse_name',
    dataIndex: 'warehouse_name',
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
