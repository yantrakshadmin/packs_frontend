import moment from 'moment';

export default [
  {
    title: 'Transaction No.',
    key: 'transaction_no',
    dataIndex: 'transaction_no',
    sorter: (a, b) => a.transaction_no - b.transaction_no,
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
    sorter: (a, b) => moment(a.transaction_date).unix() - moment(b.transaction_date).unix(),
    render: (text, record) => {
      return moment(record.transaction_date).format('DD/MM/YYYY');
    },
  },
  {
    title: 'Transport By',
    key: 'transport_by',
    dataIndex: 'transport_by',
  },
];
