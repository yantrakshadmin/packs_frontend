import React, {useState, useCallback} from 'react';
import demandModuleColumns, {getFullName} from 'common/columns/demandModule.column';
import {Popconfirm, Button, Input, notification} from 'antd';
import {deleteDm, retrieveDmsClient} from 'common/api/auth';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {loadAPI} from 'common/helpers/api';
import {DemandModuleForm} from 'forms/demandModule.form';
import TableWithTabHOC from 'hocs/TableWithTab.hoc';
import DemandModuleTable from 'components/DemandModuleTable';
import {deleteHOC} from 'hocs/deleteHoc';
import Delete from 'icons/Delete';
import Edit from 'icons/Edit';
import {GetUniqueValueFullName} from 'common/helpers/getUniqueValues';

const {Search} = Input;

const MaterialRequestEmployeeScreen = ({currentPage, user}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const {filteredData, loading, reload} = useTableSearch({searchVal, retrieve: retrieveDmsClient});
  const cancelEditing = () => {
    setEditingId(null);
  };

  const columns = [
    ...demandModuleColumns.slice(0, 2),
    {
      title: 'Raised By',
      key: 'raised_by',
      dataIndex: 'raised_by',
      render: (text, record) =>
        record.owner ? getFullName(record.owner.first_name, record.owner.last_name) : '-',
      filters: GetUniqueValueFullName(filteredData || [], 'owner', 'first_name', 'last_name'),
      onFilter: (value, record) => {
        return getFullName(record.owner.first_name, record.owner.last_name) === value;
      },
    },
    ...demandModuleColumns.slice(3),
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

  const [btnLoading, setBtnLoading] = useState(false);

  const DownloadCSVButton = useCallback(() => {
    return (
      <Button
        onClick={async () => {
          await setBtnLoading(true);
          const d = await loadAPI(`/demandvallot-report/?cname=${user.id}`);
          if (d.status === 403) {
            notification.error({
              message: 'Access Denied',
              description: 'You do not have permissions to access this module.',
            });
          } else {
            let hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(d.data);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'vp-report.csv';
            hiddenElement.click();
          }
          setBtnLoading(false);
        }}
        rel="noopener noreferrer"
        target="blank"
        loading={btnLoading}>
        Download Reports
      </Button>
    );
  }, [btnLoading, user]);

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div style={{width: '15vw'}}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder="Search" enterButton />
        </div>
      </div>
      <br />
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size="middle"
        title="Volume Plan"
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={DemandModuleForm}
        modalWidth={98}
        expandHandleKey="demand_flows"
        expandParams={{loading}}
        ExpandBody={DemandModuleTable}
        ExtraButtonNextToTitle={DownloadCSVButton}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage, user: state.user.userMeta};
};

export default connect(mapStateToProps)(MaterialRequestEmployeeScreen);
