import React, {useState} from 'react';
import {KitForm} from '../../forms/createKit.form';
import {TableWithTabHOC} from '../../hocs/TableWithTab.hoc';
import {useAPI} from 'common/hooks/api';
import kitsColumns from 'common/columns/Kits.column';
import ProductTable from '../../components/ProductsTable';
import {Popconfirm, Button} from 'antd';
import {deleteKit} from 'common/api/auth';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';

const KitEmployeeScreen = () => {
  const {data, loading, reload} = useAPI('/kits/', {});
  const [editingId, setEditingId] = useState(null);

  const cancelEditing = () => {
    setEditingId(null);
  };

  const columns = [
    ...kitsColumns,
    {
      title: 'Action',
      key: 'operation',
      render: (row) => (
        <div className="row justify-evenly">
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={() => setEditingId(row.id)}>
            <Edit />
          </Button>
          <Popconfirm
            title="Confirm Delete"
            onConfirm={deleteHOC({
              row,
              reload,
              api: deleteKit,
              success: 'Deleted kit successfully',
              failure: 'Error in deleting kit',
            })}>
            <Button
              style={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: 'none',
                padding: '1px',
              }}>
              <Delete />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All Kits',
      key: 'allKits',
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
      title="Kits"
      editingId={editingId}
      cancelEditing={cancelEditing}
      modalBody={KitForm}
      modalWidth={45}
      expandHandleKey="products"
      expandParams={{loading}}
      ExpandBody={ProductTable}
    />
  );
};

export default KitEmployeeScreen;
