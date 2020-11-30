import React, { useState } from 'react';
import materialRequestColumns from 'common/columns/materialRequest.column.js';
import { Popconfirm, Button, Input } from 'antd';
import { deleteMr, retrieveMrs } from 'common/api/auth';
import { connect } from 'react-redux';
import { useTableSearch } from 'hooks/useTableSearch';
import { MaterialRequestForm } from '../../forms/materialRequest.form';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import MaterialRequestsTable from '../../components/MaterialRequestsTable';
import { deleteHOC } from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';

const { Search } = Input;

const MaterialRequestEmployeeScreen = ({ currentPage }) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const { filteredData, loading, reload } = useTableSearch({ searchVal, retrieve: retrieveMrs });

  const cancelEditing = () => {
    setEditingId(null);
  };

  const columns = [
    ...materialRequestColumns,
    {
      title: 'Status',
      key: 'status',
      className: 'align-center',
      render: (text, record) => {
        if (record.is_allocated)
          return (
            <Button
              type='primary'
              style={{
                backgroundColor: '#48BB78',
                outline: 'none',
                border: 'none',
                borderRadius: '7%',
              }}
              onClick={(e) => e.stopPropagation()}>
              Allocated
            </Button>
          );
        return (
          <Button
            type='primary'
            style={{
              backgroundColor: 'red',
              outline: 'none',
              border: 'none',
              borderRadius: '7%',
              color: 'rgba(255,255,255,0.9)',
            }}
            onClick={(e) => e.stopPropagation()}>
            Pending
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
              api: deleteMr,
              success: 'Deleted Material Request successfully',
              failure: 'Error in deleting Material request',
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
      name: 'All Material Requests',
      key: 'allMaterialRequests',
      data: filteredData,
      columns,
      loading,
    },
  ];

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
        title='Material Requests'
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={MaterialRequestForm}
        modalWidth={50}
        expandHandleKey='flows'
        expandParams={{ loading }}
        ExpandBody={MaterialRequestsTable}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return { currentPage: state.page.currentPage };
};

export default connect(mapStateToProps)(MaterialRequestEmployeeScreen);
