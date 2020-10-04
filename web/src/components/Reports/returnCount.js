import React, { useEffect,useState } from 'react';
import { useAPI } from 'common/hooks/api';
import TableWithTabHoc from '../../hocs/TableWithTab.hoc';

export const ReturnCount = () => {
  const [filtered,setFiltered] = useState([])
  const { data,loading } = useAPI('return-count/',{});
  const getFilteredArray=(obj)=>{
    return obj?Object.keys(obj).map(item=>({ kit:item,quantity:obj[item] })):[];
  }
  useEffect(()=>{
    setFiltered(getFilteredArray(data))
  },[data])

  const tabs = [
    {
      name: 'Return Count',
      key: 'return-count',
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
      title='Return Count'
      hideRightButton
    />
  );
};

export default ReturnCount;
