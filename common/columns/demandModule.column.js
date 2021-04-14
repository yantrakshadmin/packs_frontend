import moment from 'moment';

export const getFullName = (fn, ln) => {
  if (fn && ln) {
    return `${fn} ${ln}`;
  }
  if (fn && !ln) {
    return fn;
  }
  if (!fn && ln) {
    return ln;
  }
  if (!fn && !ln) {
    return '-';
  }
};

export default [
  {
    title: 'ID',
    key: 'id',
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'Month',
    key: 'delivery_month',
    sorter: (a, b) => moment(a.delivery_month).unix() - moment(b.delivery_month).unix(),
    showSorterTooltip: false,
    render: (text, record) => {
      return moment(record.delivery_month).format('MMMM YYYY');
    },
  },
  {
    title: 'Raised By',
    key: 'raised_by',
    dataIndex: 'raised_by',
    render: (text, record) =>
      record.owner ? getFullName(record.owner.first_name, record.owner.last_name) : '-',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (text, record) => (record.status ? record.status : '-'),
  },
];
