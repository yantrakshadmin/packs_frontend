import React, {useState} from 'react';
import {VendorForm} from '../../forms/vendor.form';
import {TableWithTabHOC} from '../../hocs/TableWithTab.hoc';
import {useAPI} from 'common/hooks/api';
import vendorColumns from 'common/columns/Vendors.column';
import {Popconfirm, Button} from 'antd';
import {deleteVendor} from 'common/api/auth';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';

const VendorEmployeeScreen = () => {
  const {data, loading, reload} = useAPI('/vendors/', {});
  const [editingId, setEditingId] = useState(null);

  console.log(data);

  const columns = [
    ...vendorColumns,
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
              api: deleteVendor,
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
      name: 'All Vendors',
      key: 'allVendors',
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
      title="Vendors"
      editingId={editingId}
      cancelEditing={cancelEditing}
      modalBody={VendorForm}
      modalWidth={45}
      scroll={{x: 2000}}
      expandParams={{loading}}
    />
  );
};

export default VendorEmployeeScreen;
