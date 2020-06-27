import {useState, useEffect} from 'react';
import {retrieveProducts} from 'common/api/auth';

export const useTableSearch = (searchVal) => {
  const [filteredData, setFilteredData] = useState([]);
  const [origData, setOrigData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await retrieveProducts();
      console.log(data);
      setOrigData(data);
      setFilteredData(data);
      const searchD = data.map((d) => {
        console.log(d);
        const allValues = Object.values(d);
        console.log(allValues);
        return {allValues: allValues.toString()};
      });
      setSearchData(searchD);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(searchVal);
    if (searchVal) {
      console.log(searchData);
      const reqData = searchData.map((d, index) => {
        console.log(d);
        if (d.allValues.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0)
          if (origData[index]) return origData[index];
      });
      setFilteredData(
        reqData.filter((d) => {
          if (d) return true;
          return false;
        }),
      );
      console.log(filteredData);
    } else setFilteredData(origData);
  }, [searchVal]);

  return {filteredData};
};
