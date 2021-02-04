import moment from 'moment';

export default [
  {
    title: 'ID',
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: 'Month',
    key: 'delivery_month',
    sorter: (a, b) => moment(a.delivery_month).unix() - moment(b.delivery_month).unix(),
    showSorterTooltip: false,
    render: (text, record) => {
      return moment(record.delivery_month).format('DD/MM/YYYY');
    },
  },
  {
    title: 'Raised By',
    key: 'raised_by',
    dataIndex: 'raised_by',
    render: (text, record) => (record.raised_by ? record.raised_by : '-'),
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (text, record) => (record.status ? record.status : '-'),
  },
];
