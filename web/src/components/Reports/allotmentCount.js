import React, { useEffect,useState } from 'react';
import { useAPI } from 'common/hooks/api';
import TableWithTabHoc from '../../hocs/TableWithTab.hoc';

export const AllotmentCount = () => {
  const [filtered,setFiltered] = useState([])
  const { data,loading } = useAPI('allotment-count/',{});
  const getFilteredArray=(obj)=>{
    return obj?Object.keys(obj).map(item=>({ kit:item,quantity:obj[item] })):[];
  }
  useEffect(()=>{
    setFiltered(getFilteredArray(data))
  },[data])

  const tabs = [
    {
      name: 'Allotment Count',
      key: 'allotment-count',
      data: filtered,
      columns:[{
        dataIndex:'kit',
        key:'kit',
        name:'Kit'
      },{
        dataIndex:'quantity',
        key:'quantity',
        name:'Quantity'
      },],
      loading,
    },
  ];
  return (
    <TableWithTabHoc
      tabs={tabs}
      size='middle'
      title='Allotment Count'
      hideRightButton
    />
  );
};

export default AllotmentCount;
