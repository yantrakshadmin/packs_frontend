import {useState, useEffect} from 'react';
import {retreiveFlows} from 'common/api/auth';

export const useControlledSelect = (id) => {
  
  const [data, setData] = useState(null);

  const {data:full} = await retreiveFlows()
  if(!id) {
    console.log('empty')
    return {data: full}
  }

  useEffect(() => {
    console.log('lol')
    const fetchKits = async () => {
    
        const {data} = await retreiveFlows();
        const reqFlow = data.filter((d) => d.id === id);
        const {kits} = reqFlow[0];
        const reqData = kits.map(({kit}) => kit);
        setData(reqData);
    }
    if(id)  fetchKits();
  }, [id]);

  return {data};
};
