import React, {useState, useEffect} from 'react';
import {ClientForm} from '../../forms/client.form';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import clientColumns from 'common/columns/Clients.column';
import {Button, Input} from 'antd';
import Edit from '../../icons/Edit';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {retrieveClients} from 'common/api/auth';
import Document from 'icons/Document';

const {Search} = Input;

const WarehouseEmployeeScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [csvData, setCsvData] = useState(null);

  const {filteredData, loading, reload} = useTableSearch({
    searchVal,
    retrieve: retrieveClients,
  });

  useEffect(() => {
    if (filteredData) {
      let csvd = [];
      filteredData.forEach((d) => {
        delete d['owner'];
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
    ...clientColumns,
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '7vw',
      render: (text, record) => (
        <div className="row align-center justify-evenly">
          <a href={record.annexure} target="_blank">
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
        title="Sender Clients"
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={ClientForm}
        modalWidth={60}
        expandParams={{loading}}
        hideRightButton
        scroll={{x: 2000}}
        csvdata={csvData}
        csvname={'SenderClients' + searchVal + '.csv'}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(WarehouseEmployeeScreen);
