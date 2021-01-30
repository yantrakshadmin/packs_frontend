import moment from 'moment';

export default [
  {
    title: 'ID',
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: 'Delivery Month',
    key: 'delivery_month',
    sorter: (a, b) => moment(a.delivery_month).unix() - moment(b.delivery_month).unix(),
    render: (text, record) => {
      return moment(record.delivery_month).format('DD/MM/YYYY');
    },
  },
];
