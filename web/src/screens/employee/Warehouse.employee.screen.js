import React, {useState} from 'react';
import {WareHouseForm} from '../../forms/warehouse.form';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import {useAPI} from 'common/hooks/api';
import warehouseColumns from 'common/columns/Warehouse.column';
import {Popconfirm, Button} from 'antd';
import {deleteWarehouse} from 'common/api/auth';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';
import {connect} from 'react-redux';
// import Upload from '../../icons/Upload';
// import File from '../../icons/File';

const WarehouseEmployeeScreen = ({currentPage}) => {
  const {data, loading, reload} = useAPI('/warehouse/', {});
  const [editingId, setEditingId] = useState(null);

  console.log(data);

  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => (currentPage - 1) * 5 + index + 1,
    },
    ...warehouseColumns,
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '200',
      render: (text, record) => (
        <div className="row align-center justify-evenly">
          <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={() => setEditingId(record.id)}>
            <Edit />
          </Button>
          {/* {record.document ? (
            <File />
          ) : (
            <Button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: '1px',
              }}
              // onClick={() => setEditingId(record.id)}>
            >
              <Upload />
            </Button>
          )} */}
          <Popconfirm
            title="Confirm Delete"
            onConfirm={deleteHOC({
              record,
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

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(WarehouseEmployeeScreen);
