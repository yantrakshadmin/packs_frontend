export default [
  {
    title: 'Flow Name',
    key: 'flow_name',
    dataIndex: 'flow_name',
  },
  {
    title: 'Flow Info',
    key: 'flow_info',
    dataIndex: 'flow_info',
  },
  {
    title: 'Flow Type',
    key: 'flow_type',
    dataIndex: 'flow_type',
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
