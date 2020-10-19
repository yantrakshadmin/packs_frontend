import React, { useState, useEffect } from 'react';
import { Input, Button, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { useTableSearch } from 'hooks/useTableSearch';
import { Link } from '@reach/router';
import { useAPI } from 'common/hooks/api';
import { deleteFlow, deleteOutward } from 'common/api/auth';
import { outwardDocketColumn } from 'common/columns/outwardDocket.column';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import { OutwardDocketForm } from '../../forms/OutwardDocket.form';
import Edit from '../../icons/Edit';
import { deleteHOC } from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';

const { Search } = Input;

const OutwardDocketScreen = ({ currentPage }) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [reqData, setReqData] = useState(null);
  const [deliveryId, setDeliveryId] = useState(null);

  const { data: outwards, loading } = useAPI('/outwards/', {});
  const { data } = useAPI('/edit-outward/1/');
  console.log(data,"edit data");
  const { filteredData, reload } = useTableSearch({
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
    {
      title:'kit',
      dataIndex:'kit',
      key:'kit',
      render:(kit)=>(
        <div>
          {kit.kit_name}
          {' '}
          -
          {' '}
          {kit.kit_info}
        </div>
      )

    },{
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
              success: 'Deleted Flow successfully',
              failure: 'Error in deleting flow',
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
        size='middle'
        editingId={editingId}
        title='Outward Docket'
        modalBody={OutwardDocketForm}
        modalWidth={80}
        cancelEditing={cancelEditing}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(OutwardDocketScreen);
