import {useState, useEffect} from 'react';

export const useTableSearch = ({searchVal, retrieve, reqData}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [origData, setOrigData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setLoading(true);
    const crawl = (d, allValues) => {
      if (!allValues) allValues = [];
      for (var key in d) {
        if (typeof d[key] === 'object') crawl(d[key], allValues);
        else allValues.push(d[key] + ' ');
      }
      return allValues;
    };
    const fetchData = async () => {
      if (!reqData) {
        const {data} = await retrieve();
        setOrigData(data);
        setFilteredData(data);
      } else {
        setOrigData(reqData);
        setFilteredData(reqData);
      }
      const searchD = data.map((d) => {
        const allValues = crawl(d);
        return {allValues: allValues.toString()};
      });
      setSearchData(searchD);
      if (data) setLoading(false);
    };
    fetchData();
  }, [refresh, retrieve]);

  useEffect(() => {
    if (searchVal) {
      const reqData = searchData.map((d, index) => {
        if (d.allValues.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0) return origData[index];
        return null;
      });
      setFilteredData(
        reqData.filter((d) => {
          if (d) return true;
          return false;
        }),
      );
    } else setFilteredData(origData);
  }, [searchVal, origData, searchData]);

  const reload = () => {
    setRefresh(refresh + 1);
    setFilteredData(origData);
  };

  return {filteredData, loading, reload};
};
