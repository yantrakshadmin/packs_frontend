import React, {useState, useEffect} from 'react';
import {ProductForm} from '../../forms/createProduct.form';
import {TableWithTabHOC} from '../../hocs/TableWithTab.hoc';
import {useAPI} from 'common/hooks/api';
import {loadAPI} from 'common/helpers/api';
import productColumns from 'common/columns/Products.column';
import {Popconfirm, Modal} from 'antd';
import {CloseSquareOutlined, EditOutlined} from '@ant-design/icons';

const ProductEmployeeScreen = () => {
  const {data, loading, reload} = useAPI('/products/', {});
  const [selected, setSelected] = useState([]);
  const [editingId, setEditingId] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  console.log(data);

  const columns = [
    ...productColumns,
    {
      title: 'Action',
      key: 'operation',
      render: (row) => (
        <div className="row align-center justify-between">
          <EditOutlined style={{fontSize: 30}} onClick={() => setEditingId(row.id)} />
          {/* <Popconfirm
            title="Confirm Delete"
            onConfirm={deleteHOC({
              row,
              reload,
              api: deleteOrders,
              success: 'Deleted address successfully',
              failure: 'Error in deleting address',
            })}>
            <CloseSquareOutlined style={{color: '#ff0000', fontSize: 30, margin: 5}} />
          </Popconfirm> */}
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

  const onChange = (selectedRowKeys) => {
    setSelected(selectedRowKeys);
  };

  const reset = () => {
    setSelected([]);
  };

  const cancelEditing = () => setEditingId(undefined);

  return (
    <TableWithTabHOC
      reset={reset}
      rowKey={(record) => record.id}
      rowSelection={{type: 'checkbox', selectedRowKeys: selected, onChange}}
      refresh={reload}
      tabs={tabs}
      customRowSelectionType={{allProducts: 'checkbox'}}
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
