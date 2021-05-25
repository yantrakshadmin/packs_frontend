import {ifNotStrReturnA} from '../helpers/mrHelper';

export const PFEPColumn = [
  {
    title: 'PFEP Number',
    key: 'pfepNo',
    dataIndex: 'pfep_no',
    width: '5vw',
    sorter: (a, b) => a.pfep_no - b.pfep_no,
    showSorterTooltip: false,
  },
  {
    title: 'Part Name',
    key: 'part_name',
    dataIndex: 'part_name',
    width: '8vw',
    sorter: (a, b) => ifNotStrReturnA(a.part_name).localeCompare(ifNotStrReturnA(b.part_name)),
    showSorterTooltip: false,
  },
  {
    title: 'Part Volume',
    key: 'volume_pm',
    dataIndex: 'volume_pm',
    width: '5vw',
    sorter: (a, b) => a.volume_pm - b.volume_pm,
    showSorterTooltip: false,
  },
  {
    title: 'Cycle Days',
    key: 'max_cycle_days',
    dataIndex: 'max_cycle_days',
    width: '5vw',
    sorter: (a, b) => a.max_cycle_days - b.max_cycle_days,
    showSorterTooltip: false,
  },
];

export const SCSColumn = [
  {
    title: 'SCS Number',
    key: 'scsNo',
    dataIndex: 'scs_no',
    width: '5vw',
    sorter: (a, b) => a.scs_no - b.scs_no,
    showSorterTooltip: false,
  },
  {
    title: 'Lead Number',
    key: 'leadNo',
    render: (text, record) => {
      return record.lead_no.lead_no;
    },
    width: '5vw',
    sorter: (a, b) => a.lead_no.lead_no - b.lead_no.lead_no,
    showSorterTooltip: false,
  },
  {
    title: 'Client',
    key: 'client',
    render: (text, record) => {
      return record.lead_no.company_name;
    },
    width: '10vw',
    sorter: (a, b) =>
      ifNotStrReturnA(a.lead_no.company_name).localeCompare(
        ifNotStrReturnA(b.lead_no.company_name),
      ),
    showSorterTooltip: false,
  },
  {
    title: 'Part Name',
    key: 'part_name',
    dataIndex: 'part_name',
    width: '8vw',
    sorter: (a, b) => ifNotStrReturnA(a.part_name).localeCompare(ifNotStrReturnA(b.part_name)),
    showSorterTooltip: false,
  },
  {
    title: 'Part Number',
    key: 'part_number',
    dataIndex: 'part_number',
    width: '5vw',
    sorter: (a, b) => a.part_number - b.part_number,
    showSorterTooltip: false,
  },
  {
    title: 'Contact Person',
    key: 'contact_person',
    dataIndex: 'contact_person',
    width: '5vw',
    sorter: (a, b) => a.contact_person - b.contact_person,
    showSorterTooltip: false,
  },
];
