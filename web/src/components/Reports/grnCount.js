import React, { useEffect,useState } from 'react';
import { useAPI } from 'common/hooks/api';
import TableWithTabHoc from '../../hocs/TableWithTab.hoc';

export const GrnCount = () => {
  const [filtered,setFiltered] = useState([])
  const { data,loading } = useAPI('grn-count/',{});
  const getFilteredArray=(obj)=>{
    return obj?Object.keys(obj).map(item=>({ product:item,quantity:obj[item] })):[];
  }
  useEffect(()=>{
    setFiltered(getFilteredArray(data))
  },[data])

  const tabs = [
    {
      name: 'GRN Count',
      key: 'grn-count',
      data: filtered,
      columns:[{
        dataIndex:'product',
        key:'product',
        name:'Product'
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
      title='GRN Count'
      hideRightButton
    />
  );
};

export default GrnCount;
