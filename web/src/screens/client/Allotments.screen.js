import React, {useState, useEffect} from 'react';
import allotmentColumns from 'common/columns/Allotment.column';
import {Input} from 'antd';
import moment from 'moment';
import ExpandTable from 'components/AllotmentsExpandTable';
import {connect, useSelector} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {useAPI} from 'common/hooks/api';
import {DEFAULT_BASE_URL} from 'common/constants/enviroment';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';

const {Search} = Input;

const AllotmentDocketsScreen = ({currentPage, isEmployee}) => {
  const [searchVal, setSearchVal] = useState(null);
  //const [csvData, setCsvData] = useState(null);
  const [reqData, setReqData] = useState([]);

  const user = useSelector((s) => s.user.userMeta.id);

  const {data: allotments, loading} = useAPI('/client-allotments/', {});

  const {filteredData, reload} = useTableSearch({
    searchVal,
    reqData,
  });

  useEffect(() => {
    if (allotments) {
      const reqD = allotments.map((alt) => ({
        id: alt.id,
        transaction_no: alt.transaction_no,
        //parent_name: alt.sales_order.owner,
        dispatch_date: alt.dispatch_date,
        warehouse_name: alt.send_from_warehouse,
        model: alt.model,
        vehicle_number: alt.vehicle_number,
        transport_by: alt.transport_by,
        is_delivered: alt.is_delivered,
        //flows: alt.flows,
      }));
      setReqData(reqD);
    }
  }, [allotments]);

  // useEffect(() => {
  //   if (reqData) {
  //     const csvd = [];
  //     reqData.forEach((d) => {
  //       const temp = {
  //         ...d,
  //         is_delivered: [d.is_delivered ? 'Yes' : 'No'],
  //         dispatch_date: moment(d.dispatch_date).format('DD-MM-YYYY'),
  //       };
  //       delete temp.flows;
  //       csvd.push(temp);
  //       d.flows.forEach((f) => {
  //         const aq = f.alloted_quantity;
  //         const temp1 = {
  //           ...f,
  //           kit: f.kit.kit_name,
  //           flow: f.flow.flow_name,
  //         };
  //         csvd.push(temp1);
  //         f.kit.products.forEach((p) => {
  //           const temp2 = {...p, quantity: p.quantity * aq};
  //           csvd.push(temp2);
  //         });
  //       });
  //     });
  //     setCsvData(csvd);
  //   }
  // }, [reqData]);

  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
    },
    // {
    //   title: 'Docket',
    //   key: 'docket',
    //   render: (text, record) => {
    //     console.log(record);
    //     return (
    //       <Button type="primary">
    //         <Link
    //           to="../docket"
    //           state={{id: record.id}}
    //           key={record.id}
    //           style={{textDecoration: 'none'}}>
    //           View Docket
    //         </Link>
    //       </Button>
    //     );
    //   },
    // },
    ...allotmentColumns.filter((a) => a.title != 'Parent Company'),
  ];

  const tabs = [
    {
      name: 'My Allotments',
      key: 'myAllotments',
      data: filteredData,
      columns,
      loading,
    },
  ];

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div style={{width: '15vw', display: 'flex', alignItems: 'flex-end', marginLeft: '10px'}}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder="Search" enterButton />
        </div>
      </div>
      <br />
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size="middle"
        title="My Allotments"
        hideRightButton
        //expandHandleKey="flows"
        ExpandBody={ExpandTable}
        //csvdata={csvData}
        //csvname="MyAllotments.csv"
        downloadLink={
          isEmployee ? null : `${DEFAULT_BASE_URL}client-allotment-reportsdownload?cname=${user}`
        }
        downloadLinkButtonTitle="Download Reports"
        //expandParams={{loading}}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(AllotmentDocketsScreen);
