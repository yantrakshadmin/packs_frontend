import moment from 'moment';

export default [
  {
    title: 'Sr. No.',
    key: 'no.',
    render: (record, text, index) => index + 1,
  },
  {
    title: 'Reference No.',
    key: 'reference_no',
    dataIndex: 'reference_no',
  },
  {
    title: 'Date',
    key: 'date',
    sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    render: (text, record) => {
      return moment(record.date).format('DD/MM/YYYY');
    },
  },
  {
    title: 'Warehouse',
    key: 'warehouse',
    dataIndex: 'warehouse',
  },
  {
    title: 'No of Entries',
    key: 'no_of_entries',
    render: (text, record) => {
      return record.items ? record.items.length : 0;
    },
  },
  {
    title: 'Quantity Adjusted',
    key: 'quantity_adjusted',
    render: (text, record) => {
      const {items} = record;
      if (items) {
        let s = 0;
        items.forEach((i) => {
          try {
            s = s + parseInt(i.quantity_adjusted);
          } catch (err) {}
        });
        return s;
      }
      return 0;
    },
  },
];
