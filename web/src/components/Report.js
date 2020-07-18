import React, {useState, useEffect} from 'react';
import * as FlexmonsterReact from 'react-flexmonster/hooks';
import {retrieveProducts} from 'common/api/auth';
import storage from 'redux-persist/lib/storage';

import 'flexmonster/flexmonster.css';

const Report = () => {
  const [reqData, setReqData] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const {data} = await retrieveProducts();
      console.log(typeof data);
      if (data) {
        setReqData(data);
        console.log(data);
      }
    };
    fetchProducts();
  }, []);

  return reqData ? (
    // <WebDataRocksReact.Pivot
    //   toolbar={true}
    //   report={{
    //     dataSource: {
    //       data: reqData,
    //     },
    //   slice: {
    //     rows: [
    //       {
    //         uniqueName: 'short_code',
    //       },
    //     ],
    //     columns: [
    //       {
    //         uniqueName: 'priceperunit',
    //       },
    //     ],
    //   },
    // }}
    <FlexmonsterReact.Pivot
      // ref={ref}
      toolbar={true}
      width="100%"
      report={{
        dataSource: {
          data: reqData,
        },
        slice: {
          rows: [{uniqueName: 'short_code'}, {uniqueName: '[Measures]'}],
          columns: [{uniqueName: 'Category'}],
          measures: [
            {
              uniqueName: 'priceperunit',
              aggregation: 'sum',
            },
          ],
        },
      }}
      // reportcomplete={onReportComplete}
    />
  ) : // report="https://cdn.webdatarocks.com/reports/report.json"
  // />
  null;
};

export default Report;
