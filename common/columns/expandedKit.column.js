export default [
  //   {
  //     title: 'Sr. No.',
  //     key: 'no.',
  //     render: (record, text, index) => index + 1,
  //   },
  {
    title: 'Kit Name',
    key: 'kit_name',
    render: (text, record) => {
      return `${record.kit_name} - ${record.kit_info}`;
    },
  },
  {
    title: 'Quantity',
    key: 'quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Component PM',
    key: 'component_pm',
    dataIndex: 'component_pm',
  },
  {
    title: 'Trip Cost',
    key: 'trip_cost',
    dataIndex: 'trip_cost',
  },
];
