import { useState, useEffect } from 'react';

export const useTableSearch = ({ searchVal, retrieve, reqData }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [origData, setOrigData] = useState(null);
  const [searchIndex, setSearchIndex] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setLoading(true);
    const crawl = (d, allValues) => {
      if (!allValues) allValues = [];
      for (const key in d) {
        if (typeof d[key] === 'object') crawl(d[key], allValues);
        else allValues.push(`${d[key]  } `);
      }
      return allValues;
    };
    const fetchData = async () => {
      let fullData = null;
      if (!reqData && retrieve) {
        const { data } = await retrieve();
        fullData = data;
        setOrigData(data);
        setFilteredData(data);
      } else {
        fullData = reqData;
        setOrigData(reqData);
        setFilteredData(reqData);
      }
      if (fullData) {
        const searchInd = fullData.map((d) => {
          const allValues = crawl(d);
          return { allValues: allValues.toString() };
        });
        setSearchIndex(searchInd);
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh, retrieve, reqData]);

  useEffect(() => {
    if (searchVal) {
      const reqData = searchIndex.map((d, index) => {
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
  }, [searchVal, origData, searchIndex]);

  const reload = () => {
    setRefresh(refresh + 1);
    setFilteredData(origData);
  };

  return { filteredData, loading, reload };
};
