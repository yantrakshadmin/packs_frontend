export default [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    key: 'email',
    dataIndex: 'email',
  },
  {
    title: 'Contact',
    key: 'contact',
    dataIndex: 'contact',
  },
  {
    title: 'Address',
    key: 'address',
    dataIndex: 'address',
  },
  {
    title: 'City',
    key: 'city',
    dataIndex: 'city',
  },
  {
    title: 'Pincode',
    key: 'pincode',
    dataIndex: 'pincode',
  },
  {
    title: 'State',
    key: 'state',
    dataIndex: 'state',
  },
  {
    title: 'PAN',
    key: 'pan',
    dataIndex: 'pan',
  },
  {
    title: 'GST',
    key: 'gst',
    dataIndex: 'gst',
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
