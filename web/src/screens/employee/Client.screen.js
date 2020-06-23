import React, {useState} from 'react';
import {ClientForm} from '../../forms/client.form';
import {TableWithTabHOC} from '../../hocs/TableWithTab.hoc';
import {useAPI} from 'common/hooks/api';
import clientColumns from 'common/columns/Clients.column';
import {Button} from 'antd';
import Edit from '../../icons/Edit';
// import Upload from '../../icons/Upload';
// import File from '../../icons/File';

const WarehouseEmployeeScreen = () => {
  const {data, loading, reload} = useAPI('/clients/', {});
  const [editingId, setEditingId] = useState(null);

  console.log(data);

  const columns = [
    ...clientColumns,
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '200',
      render: (record) => (
        <div className="row align-center justify-evenly">
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={() => setEditingId(record.user)}>
            <Edit />
          </Button>
          {/* {row.document ? (
            <File />
          ) : (
            <Button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: '1px',
              }}
              // onClick={() => setEditingId(row.id)}>
            >
              <Upload />
            </Button>
          )} */}
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All Clients',
      key: 'allClients',
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
      title="Clients"
      editingId={editingId}
      cancelEditing={cancelEditing}
      modalBody={ClientForm}
      modalWidth={45}
      expandParams={{loading}}
      hideRightButton
      scroll={{x: 2000}}
    />
  );
};

export default WarehouseEmployeeScreen;
