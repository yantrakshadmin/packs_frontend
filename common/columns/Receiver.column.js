export default [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'City',
    key: 'city',
    dataIndex: 'city',
  },
  {
    title: 'Address',
    key: 'address',
    dataIndex: 'address',
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
    title: 'Emitter',
    key: 'emitter',
    render: (text, record) => record.emitter.client_name,
  },
];
