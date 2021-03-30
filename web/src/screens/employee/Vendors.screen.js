import React, {useState, useEffect} from 'react';
import vendorColumns from 'common/columns/Vendors.column';
import {Popconfirm, Button, Input} from 'antd';
import {deleteVendor, retrieveVendors} from 'common/api/auth';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {GetUniqueValue} from 'common/helpers/getUniqueValues';
import {deleteHOC} from '../../hocs/deleteHoc';
import Delete from '../../icons/Delete';
import Edit from '../../icons/Edit';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import {VendorForm} from '../../forms/vendor.form';
import NoPermissionAlert from 'components/NoPermissionAlert';

const {Search} = Input;

const VendorEmployeeScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [csvData, setCsvData] = useState(null);

  const {filteredData, loading, reload, hasPermission} = useTableSearch({
    searchVal,
    retrieve: retrieveVendors,
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
      width: '4vw',
      render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
    },
    ...vendorColumns,
    {
      title: 'City',
      key: 'city',
      dataIndex: 'city',
      width: '12vw',
      filters: GetUniqueValue(filteredData || [], 'city'),
      onFilter: (value, record) => record.city === value,
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      width: '12vw',
      filters: GetUniqueValue(filteredData || [], 'type'),
      onFilter: (value, record) => record.type === value,
    },

    {
      title: 'Action',
      key: 'operation',
      // fixed: 'right',
      width: '7vw',
      render: (text, record) => (
        <div className="row align-center justify-evenly">
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
            title='Confirm Delete'
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteVendor,
              success: 'Deleted Vendor successfully',
              failure: 'Error in deleting vendor',
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
      name: 'All Vendors',
      key: 'allVendors',
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
        size="middle"
        title="Vendors"
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={VendorForm}
        modalWidth={45}
        // scroll={{ x: 2000 }}
        expandParams={{loading}}
        csvdata={csvData}
        csvname={`Vendors${searchVal}.csv`}
      />
    </NoPermissionAlert>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(VendorEmployeeScreen);
