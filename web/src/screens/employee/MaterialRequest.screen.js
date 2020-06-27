import React, {useState} from 'react';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import MaterialRequestsTable from '../../components/MaterialRequestsTable';
import {useAPI} from 'common/hooks/api';
import materialEmployeecolumns from 'common/columns/materialEmployee.column';
import {Button} from 'antd';
import {connect} from 'react-redux';
// import Upload from '../../icons/Upload';
// import File from '../../icons/File';

const ReceiverClientEmployeeScreen = ({currentPage}) => {
  const {data, loading, reload} = useAPI('/allmrequest/', {});
  const [editingId, setEditingId] = useState(null);

  console.log(data);

  const columns = [
    ...materialEmployeecolumns,
    {
      title: 'Status',
      key: 'status',
      className: 'align-center',
      render: (text, record) => {
        if (record.is_allocated)
          return (
            <Button
              type="primary"
              style={{
                backgroundColor: '#00FF00',
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
            type="primary"
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
        return 'Pending';
      },
    },
    {
      title: 'Docket',
      key: 'docket',
      render: (text, record) => (
        <Button type="primary" disabled={!record.is_allocated}>
          View Docket
        </Button>
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

  const cancelEditing = () => setEditingId(null);

  return (
    <TableWithTabHOC
      rowKey={(record) => record.id}
      refresh={reload}
      tabs={tabs}
      size="middle"
      title="Material Requests"
      editingId={editingId}
      cancelEditing={cancelEditing}
      ExpandBody={MaterialRequestsTable}
      expandHandleKey="flows"
      hideRightButton
      expandParams={{loading}}
    />
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(ReceiverClientEmployeeScreen);
