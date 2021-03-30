import React, {useState, useEffect} from 'react';
import clientColumns from 'common/columns/Clients.column';
import {Button, Input, Popconfirm} from 'antd';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {retrieveClients} from 'common/api/auth';
import Document from 'icons/Document';
import Edit from '../../icons/Edit';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import {ClientForm} from '../../forms/client.form';
import {GetUniqueValue} from 'common/helpers/getUniqueValues';
import NoPermissionAlert from 'components/NoPermissionAlert';

const {Search} = Input;

const WarehouseEmployeeScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [csvData, setCsvData] = useState(null);

  const {filteredData, loading, reload, hasPermission} = useTableSearch({
    searchVal,
    retrieve: retrieveClients,
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
      width: '5vw',
      render: (text, record, index) => (currentPage - 1) * 10 + index + 1,
    },
    ...clientColumns,
    {
      title: 'Client State',
      key: 'client_state',
      dataIndex: 'client_state',
      width: '8vw',
      filters: GetUniqueValue(filteredData || [], 'client_state'),
      onFilter: (value, record) => record.client_state === value,
    },
    {
      title: 'Client Region',
      key: 'client_region',
      dataIndex: 'client_region',
      width: '8vw',
      filters: GetUniqueValue(filteredData || [], 'client_region'),
      onFilter: (value, record) => record.client_region === value,
    },
    // {
    //   title: 'Client Payment Terms',
    //   key: 'client_payment_terms',
    //   dataIndex: 'client_payment_terms',
    // },
    {
      title: 'Client Category',
      key: 'client_category',
      dataIndex: 'client_category',
      width: '8vw',
      filters: GetUniqueValue(filteredData || [], 'client_category'),
      onFilter: (value, record) => record.client_category === value,
    },
    // {
    //   title: 'Client Product User Type',
    //   key: 'client_product_user_type',
    //   dataIndex: 'client_product_user_type',
    // },
    // {
    //   title: 'Client PAN',
    //   key: 'client_pan',
    //   dataIndex: 'client_pan',
    // },
    // {
    //   title: 'Client Code',
    //   key: 'client_code',
    //   dataIndex: 'client_code',
    // },
    // {
    //   title: 'Is GST Registered?',
    //   key: 'client_is_gst_registered',
    //   dataIndex: 'client_is_gst_registered',
    // },
    // {
    //   title: 'Client GST',
    //   key: 'client_gst',
    //   dataIndex: 'client_gst',
    // },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '7vw',
      render: (text, record) => (
        <div className="row align-center justify-evenly">
          <a href={record.annexure} target="_blank" rel="noreferrer">
            <Button
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: '1px',
              }}
              disabled={!record.annexure}
              onClick={(e) => e.stopPropagation()}>
              <Document color={record.annexure ? '#7CFC00' : null} />
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
              setEditingId(record.user);
              e.stopPropagation();
            }}>
            <Edit />
          </Button>
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All Sender Clients',
      key: 'allSenderClients',
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
        title="Sender Clients"
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={ClientForm}
        modalWidth={60}
        expandParams={{loading}}
        hideRightButton
        scroll={{x: 2000}}
        csvdata={csvData}
        csvname={`SenderClients${searchVal}.csv`}
      />
    </NoPermissionAlert>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(WarehouseEmployeeScreen);
