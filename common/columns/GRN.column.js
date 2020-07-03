export default [
  {
    title: 'GRN ID',
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: 'Warehouse',
    key: 'warehouse',
    dataIndex: 'warehouse',
  },
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
    render: (text, record) => record.inward_date.slice(0, 10),
  },
];
