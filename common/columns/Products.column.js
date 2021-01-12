export default [

  {
    title: 'Short Code',
    key: 'short_code',
    dataIndex: 'short_code',
  },
  {
    title: 'Description',
    key: 'description',
    dataIndex: 'description',
  },
  {
    title: 'Category',
    key: 'category',
    dataIndex: 'category',
  },
  {
    title: 'Price Per Unit',
    key: 'priceperunit',
    dataIndex: 'priceperunit',
    sorter: (a, b) => a.priceperunit - b.priceperunit,
  },
  {
    title: 'Height',
    key: 'height',
    dataIndex: 'height',
  },
  {
    title: 'Width',
    key: 'width',
    dataIndex: 'width',
  },
  {
    title: 'Length',
    key: 'length',
    dataIndex: 'length',
  },
  {
    title: 'Actual Weight',
    key: 'actual_weight',
    dataIndex: 'actual_weight',
  },
  {
    title: 'Status',
    key: 'active',
    render: (text, record) => {
      return record.active ? "Active" : "Inactive" ;
    },
    dataIndex: 'active',
  },
];
