export default [
  {
    title: 'Lead No.',
    key: 'lead_no',
    dataIndex: 'lead_no',
    width: '6vw',
    sorter: (a, b) => a.lead_no - b.lead_no,
    showSorterTooltip: false,
  },
  {
    title: 'Company Name',
    key: 'company_name',
    dataIndex: 'company_name',
    sorter: (a, b) => a.company_name.localeCompare(b.company_name),
    showSorterTooltip: false,
  },
  {
    title: 'Region',
    key: 'region',
    dataIndex: 'region',
    width: '6vw',
    sorter: (a, b) => a.region.localeCompare(b.region),
    showSorterTooltip: false,
  },
  {
    title: 'Email',
    key: 'email',
    dataIndex: 'email',
    width: '12vw',
  },
  {
    title: 'Company Address',
    key: 'address',
    dataIndex: 'address',
    sorter: (a, b) => a.address.localeCompare(b.address),
    showSorterTooltip: false,
  },
  {
    title: 'Pipeline Status',
    key: 'status',
    dataIndex: 'status',
    sorter: (a, b) => a.status.localeCompare(b.status),
    showSorterTooltip: false,
  },
  {
    title: 'Lead Owner',
    key: 'lead_owner',
    dataIndex: 'lead_owner',
    sorter: (a, b) => a.lead_owner.localeCompare(b.lead_owner),
    showSorterTooltip: false,
  },
  {
    title: 'Lead Source',
    key: 'lead_source',
    dataIndex: 'lead_source',
    sorter: (a, b) => a.lead_source.localeCompare(b.lead_source),
    showSorterTooltip: false,
  },
  {
    title: 'Industry',
    key: 'industry',
    dataIndex: 'industry',
    sorter: (a, b) => a.industry.localeCompare(b.industry),
    showSorterTooltip: false,
  },
];
