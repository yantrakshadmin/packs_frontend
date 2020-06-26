import React, {useState} from 'react';
import {VendorForm} from '../../forms/vendor.form';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import {useAPI} from 'common/hooks/api';
import vendorColumns from 'common/columns/Vendors.column';
import {Popconfirm, Button} from 'antd';
import {deleteVendor} from 'common/api/auth';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';
import {connect} from 'react-redux';

const VendorEmployeeScreen = ({currentPage}) => {
  const {data, loading, reload} = useAPI('/vendors/', {});
  const [editingId, setEditingId] = useState(null);

  console.log(data);

  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => (currentPage - 1) * 5 + index + 1,
    },
    ...vendorColumns,
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

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(VendorEmployeeScreen);
