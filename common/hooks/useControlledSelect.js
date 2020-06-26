import {useState, useEffect} from 'react';
import {retreiveFlows} from 'common/api/auth';

export const useControlledSelect = (id) => {
  console.log(id);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchKits = async () => {
      const {data} = await retreiveFlows();
      const reqFlow = data.filter((d) => d.id === id);
      const {kits} = reqFlow[0];
      const reqData = kits.map(({kit}) => kit);
      setData(reqData);
    };
    if (id) fetchKits();
  }, [id]);

  return {data};
};
