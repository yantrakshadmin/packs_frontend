import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useTableSearch = ({
  searchVal,
  retrieve,
  reqData,
  retrieveParams,
  usePaginated = true,
  // useCompanyIdAndViewType,
  pageSize = 10
}) => {
  const [paginationData, setPaginationData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [filteredData, setFilteredData] = useState([]);
  const [origData, setOrigData] = useState(null);
  const [searchIndex, setSearchIndex] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [hasPermission, setHasPermission] = useState(true);

  const { user, page } = useSelector((s) => s);
  const { currentPage } = page;

  useEffect(() => {
    setLoading(true);
    const crawl = (d, allValues) => {
      if (!allValues) allValues = [];
      for (const key in d) {
        if (typeof d[key] === 'object') crawl(d[key], allValues);
        else allValues.push(`${d[key]} `);
      }
      return allValues;
    };
    const fetchData = async () => {
      let fullData = null;
      if (!reqData && retrieve) {
        const { data, status } = await retrieve(
          {
            // ...(useCompanyIdAndViewType && { viewType, companyId }),
            ...(usePaginated && { page: currentPage, pageSize }),
            ...retrieveParams,
          } || null
        );
        if (status === 403) {
          setHasPermission(false);
        } else {
          fullData = data;
          if (usePaginated) {
            setPaginationData(data)
          }
          setOrigData(usePaginated ? data?.results || []: data);
          setFilteredData(usePaginated ? data?.results || [] :data);
          setHasPermission(true);
        }
      } else {
        fullData = reqData;
        if (usePaginated) {
          setPaginationData(reqData)
        }
        setOrigData(usePaginated ? reqData?.results || [] : reqData);
        setFilteredData(usePaginated ? reqData?.results || [] : reqData);
      }
      if (fullData) {
        const searchInd = ( usePaginated?  fullData?.results || []: fullData || []).map((d) => {
          const allValues = crawl(d);
          return { allValues: allValues.toString() };
        });
        setSearchIndex(searchInd);
        setLoading(false);
      }
    };
    fetchData();
  }, [refresh, retrieve, reqData, currentPage, pageSize]);

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

  return { filteredData, loading, reload, hasPermission, paginationData };
};
