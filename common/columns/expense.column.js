import moment from 'moment';

export default [
  {
    title: 'Sr. No.',
    key: 'no.',
    render: (record, text, index) => index + 1,
  },
  {
    title: 'Invoice No.',
    key: 'invoice_number',
    dataIndex: 'invoice_number',
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
    title: 'Vendor',
    key: 'vendor',
    dataIndex: 'vendor',
  },
  {
    title: 'Amount',
    key: 'total_amount',
    dataIndex: 'total_amount',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
  },
];
