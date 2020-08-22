import React, {useState, useEffect} from 'react';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import allotmentColumns from 'common/columns/Allotment.column';
import {DeliveredForm} from 'forms/delivered.form';
import {Popconfirm, Input, Button} from 'antd';
import {deleteHOC} from '../../hocs/deleteHoc';
import {AllotFlowTable} from 'components/AllotFlowExp';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {useAPI} from 'common/hooks/api';
import {Link} from '@reach/router';

const {Search} = Input;

const AllotmentDocketsScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [deliveryId, setDeliveryId] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [reqData, setReqData] = useState([]);
  const [TN, setTN] = useState(null);

  const {data: allotments, loading} = useAPI('/client-allotments/', {});

  const {filteredData, reload} = useTableSearch({
    searchVal,
    reqData: reqData,
  });

  useEffect(() => {
    if (allotments) {
      const reqD = allotments.map((alt) => ({
        id: alt.id,
        transaction_no: alt.transaction_no,
        parent_name: alt.sales_order.owner,
        dispatch_date: alt.dispatch_date,
        warehouse_name: alt.send_from_warehouse,
        model: alt.model,
        vehicle_number: alt.vehicle_number,
        transport_by: alt.transport_by,
        is_delivered: alt.is_delivered,
        flows: alt.flows,
      }));
      setReqData(reqD);
    }
  }, [allotments]);

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
    ...allotmentColumns,
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
        <div style={{width: '15vw', display: 'flex', alignItems: 'flex-end'}}>
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
        expandHandleKey="flows"
        ExpandBody={AllotFlowTable}
        expandParams={{loading}}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(AllotmentDocketsScreen);
