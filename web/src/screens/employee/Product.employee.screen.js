import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import productColumns from 'common/columns/Products.column';
import {Popconfirm, Button, Input} from 'antd';
import {deleteProduct, retrieveProducts} from 'common/api/auth';
import {useTableSearch} from 'hooks/useTableSearch';
import {ProductForm} from '../../forms/createProduct.form';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';
import Document from '../../icons/Document';
import {GetUniqueValue} from 'common/helpers/getUniqueValues';
import NoPermissionAlert from 'components/NoPermissionAlert';

const {Search} = Input;

const ProductEmployeeScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [csvData, setCsvData] = useState(null);

  const {filteredData, loading, reload, hasPermission} = useTableSearch({
    searchVal,
    retrieve: retrieveProducts,
  });

  useEffect(() => {
    if (filteredData) {
      const csvd = [];
      filteredData.forEach((d) => {
        delete d.owner;
        csvd.push(d);
      });
      setCsvData(csvd);
    }
  }, [filteredData]);

  const columns = [
    {
      title: 'Sr. No.',
      key: 'srno',
      render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      filters: GetUniqueValue(filteredData || [], 'name'),
      onFilter: (value, record) => record.name === value,
    },
    ...productColumns,
    {
      title: 'Action',
      key: 'operation',
      width: '7vw',
      render: (text, record) => (
        <div className="row align-center justify-evenly">
          {/* eslint-disable-next-line react/jsx-no-target-blank */}
          <a href={record.document} target="_blank">
            <Button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: '1px',
              }}
              disabled={!record.document}
              onClick={(e) => e.stopPropagation()}>
              <Document color={record.document ? '#7CFC00' : null} />
            </Button>
          </a>
          <Button
            // disabled
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
          {/* <Popconfirm
            // disabled
            title="Confirm Delete"
            onCancel={(e) => e.stopPropagation()}
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteProduct,
              success: 'Deleted product successfully',
              failure: 'Error in deleting product',
            })}>
            <Button
              // disabled
              style={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: 'none',
                padding: '1px',
              }}
              onClick={(e) => e.stopPropagation()}>
              <Delete />
            </Button>
          </Popconfirm> */}
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All Products',
      key: 'allProducts',
      data: filteredData,
      columns,
      loading,
    },
  ];

  const cancelEditing = () => setEditingId(null);

  return (
    <NoPermissionAlert hasPermission={hasPermission}>
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
        size="small"
        title="Products"
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={ProductForm}
        modalWidth={45}
        expandParams={{loading}}
        csvdata={csvData}
        csvname={`Products${searchVal}.csv`}
      />
    </NoPermissionAlert>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(ProductEmployeeScreen);
