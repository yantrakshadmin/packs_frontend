import moment from 'moment';

export default [
  {
    title: 'Sr. No.',
    key: 'no.',
    render: (record, text, index) => index + 1,
  },
  {
    title: 'Transaction Type',
    key: 'transaction_type',
    dataIndex: 'transaction_type',
  },
  {
    
    title: 'Transaction No.',
    key: 'transaction_no',
    dataIndex: 'transaction_no',
  },
  {
    title: 'Created On',
    key: 'created_on',
    sorter: (a, b) => moment(a.created_on).unix() - moment(b.created_on).unix(),
    render: (text, record) => {
      return moment(record.created_on).format('DD/MM/YYYY');
    },
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
  },
  {
    title: 'Remarks',
    key: 'remarks',
    dataIndex: 'remarks',
  },
  {
    title: 'Criticality',
    key: 'criticality',
    dataIndex: 'criticality',
  },
];
