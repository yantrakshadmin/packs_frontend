import moment from 'moment';

export default [
  {
    title: 'Material Vendor',
    key: 'material_vendor',
    dataIndex: 'material_vendor',
  },
  {
    title: 'Transport Vendor',
    key: 'transport_vendor',
    dataIndex: 'transport_vendor',
  },
  {
    title: 'Reference No.',
    key: 'reference_no',
    dataIndex: 'reference_no',
  },
  {
    title: 'Invoice No.',
    key: 'invoice_no',
    dataIndex: 'invoice_no',
  },
  {
    title: 'Inward Date',
    key: 'inward_date',
    sorter: (a, b) => moment(a.inward_date).unix() - moment(b.inward_date).unix(),
    render: (text, record) => {
      return moment(record.inward_date).format('DD/MM/YYYY');
    },
  },
];
