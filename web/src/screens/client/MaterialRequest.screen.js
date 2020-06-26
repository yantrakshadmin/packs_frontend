import React, {useState} from 'react';
import {MaterialRequestForm} from '../../forms/materialRequest.form';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import {useAPI} from 'common/hooks/api';
import materialRequestColumns from 'common/columns/materialRequest.column.js';
import MaterialRequestsTable from '../../components/MaterialRequestsTable';
import {Popconfirm, Button} from 'antd';
import {deleteMr} from 'common/api/auth';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';
import {connect} from 'react-redux';

const MaterialRequestEmployeeScreen = ({currentPage}) => {
  const {data, loading, reload} = useAPI('/mrequets/', {});
  const [editingId, setEditingId] = useState(null);

  const cancelEditing = () => {
    setEditingId(null);
  };

  const columns = [
    // {
    //   title: 'Sr. No.',
    //   key: 'srno',
    //   render: (text, record, index) => (currentPage - 1) * 5 + index + 1,
    // },
    ...materialRequestColumns,
    {
      title: 'Action',
      key: 'operation',
      render: (text, record) => (
        <div className="row justify-evenly">
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
            title="Confirm Delete"
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteMr,
              success: 'Deleted Material Request successfully',
              failure: 'Error in deleting material request',
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
      data,
      columns,
      loading,
    },
  ];

  return (
    <TableWithTabHOC
      rowKey={(record) => record.id}
      refresh={reload}
      tabs={tabs}
      size="middle"
      title="Material Requests"
      editingId={editingId}
      cancelEditing={cancelEditing}
      modalBody={MaterialRequestForm}
      modalWidth={50}
      expandHandleKey="flows"
      expandParams={{loading}}
      ExpandBody={MaterialRequestsTable}
    />
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(MaterialRequestEmployeeScreen);
