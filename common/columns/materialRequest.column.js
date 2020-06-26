export default [
  {
    title: 'ID',
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: 'Delivery Required On',
    key: 'delivery_required_on',
    render: (text, record) => {
      const date = record.delivery_required_on;
      return date.slice(0, 10);
    },
  },
];
