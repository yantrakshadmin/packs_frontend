import moment from 'moment';

export default [
  {
    title: 'Transaction No',
    key: 'transaction_no',
    dataIndex: 'transaction_no',
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
    title: 'From',
    key: 'send_from_warehouse',
    dataIndex: 'send_from_warehouse',
  },
  {
    title: 'To',
    key: 'receive_to_warehouse',
    dataIndex: 'receive_to_warehouse',
  },
  {
    title: 'Transporter Name',
    key: 'transporter_name',
    dataIndex: 'transporter_name',
  },
  {
    title: 'Driver Name',
    key: 'driver_name',
    dataIndex: 'driver_name',
  },
  {
    title: 'Driver Number',
    key: 'driver_number',
    dataIndex: 'driver_number',
  },
];
