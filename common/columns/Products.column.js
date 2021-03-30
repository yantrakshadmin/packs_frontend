import {ifNotStrReturnA} from '../helpers/mrHelper';

export default [
  {
    title: 'Short Code',
    key: 'short_code',
    dataIndex: 'short_code',
    sorter: (a, b) => ifNotStrReturnA(a.short_code).localeCompare(ifNotStrReturnA(b.short_code)),
    showSorterTooltip: false,
  },
  {
    title: 'Description',
    key: 'description',
    dataIndex: 'description',
  },
  {
    title: 'Category',
    key: 'category',
    dataIndex: 'category',
    sorter: (a, b) => ifNotStrReturnA(a.category).localeCompare(ifNotStrReturnA(b.category)),
    showSorterTooltip: false,
  },
  {
    title: 'Price Per Unit',
    key: 'priceperunit',
    dataIndex: 'priceperunit',
    sorter: (a, b) => a.priceperunit - b.priceperunit,
  },
  {
    title: 'Height',
    key: 'height',
    dataIndex: 'height',
    sorter: (a, b) => a.height - b.height,
  },
  {
    title: 'Width',
    key: 'width',
    dataIndex: 'width',
    sorter: (a, b) => a.width - b.width,
  },
  {
    title: 'Length',
    key: 'length',
    dataIndex: 'length',
    sorter: (a, b) => a.length - b.length,
  },
  {
    title: 'Actual Weight',
    key: 'actual_weight',
    dataIndex: 'actual_weight',
    sorter: (a, b) => a.actual_weight - b.actual_weight,
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
