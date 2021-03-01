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
    sorter: (a, b) => a.part_name.localeCompare(b.part_name),
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
