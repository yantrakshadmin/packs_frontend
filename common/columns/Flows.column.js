import {ifNotStrReturnA} from '../helpers/mrHelper';

export default [
  {
    title: 'Flow Name',
    key: 'flow_name',
    dataIndex: 'flow_name',
    sorter: (a, b) => ifNotStrReturnA(a.flow_name).localeCompare(ifNotStrReturnA(b.flow_name)),
    showSorterTooltip: false,
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
    sorter: (a, b) => ifNotStrReturnA(a.flow_type).localeCompare(ifNotStrReturnA(b.flow_type)),
    showSorterTooltip: false,
  },
  {
    title: 'Status',
    key: 'active',
    render: (text, record) => {
      return record.active ? 'Active' : 'Inactive';
    },
    dataIndex: 'active',
    sorter: (a, b) =>
      (a.active ? 'Active' : 'Inactive').localeCompare(b.active ? 'Active' : 'Inactive'),
    showSorterTooltip: false,
  },
];
