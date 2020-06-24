export default [
  {
    title: 'Sr. No.',
    key: 'no.',
    render: (record, text, index) => index + 1,
  },
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
    title: 'Flow Days',
    key: 'flow_days',
    dataIndex: 'flow_days',
  },
  {
    title: 'Sender Client',
    key: 'sender_client',
    dataIndex: 'sender_client',
  },
  {
    title: 'Receiver Client',
    key: 'receiver_client',
    dataIndex: 'receiver_client',
  },
];
