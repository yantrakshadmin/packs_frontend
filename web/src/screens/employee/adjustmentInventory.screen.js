import React, {useState} from 'react';
import adjustmentColumns from 'common/columns/adjustment.column';
import {Popconfirm, Button, Input, Popover} from 'antd';
import {retrieveAdjustments} from 'common/api/auth';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {useAPI} from 'common/hooks/api';
import {mergeArray} from 'common/helpers/mrHelper';
import {AdjustmentForm} from 'forms/adjustmentInventory.form';
import AdjustmentClientTab from './AdjustmentInventoryStuff/AdjustmentClientTab';
import TableWithTabHOC from 'hocs/TableWithTab.hoc';
import ExpandTable from 'components/AdjustmentExpandTable';
import {deleteHOC} from 'hocs/deleteHoc';
import Delete from 'icons/Delete';
import Edit from 'icons/Edit';
import {DEFAULT_BASE_URL} from 'common/constants/enviroment';
import {yantraColors} from '../../helpers/yantraColors';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {uploadAdjustmentDocument} from 'common/api/auth';

import {loadAPI} from 'common/helpers/api';
import _ from 'lodash';

const {Search} = Input;

const ExpenseEmployeeScreen = ({currentPage, isEmployee}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const {filteredData, loading, reload} = useTableSearch({
    searchVal,
    retrieve: retrieveAdjustments,
  });

  const cancelEditing = () => {
    setEditingId(null);
  };

  const columns = [
    ...adjustmentColumns,
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
            onClick={async (e) => {
              e.stopPropagation();
              try {
                if (record.files.length > 0) {
                  record.files.forEach((f) => {
                    window.open(f.document);
                  });
                }
              } catch (err) {}
            }}>
            <FontAwesomeIcon
              icon={record.files ? (record.files.length > 0 ? faEye : faEyeSlash) : faEyeSlash}
              style={{fontSize: 20, color: yantraColors['primary']}}
            />
          </Button>

          {/* <Button
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
              api: deleteExpense,
              success: 'Deleted Material Request successfully',
              failure: 'Error in deleting Material request',
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
          </Popconfirm> */}
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All Adjustments',
      key: 'allAdjustments',
      data: filteredData || [],
      columns,
      loading,
    },
    {
      name: 'Client Adjustments',
      key: 'clientAdjustments',
      hasCustomModel: true,
      CustomModel: AdjustmentClientTab,
      customModelProps: {
        searchVal: searchVal,
      },
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
        title="Warehouse Adjustments"
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={AdjustmentForm}
        modalWidth={80}
        formParams={{isEmployee}}
        //expandHandleKey="transactions"
        expandParams={{loading}}
        ExpandBody={ExpandTable}
        uploadLink={true}
        uploadLinkTitle={'Upload Document'}
        uploadLinkFunc={uploadAdjustmentDocument}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(ExpenseEmployeeScreen);
