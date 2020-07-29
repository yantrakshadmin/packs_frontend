import moment from 'moment';

export default [
  {
    title: 'Sales Order ID',
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: 'Owner Name',
    key: 'owner_name',
    render: (text, record) => {
      return record.owner.first_name + ' ' + record.owner.last_name;
    },
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
