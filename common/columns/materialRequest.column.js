import moment from 'moment';

export default [
  {
    title: 'ID',
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: 'Delivery Required On',
    key: 'delivery_required_on',
    sorter: (a, b) => moment(a.delivery_required_on).unix() - moment(b.delivery_required_on).unix(),
    render: (text, record) => {
      return moment(record.delivery_required_on).format('DD/MM/YYYY');
    },
  },
];
