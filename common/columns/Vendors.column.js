import {ifNotStrReturnA} from '../helpers/mrHelper';

export default [
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name',
    width: '16vw',
    sorter: (a, b) => ifNotStrReturnA(a.name).localeCompare(ifNotStrReturnA(b.name)),
    showSorterTooltip: false,
  },

  {
    title: 'Email',
    key: 'email',
    width: '16vw',
    dataIndex: 'email',
  },
  // {
  //   title: 'Payment Terms',
  //   key: 'payment_terms',
  //   dataIndex: 'payment_terms',
  // },
  // {
  //   title: 'Code',
  //   key: 'code',
  //   dataIndex: 'code',
  // },
  // {
  //   title: 'Remarks',
  //   key: 'remarks',
  //   dataIndex: 'remarks',
  // },
];
