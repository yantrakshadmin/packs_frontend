import React, {useState} from 'react';
import {KitForm} from '../../forms/createKit.form';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import kitsColumns from 'common/columns/Kits.column';
import ProductTable from '../../components/ProductsTable';
import {Popconfirm, Button, Input} from 'antd';
import {deleteKit, retrieveKits} from 'common/api/auth';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';

const {Search} = Input;

const KitEmployeeScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const {filteredData, loading, reload} = useTableSearch({searchVal, retrieve: retrieveKits});

  const cancelEditing = () => {
    setEditingId(null);
  };

  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => (currentPage - 1) * 5 + index + 1,
    },
    ...kitsColumns,
    {
      title: 'Action',
      key: 'operation',
      width: '7vw',
      render: (text, record) => (
        <div className="row justify-evenly">
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
      name: 'All Kits',
      key: 'allKits',
      data: filteredData,
      columns,
      loading,
    },
  ];

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div style={{width: '15vw', display: 'flex', alignItems: 'flex-end'}}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder="Search" enterButton />
        </div>
      </div>
      <br />
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(KitEmployeeScreen);
