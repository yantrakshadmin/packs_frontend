import React, {useState, useEffect} from 'react';
import {LeadsForm} from '../../forms/leads.form';
import TableWithTabHOC from '../../hocs/TableWithTab.hoc';
import leadColumns from 'common/columns/Leads.colums';
import {Popconfirm, Button, Input} from 'antd';
import Edit from '../../icons/Edit';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {retrieveClients} from 'common/api/auth';
import {deleteHOC} from '../../hocs/deleteHoc';
import Document from 'icons/Document';
import Delete from 'icons/Delete';

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
    ...leadColumns,
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '7vw',
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
              setEditingId(record.user);
              e.stopPropagation();
            }}>
            <Edit />
          </Button>
          <Popconfirm
            title="Confirm Delete"
            onCancel={(e) => e.stopPropagation()}
            onConfirm={deleteHOC({
              record,
              reload,
              // api: deleteKit,
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
      name: 'All Leads',
      key: 'allLeads',
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
        title="Leads"
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={LeadsForm}
        modalWidth={60}
        expandParams={{loading}}
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
