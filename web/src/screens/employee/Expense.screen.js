import React, {useState} from 'react';
import expenseColumns from 'common/columns/expense.column';
import {Popconfirm, Button, Input, Popover} from 'antd';
import {deleteExpense, retrieveExpenses} from 'common/api/auth';
import {connect} from 'react-redux';
import {useTableSearch} from 'hooks/useTableSearch';
import {useAPI} from 'common/hooks/api';
import {mergeArray} from 'common/helpers/mrHelper';
import {ExpenseForm} from 'forms/expense.form';
import TableWithTabHOC from 'hocs/TableWithTab.hoc';
import ExpandTable from 'components/ExpenseExpandTable';
import {deleteHOC} from 'hocs/deleteHoc';
import Delete from 'icons/Delete';
import Edit from 'icons/Edit';

import _ from 'lodash';

const {Search} = Input;

const ExpenseEmployeeScreen = ({currentPage, isEmployee}) => {
  const [searchVal, setSearchVal] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const {filteredData, loading, reload} = useTableSearch({searchVal, retrieve: retrieveExpenses});
  const {data: mrStatusData} = useAPI('list-mrstatus/');
  const {data: vendors} = useAPI('/vendors-exp/', {});
  const cancelEditing = () => {
    setEditingId(null);
  };

  const columns = [
    ...expenseColumns.slice(0, 3),
    {
      title: 'Vendor',
      key: 'vendor',
      dataIndex: 'vendor',
      render: (text, record) => {
        const thisV = _.find(vendors, (v) => v.id === record.vendor);
        return thisV ? thisV.name : '-';
      },
    },
    ...expenseColumns.slice(4),
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
          </Popconfirm>
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All Expenses',
      key: 'allExpenses',
      data: mergeArray(filteredData || [], mrStatusData || []),
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
        title="Expenses"
        editingId={editingId}
        cancelEditing={cancelEditing}
        modalBody={ExpenseForm}
        modalWidth={80}
        formParams={{isEmployee}}
        //expandHandleKey="transactions"
        //expandParams={{loading}}
        //ExpandBody={ExpandTable}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {currentPage: state.page.currentPage};
};

export default connect(mapStateToProps)(ExpenseEmployeeScreen);
