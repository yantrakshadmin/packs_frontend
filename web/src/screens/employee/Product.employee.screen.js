import React, {useState, useEffect} from 'react';
import {ProductForm} from '../../forms/createProduct.form';
import {TableWithTabHOC} from '../../hocs/TableWithTab.hoc';
import {useAPI} from 'common/hooks/api';
import productColumns from 'common/columns/Products.column';
import {Popconfirm, Modal} from 'antd';
import {CloseSquareOutlined, EditOutlined} from '@ant-design/icons';
import {deleteProduct} from 'common/api/auth';
import {deleteHOC} from '../../hocs/deleteHoc';

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
          <EditOutlined style={{fontSize: 30}} onClick={() => setEditingId(row.id)} />
          <Popconfirm
            title="Confirm Delete"
            onConfirm={deleteHOC({
              row,
              reload,
              api: deleteProduct,
              success: 'Deleted product successfully',
              failure: 'Error in deleting product',
            })}>
            <CloseSquareOutlined style={{color: '#ff0000', fontSize: 30, margin: 5}} />
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
      // expandHandleKey='package'
      expandParams={{loading}}
      // ExpandBody={ItemTable}
    />
  );
};

export default ProductEmployeeScreen;
