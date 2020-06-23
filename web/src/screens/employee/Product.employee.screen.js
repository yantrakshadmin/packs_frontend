import React, {useState} from 'react';
import {ProductForm} from '../../forms/createProduct.form';
import {TableWithTabHOC} from '../../hocs/TableWithTab.hoc';
import {useAPI} from 'common/hooks/api';
import productColumns from 'common/columns/Products.column';
import {Popconfirm, Button} from 'antd';
import {deleteProduct} from 'common/api/auth';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';
// import File from '../../icons/File';
// import Upload from '../../icons/Upload';

const ProductEmployeeScreen = () => {
  const {data, loading, reload} = useAPI('/products/', {});
  const [editingId, setEditingId] = useState(null);

  console.log(data);

  const columns = [
    ...productColumns,
    {
      title: 'Action',
      key: 'operation',
      render: (row) => (
        <div className="row align-center justify-between">
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
          <Popconfirm
            title="Confirm Delete"
            onConfirm={deleteHOC({
              row,
              reload,
              api: deleteProduct,
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
      name: 'All Products',
      key: 'allProducts',
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
      size="small"
      title="Products"
      editingId={editingId}
      cancelEditing={cancelEditing}
      modalBody={ProductForm}
      modalWidth={45}
      expandParams={{loading}}
    />
  );
};

export default ProductEmployeeScreen;
