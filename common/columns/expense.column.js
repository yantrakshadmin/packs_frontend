import moment from 'moment';

export default [
  {
    title: 'ID',
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: 'Invoice Date',
    key: 'invoice_date',
    sorter: (a, b) => moment(a.invoice_date).unix() - moment(b.invoice_date).unix(),
    render: (text, record) => {
      return moment(record.invoice_date).format('DD/MM/YYYY');
    },
  },
  {
    title: 'Transaction Type',
    key: 'transaction_type',
    dataIndex: 'transaction_type',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
  },
];
