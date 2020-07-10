export default [
  {
    title: 'Kit Name',
    key: 'kit_name',
    dataIndex: 'kit_name',
  },
  {
    title: 'Kit Info',
    key: 'kit_info',
    dataIndex: 'kit_info',
  },
  {
    title: 'Components Per Kit',
    key: 'components_per_kit',
    dataIndex: 'components_per_kit',
  },
  {
    title: 'Kit Client',
    key: 'kit_client',
    render: (text, record) => record.kit_client.client_name,
  },
];
