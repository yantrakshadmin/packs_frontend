import React, {useState} from 'react';
import {WareHouseForm} from '../../forms/warehouse.form';
import {TableWithTabHOC} from '../../hocs/TableWithTab.hoc';
import {useAPI} from 'common/hooks/api';
import warehouseColumns from 'common/columns/Warehouse.column';
import {Popconfirm, Button} from 'antd';
import {deleteWarehouse} from 'common/api/auth';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';

const WarehouseEmployeeScreen = () => {
  const {data, loading, reload} = useAPI('/warehouse/', {});
  const [editingId, setEditingId] = useState(null);

  console.log(data);

  const columns = [
    ...warehouseColumns,
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '200',
      render: (row) => (
        <div className="row align-center justify-evenly">
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
              api: deleteWarehouse,
              success: 'Deleted product successfully',
              failure: 'Error in deleting product',
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
      name: 'All Warehouses',
      key: 'allWarehouses',
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
      title="Warehouses"
      editingId={editingId}
      cancelEditing={cancelEditing}
      modalBody={WareHouseForm}
      modalWidth={45}
      expandParams={{loading}}
    />
  );
};

export default WarehouseEmployeeScreen;
