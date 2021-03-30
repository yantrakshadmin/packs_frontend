import {ifNotStrReturnA} from '../helpers/mrHelper';

export default [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
    sorter: (a, b) => ifNotStrReturnA(a.name).localeCompare(ifNotStrReturnA(b.name)),
    showSorterTooltip: false,
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
    sorter: (a, b) => ifNotStrReturnA(a.city).localeCompare(ifNotStrReturnA(b.city)),
    showSorterTooltip: false,
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
    sorter: (a, b) => ifNotStrReturnA(a.state).localeCompare(ifNotStrReturnA(b.state)),
    showSorterTooltip: false,
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
      return record.active ? 'Active' : 'Inactive';
    },
    dataIndex: 'active',
  },
];
