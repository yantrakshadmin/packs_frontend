import {ifNotStrReturnA} from '../helpers/mrHelper';

export default [
  {
    title: 'Kit Name',
    key: 'kit_name',
    dataIndex: 'kit_name',
    sorter: (a, b) => ifNotStrReturnA(a.kit_name).localeCompare(ifNotStrReturnA(b.kit_name)),
    showSorterTooltip: false,
  },
  {
    title: 'Kit Type',
    key: 'kit_type',
    dataIndex: 'kit_type',
    sorter: (a, b) => ifNotStrReturnA(a.kit_type).localeCompare(ifNotStrReturnA(b.kit_type)),
    showSorterTooltip: false,
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
      return record.active ? 'Active' : 'Inactive';
    },
    dataIndex: 'active',
    sorter: (a, b) =>
      (a.active ? 'Active' : 'Inactive').localeCompare(b.active ? 'Active' : 'Inactive'),
    showSorterTooltip: false,
  },
];
