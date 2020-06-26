import React, {useState} from 'react';
import {FlowForm} from '../../forms/flow.form';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import {useAPI} from 'common/hooks/api';
import flowsColumns from 'common/columns/Flows.column';
import KitsTable from '../../components/KitsTable';
import {Popconfirm, Button} from 'antd';
import {deleteFlow} from 'common/api/auth';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';
import {connect} from 'react-redux';

const FlowEmployeeScreen = ({currentPage}) => {
  const {data, loading, reload} = useAPI('/flows/', {});
  const [editingId, setEditingId] = useState(null);

  const cancelEditing = () => {
    setEditingId(null);
  };

  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => (currentPage - 1) * 5 + index + 1,
    },
    ...flowsColumns,
    {
      title: 'Action',
      key: 'operation',
      // fixed: 'right',
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
              api: deleteFlow,
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
      name: 'All Flows',
      key: 'allFlows',
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
      title="Flows"
      editingId={editingId}
      cancelEditing={cancelEditing}
      modalBody={FlowForm}
      modalWidth={50}
      expandHandleKey="kits"
      expandParams={{loading}}
      ExpandBody={KitsTable}
    />
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(FlowEmployeeScreen);
