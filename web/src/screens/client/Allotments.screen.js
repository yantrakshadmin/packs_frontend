import React, {useState, useEffect} from 'react';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import allotmentColumns from 'common/columns/Allotment.column';
import {DeliveredForm} from 'forms/delivered.form';
import {Popconfirm, Input, Button} from 'antd';
import moment from 'moment';
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

  useEffect(() => {
    if (reqData) {
      let csvd = [];
      reqData.forEach((d) => {
        let temp = {
          ...d,
          ['is_delivered']: [d['is_delivered'] ? 'Yes' : 'No'],
          ['dispatch_date']: moment(d['dispatch_date']).format('DD-MM-YYYY'),
        };
        delete temp['flows'];
        csvd.push(temp);
        d.flows.forEach((f) => {
          let kit = f['kit'].kit_name,
            aq = f.alloted_quantity;
          // let s = '';
          // for (let i = 1; i <= aq; i++) {
          //   s += `${d.transaction_no}-${kit}-${i}, `;
          // }
          // s = s.slice(0, -2);
          let temp1 = {
            ...f,
            ['kit']: f['kit'].kit_name,
            ['flow']: f['flow'].flow_name,
            // 'kits assigned': s
          };
          csvd.push(temp1);
          f.kit.products.forEach((p) => {
            let temp2 = {...p, ['quantity']: p['quantity'] * aq};
            csvd.push(temp2);
          });
        });
      });
      setCsvData(csvd);
    }
  }, [reqData]);

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
        csvdata={csvData}
        csvname="MyAllotments.csv"
        expandParams={{loading}}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(AllotmentDocketsScreen);
