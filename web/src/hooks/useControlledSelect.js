import {useState, useEffect} from 'react';
import {retreiveFlows, retrieveKits} from 'common/api/auth';

export const useControlledSelect = (id) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchKits = async () => {
      if (id) {
        const {data} = await retreiveFlows();
        const reqFlow = data.filter((d) => d.id === id);
        const {kits} = reqFlow[0];
        const reqData = kits.map(({kit}) => kit);

        setData(reqData);
      } else {
        const {data} = await retrieveKits();
        setData(data);
      }
    };
    fetchKits();
  }, [id]);

  return {data};
};
