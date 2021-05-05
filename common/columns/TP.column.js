import {ifNotStrReturnA} from '../helpers/mrHelper';

export default [
  {
    title: 'TP ID',
    key: 'id',
    dataIndex: 'id',
    sorter: (a, b) => ifNotStrReturnA(a.id).localeCompare(ifNotStrReturnA(b.id)),
    showSorterTooltip: false,
  },
  {
    title: 'SCS ID',
    key: 'scs_no',
    render: (text, record) => {
      return record.scs.scs_no;
    },
    sorter: (a, b) => ifNotStrReturnA(a.scs.scs_no).localeCompare(ifNotStrReturnA(b.scs.scs_no)),
    showSorterTooltip: false,
  },
  {
    title: 'Part Name',
    key: 'part_name',
    render: (text, record) => {
      return record.scs.part_name;
    },
  },
  {
    title: 'Client',
    key: 'client',
    render: (text, record) => {
      return record.scs.lead_no.company_name;
    },
    sorter: (a, b) =>
      ifNotStrReturnA(a.scs.lead_no.company_name).localeCompare(
        ifNotStrReturnA(b.scs.lead_no.company_name),
      ),
    showSorterTooltip: false,
  },
];
