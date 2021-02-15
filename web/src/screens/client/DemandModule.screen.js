import React, {useState} from 'react';
import demandModuleColumns from 'common/columns/demandModule.column';
import {Popconfirm, Button, Input, Popover} from 'antd';
import {deleteDm, retrieveDmsClient} from 'common/api/auth';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {useAPI} from 'common/hooks/api';
import {mergeArray} from 'common/helpers/mrHelper';
import {DemandModuleForm} from 'forms/demandModule.form';
import TableWithTabHOC from 'hocs/TableWithTab.hoc';
import DemandModuleTable from 'components/DemandModuleTable';
import {deleteHOC} from 'hocs/deleteHoc';
import Delete from 'icons/Delete';
import Edit from 'icons/Edit';

const {Search} = Input;

const MaterialRequestEmployeeScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const {filteredData, loading, reload} = useTableSearch({searchVal, retrieve: retrieveDmsClient});
  const cancelEditing = () => {
    setEditingId(null);
  };

  const columns = [
    ...demandModuleColumns,
    {
      title: 'Action',
      key: 'operation',
      width: '9vw',
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
              api: deleteDm,
              success: 'Deleted Volume Plan successfully',
              failure: 'Error in deleting Volume Plan',
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
      name: 'All Volume Plans',
      key: 'allVolumePlans',
      data: filteredData || [],
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
        title="Volume Plan (Beta)"
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={DemandModuleForm}
        modalWidth={98}
        expandHandleKey="demand_flows"
        expandParams={{loading}}
        ExpandBody={DemandModuleTable}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(MaterialRequestEmployeeScreen);
