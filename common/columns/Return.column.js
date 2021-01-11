import moment from 'moment';

export default [
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
    sorter: (a, b) => moment(a.transaction_date).unix() - moment(b.transaction_date).unix(),
    render: (text, record) => {
      return moment(record.transaction_date).format('DD/MM/YYYY');
      // return moment(record.transaction_date).format('MMMM Do YYYY, h:mm:ss a');
    },
  },
  {
    title: 'Transport By',
    key: 'transport_by',
    dataIndex: 'transport_by',
  },
];
