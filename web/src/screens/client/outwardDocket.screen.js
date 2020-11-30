import React, { useState, useEffect } from 'react';
import { Input, Button, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { useTableSearch } from 'hooks/useTableSearch';
import { Link } from '@reach/router';
import { useAPI } from 'common/hooks/api';
import { deleteFlow, deleteOutward } from 'common/api/auth';
import { outwardDocketColumn } from 'common/columns/outwardDocket.column';
import { loadAPI } from 'common/helpers/api';
import { DEFAULT_BASE_URL } from 'common/constants/enviroment';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import { OutwardDocketForm } from '../../forms/OutwardDocket.form';
import Edit from '../../icons/Edit';
import { deleteHOC } from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import Delivery from '../../icons/Delivery';
import { OutwardDeliveredDocketForm } from '../../forms/OutwardDeliveredDocket.form';
import Document from '../../icons/Document';

const { Search } = Input;

const OutwardDocketScreen = ({ currentPage }) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [reqData, setReqData] = useState(null);
  const [deliveryId, setDeliveryId] = useState(null);
  const [TN,setTN] = useState(null);
  const { data: outwards, loading,reload } = useAPI('/outwards/', {});
  console.log(outwards,'otwrds')
  const { filteredData, } = useTableSearch({
    searchVal,
    reqData,
  });

  useEffect(() => {
    if (outwards) {
      const reqD = outwards.map((ret) => ({
        ...ret,
      }));
      setReqData(reqD);
    }
  }, [outwards]);
  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title:'Transaction Date',
      dataIndex:'transaction_date',
      key:'transaction_date',
      render:(text)=>(
        <div>
          {text.slice(0, 10)}
        </div>
      )
    },
    {
      title:'Dispatch Date',
      dataIndex:'dispatch_date',
      key:'dispatch_date',
      render:(text)=>(
        <div>
          {text.slice(0, 10)}
        </div>
      )
    },
    {
      title:'Sending Location',
      dataIndex:'sending_location',
      key:'sending_location',
      width: 400,
      render:(location)=>(
        <div>
          {location.name}
          {' '}
          -
          {' '}
          {location.address}
        </div>
      )
    },
    ...outwardDocketColumn,
    // {
    //   title:'kit',
    //   dataIndex:'kit',
    //   key:'kit',
    //   render:(kit)=>(
    //     <div>
    //       {kit.kit_name}
    //       {' '}
    //       -
    //       {' '}
    //       {kit.kit_info}
    //     </div>
    //   )
    //
    // },
    {
      title: 'Docket',
      key: 'docket',
      render: (text, record) => {
        return (
          <Button type='primary'>
            <Link
              to={`../outward-docket/${record.id}`}
              state={{ id: record.id }}
              key={record.id}
              style={{ textDecoration: 'none' }}>
              View Docket
            </Link>
          </Button>
        );
      },
    },
    {
      title: 'Action',
      key: 'operation',
      width: '7vw',
      render: (text, record) => (
        <div className='row justify-evenly'>
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            // disabled={!record.document}
            onClick={async (e) => {
              const { data: req } = await loadAPI(
                `${DEFAULT_BASE_URL}/inward/?pk=${record.id}`,
                {},
              );
              if (req){
                if(req[0]){
                  if (req[0].document) {
                    window.open(req[0].document);
                  }}}
              e.stopPropagation();
            }}>
            <Document color={record.document ? '#7CFC00' : null} />
          </Button>
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
              setEditingId(record.id);
              e.stopPropagation();
            }}>
            <Edit />
          </Button>
          <Popconfirm
            title='Confirm Delete'
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteOutward,
              success: 'Deleted Outward Docket Successfully',
              failure: 'Error in deleting Outward Docket',
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
      name: 'All Return Dockets',
      key: 'allReturnDockets',
      data: filteredData,
      columns,
      loading,
    },
  ];

  const cancelEditing = () => {
    setEditingId(null);
    setTN(null)
    setDeliveryId(null);
  };

  const handleDone = () => {
    cancelEditing();
    reload();
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ width: '15vw', display: 'flex', alignItems: 'flex-end' }}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder='Search' enterButton />
        </div>
      </div>
      <br />
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        loading={loading}
        size='middle'
        editingId={editingId || deliveryId}
        title={deliveryId?'Delivered Docket ':'Outward Docket '}
        modalBody={deliveryId?OutwardDeliveredDocketForm:OutwardDocketForm}
        modalWidth={80}
        formParams={{ transaction_no: TN }}
        cancelEditing={cancelEditing}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(OutwardDocketScreen);
