export default [
  {
    title: 'Kit Name',
    key: 'kit_name',
    dataIndex: 'kit_name',
  },
  {
    title: 'Kit Type',
    key: 'kit_type',
    dataIndex: 'kit_type',
  },
  {
    title: 'Kit Info',
    key: 'kit_info',
    dataIndex: 'kit_info',
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
