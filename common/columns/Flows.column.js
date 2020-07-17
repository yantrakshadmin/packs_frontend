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
    title: 'Flow Days',
    key: 'flow_days',
    dataIndex: 'flow_days',
  },
  {
    title: 'Sender Client',
    key: 'sender_client',
    render: (text, record) => record.sender_client.client_name,
  },
  {
    title: 'Receiver Client',
    key: 'receiver_client',
    render: (text, record) => record.receiver_client.name,
  },
];
