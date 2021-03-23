import moment from 'moment';

export default [
  {
    title: 'Sr. No.',
    key: 'no.',
    render: (record, text, index) => index + 1,
  },
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
  },
  {
    title: 'Employee',
    key: 'emp',
    dataIndex: 'emp',
  },
];
