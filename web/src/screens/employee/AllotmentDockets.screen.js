import React, {useState, useEffect} from 'react';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import allotmentColumns from 'common/columns/Allotment.column';
import {DeliveredForm} from 'forms/delivered.form';
import {AllotmentMainForm} from 'forms/allotmentMain.form';
import {Popconfirm, Input, Button} from 'antd';
import {deleteHOC} from '../../hocs/deleteHoc';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {deleteAllotment} from 'common/api/auth';
import {loadAPI} from 'common/helpers/api';
import {DEFAULT_BASE_URL} from 'common/constants/enviroment';
import {useAPI} from 'common/hooks/api';
import {Link, useNavigate} from '@reach/router';
import Delete from 'icons/Delete';
import Edit from 'icons/Edit';
import Delivery from 'icons/Delivery';
import Document from 'icons/Document';
import {data} from 'jquery';

const {Search} = Input;

const AllotmentDocketsScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [deliveryId, setDeliveryId] = useState(null);
  const [csvData, setCsvData] = useState(null);
  const [reqData, setReqData] = useState([]);
  const [TN, setTN] = useState(null);
  const navigate = useNavigate();

  const {data: allotments, loading} = useAPI('/allotments-table/', {});

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
    ...allotmentColumns,
    {
      title: 'Docket',
      key: 'docket',
      render: (text, record) => {
        console.log(record);
        return (
          <Button type="primary">
            <Link
              to="../docket"
              state={{id: record.id}}
              key={record.id}
              style={{textDecoration: 'none'}}>
              View Docket
            </Link>
          </Button>
        );
      },
    },
    {
      title: 'Action',
      key: 'operation',
      width: '9vw',
      render: (text, record) => (
        <div className="row justify-evenly">
          <a
            // href={DEFAULT_BASE_URL + `/delivered-docket/?pk=${record.id}`}
            target="_blank"
            rel="noopener noreferrer">
            <Button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: '1px',
              }}
              // disabled={!record.document}
              onClick={async (e) => {
                const {data: req} = await loadAPI(
                  DEFAULT_BASE_URL + `/delivered-docket/?pk=${record.id}`,
                  {},
                );
                if (req) if (req.document) navigate(req['document']);
                e.stopPropagation();
              }}>
              <Document color={record.document ? '#7CFC00' : null} />
            </Button>
          </a>
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              setTN(record.transaction_no);
              setDeliveryId(record.id);
              e.stopPropagation();
            }}>
            <Delivery color={record.is_delivered ? '#7CFC00' : null} />
          </Button>
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              console.log(record.id);
              setEditingId(record.id);
              e.stopPropagation();
            }}>
            <Edit />
          </Button>
          <Popconfirm
            title="Confirm Delete"
            onCancel={(e) => e.stopPropagation()}
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteAllotment,
              success: 'Deleted kit successfully',
              failure: 'Error in deleting kit',
            })}>
            <Button
              style={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: 'none',
                padding: '1px',
              }}
              onClick={(e) => e.stopPropagation()}>
              <Delete />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All Allotment Dockets',
      key: 'allAllotmentDockets',
      data: filteredData,
      columns,
      loading,
    },
  ];

  const cancelEditing = () => {
    setEditingId(null);
    setDeliveryId(null);
  };

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
        title="Allotment Dockets"
        modalBody={deliveryId ? DeliveredForm : AllotmentMainForm}
        modalWidth={60}
        editingId={editingId || deliveryId}
        formParams={{transaction_no: TN}}
        cancelEditing={cancelEditing}
        hideRightButton
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(AllotmentDocketsScreen);
