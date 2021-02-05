import React, {useCallback, useState} from 'react';
import demandModuleColumns from 'common/columns/demandModule.column';
import {Popconfirm, Button, Input, Popover} from 'antd';
import {deleteMr, retrieveDms} from 'common/api/auth';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {useAPI} from 'common/hooks/api';
import {mergeArray} from 'common/helpers/mrHelper';
import {DemandModuleForm} from 'forms/demandModuleEmployee.form';
import TableWithTabHOC from 'hocs/TableWithTab.hoc';
import DemandModuleTable from 'components/DemandModuleTable';
import {deleteHOC} from 'hocs/deleteHoc';
import Delete from 'icons/Delete';
import Edit from 'icons/Edit';
import Modal from './DemandModuleStuff/Modal';

const {Search} = Input;

const MaterialRequestEmployeeScreen = ({currentPage}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const {filteredData, loading, reload} = useTableSearch({searchVal, retrieve: retrieveDms});
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
          {/* <Modal
            destroyOnClose={true}
            width="90%"
            record={record}
            dataSource={record.demand_flows}
          /> */}
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All Material Requests',
      key: 'allMaterialRequests',
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
        hideRightButton={true}
        cancelEditing={cancelEditing}
        modalBody={DemandModuleForm}
        formParams={{filteredData: filteredData}}
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
